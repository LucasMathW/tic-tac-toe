export default function ticTacToe(canvas){
  this.canvas = canvas
  this.status = null

  this.dimentionColun = 0
  this.dimentionRow = 0

  this.contex = false
  this.status = ""

  this._matrix = ""
  this.isRunnig = false

  this.init()

}

ticTacToe.prototype.init = function(){
  const canvas = this.canvas
  canvas.width = 400
  canvas.height = 400

  canvas.style.width = canvas.width
  canvas.style.width = canvas.height

  this.dimentionColun = canvas.width / 3
  this.dimentionRow = canvas.height / 3

  this.contex = canvas.getContext('2d')

  this.newGame()
}

ticTacToe.prototype.newGame = function(){
  this.status = ""
  // this._matrix = [
  //   ["", "", ""],
  //   ["", "", ""],
  //   ["", "", ""] 
  // ]
  this.isRunnig = true
  this.downBoard()
}

ticTacToe.prototype.downBoard = function(){
  this.contex.strokeStyle = '#596575'

  this.contex.lineWidth = 3

  //Draw vertial line 1
  this.contex.beginPath()
  this.contex.moveTo(this.dimentionColun, 0)
  this.contex.lineTo(this.dimentionColun, 400 )
  this.contex.stroke()

  //Draw vertial line 2
  this.contex.beginPath()
  this.contex.moveTo(2 * this.dimentionColun, 0)
  this.contex.lineTo(2 * this.dimentionColun, 400 )
  this.contex.stroke()

  this.contex.beginPath()
  this.contex.moveTo(0, this.dimentionRow)
  this.contex.lineTo(400, this.dimentionRow)
  this.contex.stroke()

  this.contex.beginPath()
  this.contex.moveTo(0, 2 * this.dimentionRow)
  this.contex.lineTo(400, 2 * this.dimentionColun)
  this.contex.stroke()

}