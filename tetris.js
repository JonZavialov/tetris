//Jonathan Zavialov :)

async function initTetris(){
    let board = new Board()
    let game = new Tick(500)
    await board.generate()
    await board.render()
    await board.generateShape()
    await board.draw()
    await game.initGame()
}

class Tetromino{
    constructor(shapeName){
        switch(shapeName){
            case "I":
                this.shape = [
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                this.originCoords = [1,0]
                break
            case "J":
                this.shape = [
                    [0,0,0,0],
                    [0,0,0,1],
                    [0,0,0,1],
                    [0,0,1,1]
                ]
                this.originCoords = [3,2]
                break
            case "L":
                this.shape = [
                    [0,0,0,0],
                    [1,0,0,0],
                    [1,0,0,0],
                    [1,1,0,0]
                ]
                this.originCoords = [0,2]
                break
            case "O":
                this.shape = [
                    [1,1,0,0],
                    [1,1,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                this.originCoords = [1,1]
                break
            case "S":
                this.shape = [
                    [0,1,1,0],
                    [1,1,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                this.originCoords = [1,1]
                break
            case "T":
                this.shape = [
                    [0,1,0,0],
                    [1,1,1,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                this.originCoords = [1,1]   
                break
            case "Z":
                this.shape = [
                    [1,1,0,0],
                    [0,1,1,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                this.originCoords = [1,1]
                break
            default:
                this.shape = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                this.originCoords = [0,0]
                break
        }

        this.name = shapeName
    }

    calculateDistanceFromOrigin(tetriminoX, tetriminoY){
        //calculates the distance of a component of a tetrimno from the origin
        let xDistance = (this.originCoords[0] - tetriminoX) * -1
        let yDistance = (this.originCoords[1] - tetriminoY) * -1
        return [xDistance,yDistance]
    }
}

class Board{
    constructor(){
        this.height = 18
        this.width = 11
        this.spawnLocation = [5,2]
        this.board = []
    }

    generate(){
        // generates the backend board
        for(let i = 0; i < this.height; i++){
            this.board.push([])
            for(let j = 0; j < this.width; j++){
                this.board[i].push("empty")
            }
        }
    }

    render(){
        //renders the table for the first time
        let table = document.getElementById("gameBoard")
        for(let i = 0; i < this.height; i++){
            let row = document.createElement("tr")
            for(let j = 0; j < this.width; j++){
                let className = this.board[i][j]
                let cell = document.createElement("td")
                cell.className = j + "-" + i + " " + className
                cell.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                row.appendChild(cell)
            }
            table.appendChild(row)
        }
    }

    changeTileClassName(x, y, name){
        //changes a tile's class name
        let cell = document.getElementsByClassName(x + "-" + y)[0]
        cell.className = `${x}-${y} ${name}`
    }

    addShape(tetromino){
        //adds a shape to the backend of the board
        for(let i = 0; i < tetromino.shape.length; i++){
            for(let j = 0; j < tetromino.shape[i].length; j++){
                if(tetromino.shape[i][j] == 1){
                    let distance = tetromino.calculateDistanceFromOrigin(j, i)
                    let x = this.spawnLocation[0] + distance[0]
                    let y = this.spawnLocation[1] + distance[1]
                    this.board[y][x] = tetromino.name
                    console.log(x,y)
                }
            }
        }
    }

    generateShape(){
        //generates a random tetromino to add to the backend
        let shapeName = ["I","J","L","O","S","T","Z"]
        let randomShape = shapeName[Math.floor(Math.random() * shapeName.length)]
        let tetromino = new Tetromino(randomShape)
        this.addShape(tetromino)
    }

    draw(){
        //draws the board to the front end
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                this.changeTileClassName(j, i, this.board[i][j])
            }
        }
    }
}

class Tick{
    constructor(speed){
        this.counter = 0
        this.speed = speed
    }

    initGame(){
        //initializes the game
        this.interval = setInterval(() => {
            this.counter++
        }, this.speed)
    }
}
