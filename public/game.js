export default function createGame(){

  const state = {
    players: {

    },scream: {
      width: 400,
      height: 400,
      columWidth: 400 / 3,
      rowHeight: 400 / 3,
    },
    currentPlayer : null,
    status : null,
    _matrix : null,
    isRunning : false,
    onceRun : true
  }

  const observers = [];

  function registerFunction(observerFunction){
    observers.push(observerFunction)
  }

  function notifyAllFunctions(command){
    console.log(`notifying that ${observers.length} sGame class are observing`)
    for(const observerFunction of observers ) {
      observerFunction(command)
    }
  }

  function init(){
    newGame()
  }

  function newGame(){
    state.status = ""
    state._matrix = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""] 
    ]
    state.isRunning = !state.isRunning
  }

  function setState(newState){
    Object.assign(state, newState)
  }

  function addPlayer(command){
    const lengthPlayers = Object.keys(state.players).length
    
    if(lengthPlayers >= 2){
      console.log('Is Already exist two player in this game')
      return
    }

    const playerId = command.playerId
    const color = lengthPlayers != 1 ? "#c54456" : "#c7c734"
    const symbol = lengthPlayers != 1 ? 'X' : "O"
    
    state.players[playerId] = {
      id : playerId,
      color : color,
      symbol : symbol
    }

    if(state.currentPlayer === null){
      state.currentPlayer = state.players[playerId]  
    }

    notifyAllFunctions({
      type: 'add-player',
      playerId : playerId,
      color: color,
      symbol: symbol
    })
  }

  function newMove(command){
    notifyAllFunctions(command)
    
    const playerId = command.playerId
    const offsetX = command.offsetX
    const offsetY = command.offsetY

    const _columWidth = state.scream.columWidth
    const _rowHeight = state.scream.rowHeight

    const col = Math.floor(offsetX / _columWidth)
    const row = Math.floor(offsetY / _rowHeight)

    console.log('PLAYER ID COMMAND', playerId)
    console.log('players', state.players)
    console.log('player', state.players[playerId] )

    Object.defineProperties(state.players[playerId],{
      'col': {value: col, writable: true},
      'row': {value: row, writable: true}
    })

    if(state.currentPlayer !== null && state._matrix[row][col] == ""){
      drownInMatrix(row, col)
    }
  }

  function drownInMatrix(row, col){
    if(row != -1 && col != -1 ){
      console.log('CURRENT PLAYER =>',  state.currentPlayer)
      state._matrix[row][col] = state.currentPlayer.symbol
      checkWinner()
      checkTie()
      changerPlayer()
    }
  }

  function checkWinner(){
    const MIN = 3  
    //COMPARE IN HORIZONTAL
    for(let line = 0; line < MIN; line++){
      for(let col = 0; col < MIN; col++){
        if(col === 2){
          compareSymbols(state._matrix[line][col-2], state._matrix[line][col-1], state._matrix[line][col])
        }
      }
    }

    //COMPARE IN VERTICAL
    for(let col = 0; col < MIN; col++){
      for(let line = 0; line < MIN; line++){
        if(line === 2){
          compareSymbols(state._matrix[line-2][col], state._matrix[line-1][col], state._matrix[line][col])
        }
      }
    }

    //COMPARE IN DIAGONAL
    compareSymbols(state._matrix[0][0], state._matrix[1][1], state._matrix[2][2])
    compareSymbols(state._matrix[2][0], state._matrix[1][1], state._matrix[0][2])
  }

  function checkTie(){
    let cont = 0

    let cols = state._matrix[0].length
    let lines = state._matrix.length

    for(let col = 0; col < cols; col++){
      for(let line = 0; line < lines; line++){
        if (state._matrix[col][line] != ""){
          cont++
        }
      }
    }

    const isTie = cont == cols * lines

    if(isTie){
      state.status = "empate"
      const status = state.status
      console.log(status)
    }

    return isTie
  }

  function changerPlayer(){
    
    const firstKey = Object.keys(state.players)[0]
    const secondKey = Object.keys(state.players)[1]
    
    console.log('CURRENT PLAYER first time', state.currentPlayer)
    state.currentPlayer = state.currentPlayer.id === firstKey ? state.players[secondKey] : state.players[firstKey] 
    console.log('CURRENT PLAYER second time', state.currentPlayer)
  }

  function compareSymbols(a, b, c){
    if(a === b && b === c && c !== ""){
        state.status = "winner"
        const status = state.status
        console.log(status)
        return true
    }
    state.status = "tier"
    return false
  } 

  return {
    registerFunction,
    notifyAllFunctions,
    init,
    state,
    setState,
    addPlayer,
    drownInMatrix,
    newMove,
    checkWinner,
    checkTie,
    compareSymbols,
    changerPlayer
  }
}