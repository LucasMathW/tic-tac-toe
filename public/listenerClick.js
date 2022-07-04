export default function listenerClick(document){
  
  const state = {
    observers: [],
    player: null
  }

  function subscribeFunction(observerFunction){
    state.observers.push(observerFunction)
  }

  function subscribePlayer(player){
    state.player = player
  }

  function notifyAllFunctions(command){
    console.log(`notifying that ${state.observers.length} sListenerClick class are observing`)
    for(const observerFunction of state.observers){
      observerFunction(command)
    }
  }
  
  document.addEventListener('click', (event)=>{
    const {offsetX, offsetY} = event
    
    const command = {
      type : 'new-move',
      playerId : state.player,
      offsetX,
      offsetY
    }

    notifyAllFunctions(command)
  })

  return {
    subscribeFunction,
    subscribePlayer
  }
}