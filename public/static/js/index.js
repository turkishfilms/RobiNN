import { LinearRegression as LinR } from "./class/LinearRegression";
import Layer from "./class/Layer";
import Perceptron from "./class/Perceptron";

const RADIUS = 3;
let count = 0;
// let iter = 100000
let mouseXs = [500],
  mouseYs = [500],
  linearRegressWeight = new LinR({ weightList: [500, 0] }),
  error,
  alpha = 0.000001;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  // noStroke()
  stroke(255);
  textSize(20);
  const l = new Perceptron();
  const m = new Layer({ nodeCount: 10, inputSize: 1 });
  const n = new Layer({ nodeCount: 5, inputSize: 10 });
  const o = new Layer({ nodeCount: 1, inputSize: 5 });
  //const ned = new Network({layers:[m,n,o], inputSize:1,xs:xs,ts:ys})
  //	t(1000,{xs:xs},ned,0.1)
  //gd({iter:3000,w:[w0,w1],xs:mouseXs,ys:mouseYs, alpha:0.00000001})
}

function draw() {
  background(0);
  mouseXs.forEach((x, i) => ellipse(x, mouseYs[i], RADIUS));

  const { ww, www } = gd({
    iter: 1,
    w: [linearRegressWeight.weights[0], linearRegressWeight.weights[1]],
    xs: mouseXs,
    ys: mouseYs,
    alpha: alpha,
  });
  linearRegressWeight.weights[0] = ww;
  linearRegressWeight.weights[1] = www;
  text(`${error}`, 0, height - 150);
  text(`${linearRegressWeight.weights[0]}`, 0, height - 100);
  text(`${linearRegressWeight.weights[1]}`, 0, height - 50);
}

/////////////////////////////////////////////////////////////////////

const errorsOfnnIDKTBH = (iterations, data, nn, alpha = 0.0001) => {
  //console.log(iterations,data.xs)
  const alpha_ = alpha;
  const outputs = [];
  let errors = 100;
  for (let i = 0; i < iterations; i++) {
    errors = nn.train(0, alpha_, data.xs);
    if (errors < 100) alpha_ = 0.001;
    else if (errors < 5) alpha_ = 0.0001;
    outputs.push(errors.toPrecision(8));
    if (iterations % 20 == 0) outputs.push("\n");
  }
  return errors;
};

//do sgd on all weights with error from output and put the sgded weights back in
const doGD = ({
  m = 2,
  b = 0,
  dataSize = 1000,
  iter = 10000,
  alpha = 0.00000001,
  w = [0, 0],
} = {}) => {
  const { xs, ys } = dataGen(dataSize, m, b);
  //document.getElementById('test2').innerHTML = `my function is y = ${m}x + ${b}`
  return gd({ xs, ys, iter, alpha, w });
};

const gd = ({
  iter = 1000,
  xs = [],
  ys = [],
  alpha = 0.0000000000001,
  w = [0, 0],
} = {}) => {
  const guess = (x) => w[0] + w[1] * x;
  for (let i = 0; i < iter; i++) {
    let w0 = 0,
      w1 = 0;
    xs.forEach((x, i) => {
      error = halfSquaredError(guess(x), ys[i]);
      //console.log("e:",e)
      const error_ = guess(x) - ys[i];
      w0 += error_;
      w1 += error_ * x;
    });
    w[0] -= w0 / xs.length;
    w[1] -= alpha * (w1 / xs.length);
    // console.log(w[0],w[1])
    showGuess(w[0], w[1]);
  }
  return { ww: w[0], www: w[1] }; //document.getElementById('test').innerHTML = `Was your function y = ${w[1]}x + ${w[0]}?`
};

const showGuess = (w0, w1) => {
  fill(255);
  line(0, w0, width, width * w1 + w0);
};

const halfSquaredError = (y, t) => (t - y) ** 2 / 2;

const dataGen = (len, m, b, rang) => {
  const xs = [],
    ys = [];
  for (let i = 0; i < len; i++) {
    let x = floor(random(-rang, rang));
    xs.push(x);
    ys.push(m * x + b);
  }
  return { xs, ys };
};

function touchStarted() {
  const msX = mouseX;
  const msY = mouseY;

  mouseXs.push(msX);
  mouseYs.push(msY);
  console.log(
    linearRegressWeight.weights[0],
    linearRegressWeight.weights[1],
    error
  );
}

const yes = (x) => (x <= 0.5 ? -1 : 1);

const sig = (x) => Math.E ** x / (Math.E ** x + 1);

const dSig = (x) => sig(x) * (1 - sig(x));

const mDSig = (x) =>
  (x * Math.E ** (-x - 1)) / Math.E ** (-2 * x) + 2 * Math.E ** -x + 1;
//(x*E**(x-1))/()

//1/(1+e**-x)
//(1+e**-x)(0)-1(-x(e**(-x-1))/(1+e**-x)**2
//0+x*e**(-x-1))/ (1+e**-x)(1+e**-x) -> e**-2x + 2e**-x + 1
//x*e**(-x-1)/e**-2x + 2e**-x + 1
