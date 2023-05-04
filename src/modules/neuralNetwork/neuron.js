import { rand } from '../functions.js'

class Neuron {
    constructor(countInput=1, weights=[], bias=0) {
        this.countInput = countInput
        this.weights = weights
        if (countInput !== weights.length) {
            this.weights = Array(countInput).fill(0);
        }

        this.bias = bias
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x))
    }

    run(inputs) {
        let total = this.bias
        inputs.forEach((input, index) => {
            total += input * this.weights[index]
        });

        return this.sigmoid(total)
    }

    mutation() {
        this.weights.forEach((item, index) => {
            this.weights[index] += rand(-0.5, 0.5)
        })
  
        this.bias += rand(-3, 3)
    }

    exportData() {
        return JSON.parse(JSON.stringify(this))
    }
}

export default Neuron