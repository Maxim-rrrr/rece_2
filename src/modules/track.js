import {cross, distancePoints} from './functions.js'

class Track {
    constructor(car, walls) {
        this.car = car
        this.walls = walls
        this.rays = []
        this.crossingPoints = []
    }

    getRays() {
        let rays = [];

        [-90, -45, 0, 45, 90].forEach(angle => {
            let x0 = this.car.position.x + Math.sin((this.car.angle + angle) * (Math.PI / 180))
            let y0 = this.car.position.y - Math.cos((this.car.angle + angle) * (Math.PI / 180))
            let x1 = this.car.position.x + 500 * Math.sin((this.car.angle + angle) * (Math.PI / 180))
            let y1 = this.car.position.y - 500 * Math.cos((this.car.angle + angle) * (Math.PI / 180))
            rays.push([{x: x0, y: y0}, {x: x1, y: y1}])
        });
        this.rays = rays
        return rays
    }

    getRaysCrossWalls() {
        let crossingPoints = []
        this.rays.forEach(ray => {
            crossingPoints.push(this.crossingWithWalls(ray[0], ray[1]))
        })
        this.crossingPoints = crossingPoints
        return crossingPoints
    } 

    getDistance() {
        this.crossingPoints.forEach()
    }

    // {x, y}, {x, y}
    crossingWithWalls(point1, point2) {
        let lines = this.walls.getLines()
        let crossingPoints = []
        for (let indexLine = 0; indexLine < lines.length; indexLine++) {

            let points = lines[indexLine].points
            if (lines[indexLine].cycle) {
                points.push(points[0])
            }
    
            for (let index = 0; index < points.length - 1; index++) {
                let crossPoint = cross([point1, point2, points[index], points[index + 1]])
                if (crossPoint) {
                    crossingPoints.push(crossPoint)
                }
            }
        }

        if (crossingPoints.length === 1) {
            return {point: crossingPoints[0], distance: distancePoints(this.car.position, crossingPoints[0])}
        } else if (crossingPoints.length > 1) {
            let minDistance = distancePoints(this.car.position, crossingPoints[0])
            let point = crossingPoints[0]
            crossingPoints.forEach((crossPoint, index) => {
                let distance = distancePoints(this.car.position, crossPoint)
                if (distance < minDistance) {
                    minDistance = distance
                    point = crossingPoints[index]
                }
            })

            return {point, distance: minDistance}
        }

        return {point: point2, distance: distancePoints(this.car.position, point2)}
    }

    wallsCollision() {
        this.car.getBodyLine()
    }
}

export default Track