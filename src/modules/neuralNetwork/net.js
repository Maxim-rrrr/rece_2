import Layer from "./layer";

class Net {
    constructor(netData, schemeCreate=[]) {
        this.layers = []
        if (netData) {
            netData.layers.forEach(layerData => {
                this.layers.push(new Layer(layerData))
            })
        } else {
            // Создание входного слоя
            this.layers.push(new Layer(false, schemeCreate[0], 1, true))

            // Создание промежуточных и выходного слоя 
            for (let i = 1; i < schemeCreate.length; i++) {
                this.layers.push(new Layer(false, schemeCreate[i], schemeCreate[i - 1]))
            }
        }
    }

    run(inputs) {
        let out = this.layers[0].run(inputs)

        for (let i = 1; i < this.layers.length; i++) {
            out = this.layers[i].run(out)
        }

        return out
    }

    mutation() {
        this.layers.forEach(layer => {
            layer.mutation()
        })
    }

    exportData() {
        return JSON.parse(JSON.stringify(this))
    }
}

export default Net