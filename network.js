console.log('netvark')



class Network{
	constructor({layers = [], inputSize = 2, outputSize = 1, layerCount = 2, xs = [], ys = [], ts = []}={}){
		this.layers = layers
		this.layerCount = layers.length
		this.xs = xs
		this.ts = ts
		this.ys = ys
		this.p = 0
		this.x
		this.y
	}

	train(p,a,xs){
		this.process([xs[p]],p,0)
		for(let i = this.layers.length-1; i >= 0; i--){
			const l = this.layers[i]
			l.nodes.forEach((n,j)=>{
				n.weights.forEach((w,k)=>this.trainWeight(i,j,k,a,this.ts[p]))
			})
		}
		//console.log('Network Trained')
		return this.process([xs[p]],p,1)
		
	}

	trainWeight(l,n,w,a,t){	
		const dw = this.myBP(l,n,w,a,t)
		const W = this.layers[l].nodes[n].weights[w]
		const newW = W + dw
		this.layers[l].nodes[n].updateWeight(w,newW)
		return newW
	}
		
	sumNextLayerImpact(lc,j){
		const nj = this.layers[lc].nodes[j]
		const l1 = this.layers[lc+1]
		let sum = 0
		l1.nodes.forEach(n=> sum += (n.dey*(n.y*(1-n.y))*n.dews[j]))
		return sum
	}

	networkError(y,t) {return (t-y)**2/2}
	
	myBP(l,n,w,a,t){
		const end = this.layers.length-1
		const oj = this.layers[l].nodes[n].y
		const dey = l == end ? oj-t : this.sumNextLayerImpact(l,n)
		const oi = l == 0 ? this.xs[w] : this.layers[l-1].nodes[w].y
		const dve = (l == end ? oj-t : dey) * oj*(1-oj)*oi
		const dw = -a*dve

		this.layers[l].nodes[n].dews[w] = dve
		this.layers[l].nodes[n].dey = dey
	
		return dw
		}

	addLayers(layers){layers.forEach(layer=>this.layers.push(layer))}

	addLayer(layer){this.layers.push(layer)}

	clearInput(){this.xs = []}

	updateInputs(input){
		//console.log('Nu',input)
		//this.clearInput()
		//input.forEach(i=>this.xs.push(i))
		this.x = input
	}

	formatData(arr){
		const x = arr[0]
		const y = arr[1]
		const d = []
		this.ts = y
		x.forEach((x,i)=>{d.push([x,y[i]])})
		return d
	}

	formatData2(arr){
		return arr[0]
	}
	
	processData(arr){
		const d = this.formatData2(arr)
		let res = []
		d.forEach(data=>res.push(this.process(data)))
		this.ys = res
		return res
	}

	process(arr,index,p){
		this.updateInputs(arr)
		let cur = []
		this.layers.forEach((layer,ind)=>{
			cur = layer.process(ind ? cur : arr)
		})
		if (p)return(this.ts[index]-cur[0])**2/2
		return cur
	}


}

myBPold(l,n,w,a,x,y){
		let dve = 0
		//console.log('Nm',l,n,w,a,x,y,dve)
			//console.log('bp',l,n,w,a,x,y)
			if(l == this.layers.length-1) {
				const oj = this.layers[l].nodes[n].y
				const t = y
				const oi = this.layers[l-1].nodes[w].y
				dve = (oj-t)*oj*(1-oj)*oi
				//console.log('NmlO',l,n,w,this.layers[l].nodes[n].dews)
				this.layers[l].nodes[n].dews[w] = dve
				this.layers[l].nodes[n].dey = oj-t
				//console.log('Nml0',dve,oj,t,oi)
			}
			else if(l == 0){
				//console.log('Nml0',l,n,w)
				const oj = this.layers[l].nodes[n].y
				const oi = this.xs[w]
				const dey = this.sumNextLayerImpact(l,n)
				//console.log('Nml0',oj,oi,dey)
				dve = dey*(oj*(1-oj))*oi
				this.layers[l].nodes[n].dews[w] = dve
				this.layers[l].nodes[n].dey = dey
			}else{
				//console.log('Nmlx',l,n,w)
				const oj = this.layers[l].nodes[n].y
				//console.log('Nmlxoj',oj)
				const oi = this.layers[l-1].nodes[w].y
			//	console.log('Nmlxoi',oi)
				const dey = this.sumNextLayerImpact(l,n)
			//	console.log('Nmlxdey',dey)
			
				dve = dey*(oj*(1-oj))*oi
				this.layers[l].nodes[n].dews[w] = dve
				this.layers[l].nodes[n].dey = dey
			}
			const dw = -a*dve
			//console.log('Nmdw',dw)
			return dw
		}

/*
//trainweight notes

	//console.log('tw',l,n,w,a,x,y)
		//how should wlk change to minimize E
		//x,y -> E
		//dE/dwljk = dd = dE/dOlj * dOlj/dnetlj * dnetlj/dwljk
		// dd = O(ll)k * o(ll)k(1-o(ll)k) * 

//sssum = (de/dwik)
//dd = de/dwljk = 
//if l = output layer = (de/dw = de/doj * doj/dnetj * dnetj/dw = oj-t * sig(oj)(1-sig(oj)) * oi.      output**2*error*(1-output)
//else output**2*(1-output) * sum((i =j+1 i<n i++ {sssum(i)}))

//wljk += -dd*alpha
*/