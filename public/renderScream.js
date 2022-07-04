export default function renderScream(canvas, game){
  const width = game.state.scream.width
  const height = game.state.scream.height
  const _columWidth = game.state.scream.columWidth
  const _rowHeight = game.state.scream.rowHeight
  canvas.width = width;
  canvas.height = height;
  
  const context = canvas.getContext('2d')
    
  context.strokeStyle = '#596575'
  context.lineWidth = 3
  context.beginPath()
  context.moveTo(_columWidth, 0)
  context.lineTo(_columWidth, 400)
  context.stroke()

  context.beginPath()
  context.moveTo(2 * _columWidth, 0)
  context.lineTo(2 * _columWidth, 400)
  context.stroke()

  context.beginPath()
  context.moveTo(0, _rowHeight)
  context.lineTo(400, _rowHeight)
  context.stroke()

  context.beginPath()
  context.moveTo(0, 2 * _rowHeight)
  context.lineTo(400, 2 * _rowHeight)
  context.stroke()

  renderPlayers(context, game, requestAnimationFrame)
  
  function renderPlayers(context, game, requestAnimationFrame){
    for(const playerId in game.state.players){
      const player = game.state.players[playerId]
      const {color, symbol, col, row} = player
      
      context.fillStyle = color
      context.font = (400 / 5) + 'px Arial'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(symbol, col * _columWidth + _columWidth / 2, row * _rowHeight + _rowHeight / 2)
    }
    
    requestAnimationFrame(() => {
      renderPlayers(context, game, requestAnimationFrame)
    })
  }
  
}