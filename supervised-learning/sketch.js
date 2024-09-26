let trainingData;
let perceptron;
let targetSeparator;
let targetSlope;
let targetSlopeElement;
let targetIntercept;
let targetInterceptElement;
const canvasSize = 800;

function setup() {
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent(document.getElementById("canvasArea"));

  targetSlopeElement = document.getElementById("slope");
  targetInterceptElement = document.getElementById("intercept");

  perceptron = new Perceptron(3);
  targetSeparator = new TargetSeparator();
  trainingData = new TrainingData(targetSeparator);

  const scrambleButton = document.getElementById("scramble");
  scrambleButton.addEventListener("click", (e) => {
    e.preventDefault();
    perceptron.scrambleWeights();
  });
}

function draw() {
  background(220);

  // Update info to sliders
  let targetSlope = targetSlopeElement.value;
  let targetIntercept = targetInterceptElement.value;
  targetSeparator.setTargetSlope(Number(targetSlope) / 10);
  targetSeparator.setTargetIntercept(Number(targetIntercept) / 10);

  stroke(160);
  line(canvasSize / 2, 0, canvasSize / 2, canvasSize);
  line(0, canvasSize / 2, canvasSize, canvasSize / 2);

  // Draw the line
  const lineStart = new Point(
    -1,
    targetSeparator.getTargetY(-1),
    targetSeparator,
  );
  const lineEnd = new Point(1, targetSeparator.getTargetY(1), targetSeparator);
  stroke("black");
  line(
    lineStart.pixelX(),
    lineStart.pixelY(),
    lineEnd.pixelX(),
    lineEnd.pixelY(),
  );

  //Draw the perceptrons guess of the line
  const perceptronLineStart = new Point(
    -1,
    perceptron.getGuessY(-1),
    targetSeparator,
  );
  const perceptronLineEnd = new Point(
    1,
    perceptron.getGuessY(1),
    targetSeparator,
  );
  stroke("blue");
  strokeWeight(5);
  line(
    perceptronLineStart.pixelX(),
    perceptronLineStart.pixelY(),
    perceptronLineEnd.pixelX(),
    perceptronLineEnd.pixelY(),
  );

  trainingData.points.forEach((point) => {
    point.updateAnswer();
    perceptron.train([point.x, point.y, point.bias], (answer = point.answer));
  });

  stroke("black");
  strokeWeight(1);
  trainingData.points.forEach((point) => {
    const guess = perceptron.getGuess([point.x, point.y, point.bias]);
    point.show(guess);
  });
}
