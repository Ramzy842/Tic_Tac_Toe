
const gameBoard = (()=>{
    const mainGrid = document.querySelector('main')
    const markers = document.querySelectorAll('p');
    
    let board = [];
    const markersArr = [];
    const player01Marks = [];
    const player02Marks = [];

    

    let getMarkers = () => {
        for(let i=0; i<markers.length; i++){
            let marker = markers[i];
            markersArr.push(marker);
        }
    }

    getMarkers();   
    
    
   
    markersArr.forEach((marker, index) => {
        marker.addEventListener('click', () =>{
            if(playersChosen.every(val=> val.includes('player_human'))){
                displayController.switchPlayerTurn(index);
                if(marker.innerText === player01.marker){
                    board.push(index)
                    player01Marks.push(index);
                    
                }else{
                    board.push(index)
                    player02Marks.push(index);
                }
                
                displayController.checkWDL();
                
            }
        }, {once: true})
        
    })
    

    const draw = (marker, player)=>{
        marker.innerText = player.marker;
        marker.style.color = player.color;
    }

    const Player = (name, marker, color, type) => {
        return{name, marker, color, type};
    }

    const player01 = Player('player01', 'X', '#66A5AD', 'Human');
    const player02 = Player('player02', 'O', "#eb117e", 'Human');
    const AI01 = Player('Ai01', 'X', '#66A5AD', 'Ai');
    const AI02 = Player('Ai02', 'O', '#eb117e', 'Ai');


    //AI moves
     
    const aiMoves = () => {
       const moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
       const AiRandomMove = Math.floor(Math.random() * moves.length)
       //console.log(AiRandomMove)
       return {AiRandomMove}
    }

    //console.log(aiMoves().AiRandomMove)

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]]

        return {
            player01,
            player02, 
            AI01,
            AI02,
            draw, 
            markersArr, 
            board, 
            player01Marks, 
            player02Marks, 
            winningCombinations,
            mainGrid,
            aiMoves,
            markers
        };
})();
 

let displayController = (()=>{
    //const gBoard = document.querySelector('.gameBoard')
    //const restartBtnContainer = document.querySelector('.second-container')
    const turn = document.querySelector('.turn');
    //const displayWinner = document.querySelector('#winner span');
    const displayWinnerId = document.getElementById('winner');
    const overlay = document.querySelector('.overlay');
    const playerHuman01Btn = document.querySelector('.choice01 .player_human');
    const playerHuman02Btn = document.querySelector('.choice02 .player_human');
    const playerAi01Btn = document.querySelector('.choice01 .player_ai');
    const playerAi02Btn = document.querySelector('.choice02 .player_ai');
    turn.style.color =  '#003B46';
    turn.innerText = `Turn: ${gameBoard.player01.name} turn`;

    playersChosen = [];
    console.log(playersChosen)

    
    const switchTurn = () => {
        let counter = 0;
        return (idx)=>{
            if(playersChosen.every(val=> val.includes('player_human'))){
                turn.innerText = `Turn: ${gameBoard.player01.name} turn`;
                if(counter % 2 === 0){
                    gameBoard.draw(gameBoard.markersArr[idx], gameBoard.player01);
                    turn.innerText = `Turn: ${gameBoard.player02.name} turn`;
                    turn.style.color = gameBoard.player02.color;
                    counter++;
                }else{
                    gameBoard.draw(gameBoard.markersArr[idx], gameBoard.player02)
                    turn.innerText = `Turn: ${gameBoard.player01.name} turn`;
                    turn.style.color =  '#003B46';
                    counter++;
                }
            }  
        } 
    }

    

    const switchPlayerTurn = switchTurn();


    /*const displayInitialTurn = ()=>{
        if(playersChosen.every(val=> val.includes('player_human'))){
            turn.innerText = `Turn: ${gameBoard.player01.name} turn`;
        }
        if(playersChosen.every(val=> val.includes('player_ai'))) {
            turn.innerText = `Turn: ${gameBoard.AI01.name} turn`;
        }
    } 

    displayInitialTurn()*/
    
       

    const checkWDL = () => {
       
        
            if((gameBoard.player01Marks.length || gameBoard.player02Marks.length) >= 3){
                
                let board = 9 + gameBoard.board.length ;
                
                for(let i=0; i < board;i++){
                    
                    if(gameBoard.winningCombinations[i] != undefined){
                        let resultX = gameBoard.player01Marks.filter(element => gameBoard.winningCombinations[i].includes(element));
                        let resultO = gameBoard.player02Marks.filter(element => gameBoard.winningCombinations[i].includes(element));
                        if(playersChosen.every(val=> val.includes('player_human'))){
                            if(gameBoard.board.length < 9){
                                if(resultX.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner">Winner: <span>${gameBoard.player01.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return
        
                                }else if(resultO.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner" style= "color:${gameBoard.player02.color}">Winner: <span>${gameBoard.player02.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return
        
                                }
                            }

                            else if(gameBoard.board.length === 9){
                                if(resultX.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner">Winner: <span>${gameBoard.player01.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return

                                }else if(resultO.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner" style= "color:${gameBoard.player02.color}">Winner: <span>${gameBoard.player02.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return
        
                                }else{
                                    displayWinnerId.innerHTML = `<h2 id="winner" style ="color: #fff"><span>Tie</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                }
                            }
                        }

                        else if(playersChosen.every(val=> val.includes('player_ai'))){
                            if(gameBoard.board.length < 9){
                                if(resultX.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner">Winner: <span>${gameBoard.player01.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return
        
                                }else if(resultO.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner" style= "color:${gameBoard.player02.color}">Winner: <span>${gameBoard.player02.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return
        
                                }
                            }

                            else if(gameBoard.board.length === 9){
                                if(resultX.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner">Winner: <span>${gameBoard.player01.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return

                                }else if(resultO.length === 3){
                                    displayWinnerId.innerHTML = `<h2 id="winner" style= "color:${gameBoard.player02.color}">Winner: <span>${gameBoard.player02.name}</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                    return
        
                                }else{
                                    displayWinnerId.innerHTML = `<h2 id="winner" style ="color: #fff"><span>Tie</span></h2>`;
                                    turn.remove();
                                    restarGameFunc();
                                }
                            }
                        }
                    }
                }
            }
        }

    const restarGameFunc = ()=>{
        
        const restart = document.querySelector('.restartGame');
        
        overlay.style.display = 'block';
        restart.style.display = 'grid';
        restart.addEventListener('click', ()=>{
            location.reload();
        })
    }
    

    const vs = document.createElement('h1');
    document.querySelector('.choice01').after(vs)
    vs.innerText= 'VS';
    vs.setAttribute("class", "vs")
    vs.style.fontSize = '10rem';
    vs.style.color = '#fff';
    vs.style.justifySelf = "center"
    vs.style.padding = '1rem'

    const startGame = () => {
        if(playersChosen.length == 2 ){
            turn.style.display = 'flex';
            overlay.style.display = 'none'
            vs.remove()
            gameBoard.mainGrid.style.display = 'grid';
            playerHuman01Btn.removeEventListener('click', choosePlayerType.btnH1)
            playerHuman02Btn.removeEventListener('click', choosePlayerType.btnH2)
            //playerAi01Btn.removeEventListener('click', choosePlayerType.btnAi01)
            //playerAi02Btn.removeEventListener('click', choosePlayerType.btnAi02)
        }
    }

    //player choice
    let choosePlayerType = () => {
        overlay.style.display = 'block';
        turn.style.display = 'none';
        gameBoard.mainGrid.style.display = 'none';
        
        const btnH1 = () => {
            playerHuman01Btn.style.color = '#000'
            playerHuman01Btn.style.backgroundColor = ' rgb(28, 185, 28)'
            //playerHuman01Btn.style.transform = 'translateX(20px)'
            //playerAi01Btn.remove();
            playersChosen.push(playerHuman01Btn.classList.value)
            startGame()
        }

        const btnH2 = () => {
            playerHuman02Btn.style.color = '#fff'
            playerHuman02Btn.style.backgroundColor = ' rgb(28, 185, 28)'
            //playerHuman02Btn.style.transform = 'translateX(-20px)'
            //playerAi02Btn.remove();
            playersChosen.push(playerHuman02Btn.classList.value)
            startGame()
        }

        /*const btnAi01 = ()=>{
            playerAi01Btn.style.color = '#000'
            playerAi01Btn.style.backgroundColor = 'rgb(236, 13, 61)'
            playerAi01Btn.style.transform = 'translateX(20px)'
            playerHuman01Btn.remove();
            playersChosen.push(playerAi01Btn.classList.value)
            startGame()
        }

        const btnAi02 = ()=>{
            playerAi02Btn.style.color = '#fff'
            playerAi02Btn.style.backgroundColor = 'rgb(236, 13, 61)'
            playerAi02Btn.style.transform = 'translateX(-20px)'
            playerHuman02Btn.remove();
            playersChosen.push(playerAi02Btn.classList.value)
            startGame()
        }*/

       playerHuman01Btn.addEventListener('click', btnH1, {once: true})
       playerHuman02Btn.addEventListener('click', btnH2, {once: true})
       //playerAi01Btn.addEventListener('click', btnAi01, {once: true})
       //playerAi02Btn.addEventListener('click', btnAi02, {once: true})        

       return {btnH1, btnH2/*, btnAi01, btnAi02*/}
    }

    choosePlayerType();

    return {
        switchPlayerTurn,
        checkWDL, 
        turn  
    }
    
})();


