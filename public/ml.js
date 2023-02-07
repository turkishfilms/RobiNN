
let rad = 3
let count = 0
let iter =100000
let xsl = [500], ysl = [500], w0g= 500, w1g = 0,w,h,e,a = 0.000001

function setup(){
	//frameRate(20)
	w = windowWidth
	h = windowHeight
	createCanvas(w,h)
	background(0)
	fill(255)
	noStroke()
	stroke(255)
	textSize(20)
	console.log('red')
	const l = new Perceptron()
	const m = new Layer({nodeCount:10,inputSize:1})
	const n = new Layer({nodeCount:5,inputSize:10})
	const o = new Layer({nodeCount:1,inputSize:5})
	//const {xs,ys} = dataGen(10,1,500,200)
	//xsl = xs
	//ysl = ys
	//const ned = new Network({layers:[m,n,o], inputSize:1,xs:xs,ts:ys})

//	t(1000,{xs:xs},ned,0.1)
//	document.getElementById('test').innerHTML = console.log(e)//which xs and alpha
	xsl.forEach((x,i)=> ellipse(x,ysl[i],rad))
	//console.log(gd({xs:xsl,ys:ysl}))
	//gd({iter:3000,w:[w0,w1],xs:xsl,ys:ysl, alpha:0.00000001})
}

const t = (iter,data,nn,az) => {
//console.log(iter,data.xs)
	let a = az || 0.0001
	let asa = []
	let ee = 100
	for(let i = 0; i < iter; i++){
		ee = nn.train(0,a,data.xs)
	//	console.log("a",a,"e",ee)
		if(ee < 100) a = 0.001
		else if(ee < 5) a = 0.0001

		asa.push(ee.toPrecision(8))
		if(iter % 20 == 0) asa.push("\n") 
		//document.getElementById('test2').innerHTML = asa
	}
	return ee
}


//do sgd on all weights with error from output and put the sgded weights back in
const doGD = ({m=2, b=0, dataSize=1000, iter=10000, alpha= 0.00000001, w=[0,0]}={}) => {
	const {xs,ys} = dataGen(dataSize ,m, b)
	//document.getElementById('test2').innerHTML = `my function is y = ${m}x + ${b}`
	return gd({xs,ys,iter,alpha,w})
}


const gd = ({iter=1000, xs=[], ys=[], alpha=0.0000000000001, w=[0,0]}={}) => {
	const guess = x => w[0] + w[1] * x
	for(let i = 0; i < iter;i++){
		let w0 =0, w1 = 0
		xs.forEach((x,i)=>{
			e = halfSquaredError(guess(x),ys[i])
			//console.log("e:",e)
			const error = guess(x)-ys[i]
			w0 += error
			w1 += error * x
		})
		w[0] -= (w0/xs.length)
		w[1] -= alpha * (w1/xs.length)
 
		showGuess(w[0],w[1])
	}
	return {ww:w[0],www:w[1]} //document.getElementById('test').innerHTML = `Was your function y = ${w[1]}x + ${w[0]}?`
}

const showGuess = (w0,w1) =>{
	line(0,w0g,w,w*w1g+w0g)
}

const halfSquaredError = (y,t) => (t-y)**2/2

const dataGen =(len, m, b, rang) =>{
	const xs = [], ys =[]
	for(let i = 0; i < len; i++){
		let x = floor(random(-rang,rang))
		xs.push(x)
		ys.push(m*x +b)
	}
	return {xs,ys}
}

function touchStarted(){
	xsl.push(mouseX)
	ysl.push(mouseY)
	console.log(w0g,w1g,e)
}

function draw(){
	background(0)
	xsl.forEach((x,i)=> ellipse(x,ysl[i],rad))

	const {ww,www} = gd({iter:1,w:[w0g,w1g],xs:xsl,ys:ysl,alpha:a})
	w0g = ww
	w1g = www
text(`${e}`,0,h-150)
text(`${w0g}`,0,h-100)
text(`${w1g}`,0,h-50)
}

const yes = x => x <= 0.5 ? -1 : 1

const sig = x => Math.E**x/((Math.E**x)+1)

const dSig = x => sig(x) * (1-sig(x))

const mDSig = x => x*Math.E**(-x-1)/Math.E**(-2*x)+2*Math.E**-x + 1
//(x*E**(x-1))/()



//1/(1+e**-x)
//(1+e**-x)(0)-1(-x(e**(-x-1))/(1+e**-x)**2
//0+x*e**(-x-1))/ (1+e**-x)(1+e**-x) -> e**-2x + 2e**-x + 1
//x*e**(-x-1)/e**-2x + 2e**-x + 1

