
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
            
            displayController.switchPlayerTurn(index);
            if(marker.innerText === player01.marker){
                board.push(index)
                player01Marks.push(index);
                
            }else{
                board.push(index)
                player02Marks.push(index);
            }

            displayController.checkWDL();
            
        }, {once: true})
    })

    const draw = (marker, player)=>{
        marker.innerText = player.marker;
        marker.style.color = player.color;
    }

    const Player = (name, marker, color) => {
        return{name, marker, color};
    }

    const player01 = Player('player01', 'X', '#66A5AD');
    const player02 = Player('player02', 'O', "#eb117e");

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]]

        return {
            player01,
            player02, 
            draw, 
            markersArr, 
            board, 
            player01Marks, 
            player02Marks, 
            winningCombinations,
            mainGrid
        };
})();
 

const displayController = (()=>{
    const gBoard = document.querySelector('.gameBoard')
    const restartBtnContainer = document.querySelector('.second-container')
    const turn = document.querySelector('.turn');
    const displayWinner = document.querySelector('#winner span');
    const displayWinnerId = document.getElementById('winner');
    turn.innerText = `Turn: ${gameBoard.player01.name} turn`;
    turn.style.color =  '#003B46';

    const switchTurn = () => {
        let counter = 0;
        return (idx)=>{
            if(counter % 2 === 0){
                gameBoard.draw(gameBoard.markersArr[idx], gameBoard.player01, gameBoard.player01.color);
                turn.innerText = `Turn: ${gameBoard.player02.name} turn`;
                turn.style.color = gameBoard.player02.color;
                counter++;
            }else{
                gameBoard.draw(gameBoard.markersArr[idx], gameBoard.player02, gameBoard.player02.color)
                turn.innerText = `Turn: ${gameBoard.player01.name} turn`;
                turn.style.color =  '#003B46';
                counter++;
            }
        } 
    }

    const checkWDL = () => {
       
        
            if((gameBoard.player01Marks.length || gameBoard.player02Marks.length) >= 3){
                
                let board = 9 + gameBoard.board.length ;
                
                for(let i=0; i < board;i++){
                    
                    if(gameBoard.winningCombinations[i] != undefined){
                        let resultX = gameBoard.player01Marks.filter(element => gameBoard.winningCombinations[i].includes(element));
                        let resultO = gameBoard.player02Marks.filter(element => gameBoard.winningCombinations[i].includes(element));
                        
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

    const restarGameFunc = ()=>{
        const overlay = document.querySelector('.overlay');
        const restart = document.querySelector('.restartGame');
        
        overlay.style.display = 'block';
        restart.style.display = 'grid';
        restart.addEventListener('click', ()=>{
            location.reload();
        })
    }
    
    const switchPlayerTurn = switchTurn();

    
    return {
        switchPlayerTurn,
        checkWDL, 
        turn
    }
    
    
})();
