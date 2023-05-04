import Neuron from "./neuron"
import { randElements } from "../functions.js"

class Layer {
    constructor(neuronsData, neuronsCount=1, inputCount=1, inputLayer=false) {
        this.neurons = []
        this.inputLayer = inputLayer
        if (neuronsData) {
            this.inputLayer = neuronsData.inputLayer
            neuronsData.neurons.forEach(neuronData => {
                this.neurons.push(new Neuron(neuronData.countInput, neuronData.weights, neuronData.bias))
            });
        } else {
            for (let i = 0; i < neuronsCount; i++) {
                this.neurons.push(new Neuron(inputCount))
            }
        }
    }

    run(inputs) {
        let out = []
        if (this.inputLayer) {
            this.neurons.forEach((neuron, index) => {
                out.push(neuron.run([inputs[index]]))
            })
        } else {
            this.neurons.forEach(neuron => {
                out.push(neuron.run(inputs))
            })
        }
        return out
    }

    mutation() {
        let mutationNeurons = randElements(this.neurons)
        mutationNeurons.forEach(neuron => {
            neuron.mutation()
        })
    }

    exportData() {
        return JSON.parse(JSON.stringify(this))
    }
}

export default Layer