console.log('perceive')
class Perceptron{
	constructor({inputSize= 2, activation,weights=[]}={}){
		this.inputSize = inputSize
		this.activation = activation 
		this.weights = weights.length ? weights : this.initWeights(this.inputSize)
		this.xs = []
		this.y = 0
		this.wSum = 0
		this.dews = []
		this.dws = []
		this.dey = 0 
	}
// activation

	initWeights(size){
		let ws = []
		for(let i = 0; i < size; i++)ws.push(random(1))
		return ws
	}

	updateWeight(weightIndex,newWeight){
		this.weights[weightIndex] = newWeight
	}

	updateOutputSize(n){
		this.outputSize = n
	}

	clearInput(){
		this.xs = []
	}

	updateInputs(inputs){
		this.clearInput()
		inputs.forEach(i=>this.xs.push(i))
	}

	sum(){
		let sum = 0
		this.xs.forEach((input,index)=> sum += input * this.weights[index])
		this.wSum = sum
		return sum
	}
	
	activation_(x){
		return sig(x)
	}

	output(){
		return this.y
	}

	process(arr){
		this.updateInputs(arr)
		this.y = this.activation_(this.sum())
		return this.y
	}

}


