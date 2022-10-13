console.log('layercake')
class Layer{
	constructor({inputSize=2, nodeCount=1,outputSize=1,activation}={}){
		this.inputSize = inputSize
		this.nodeCount = nodeCount
		this.outputSize = outputSize
		this.nodes = []
		this.xs = []
		this.ys = []
		this.activation = activation
		this.nodePopulate()
	}

	nodePopulate(){
		for(let i = 0; i < this.nodeCount; i++){
			this.nodes.push(new Perceptron({inputSize:this.inputSize}))
		}
	}

	clearInput(){ this.xs = [] }

	updateInputs(inputs){
 		//console.log('Lu',inputs)
		this.clearInput()
		inputs.forEach(i=>this.xs.push(i))
	}

	process(arr){
		//console.log('Lp',arr)
		let output = []
		this.updateInputs(arr)
		this.nodes.forEach((n,index)=>{
			output.push(n.process(this.xs))
		})
		//console.log('Lpo',output)
		this.ys = output
		return output
	}

	addNode(node){
		this.nodes.push(node)
	}

}