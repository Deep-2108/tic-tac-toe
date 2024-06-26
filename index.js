const boxes=document.querySelectorAll(".box")
const newgamebtn=document.querySelector(".btn")
let gameInfo=document.querySelector(".gameInf");
let para=document.querySelector(".pdiv");

let currentPlayer;
let gameGrid;


let winningPosn=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]

function initGame(){
    currentPlayer="X";
    gameGrid=[[""],[""],[""],[""],[""],[""],[""],[""],[""]];

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        boxes[index].classList.remove("win");
    })
    newgamebtn.classList.remove("active");
    para.classList.remove("winner");
    para.classList.remove("redc");
    gameInfo.innerText=` CurrentPlayer-${currentPlayer} `;
}
initGame();


function checkGameOver(){
    let answer="";
    winningPosn.forEach((position)=>
    {
        if((gameGrid[position[0]]!="" &&gameGrid[position[1]]!="" &&gameGrid[position[2]]!="" )&&gameGrid[position[0]]==gameGrid[position[1]] &&gameGrid[position[1]]==gameGrid[position[2]]  ){
            if(gameGrid[position[0]]=="X" ){
                answer="X";
            }
            else answer="0";
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
        }
    });
    if(answer!=""){
        gameInfo.innerText=`Winner-${answer}`;
        newgamebtn.classList.add("active");
        para.classList.add("winner");
        return;
    }
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    });
    if(fillCount==9){
        gameInfo.innerHTML="Game Tied!";
        para.classList.add("redc");
        newgamebtn.classList.add("active");
    }
}
function handleClick(index){
    if(gameGrid[index]==""){
        gameGrid[index]=currentPlayer;
        boxes[index].innerHTML=currentPlayer;
        boxes[index].style.pointerEvents="none";
        if(currentPlayer=="X")currentPlayer="0";
        else currentPlayer="X";
        gameInfo.innerText=`CurrentPlayer-${currentPlayer}`;
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

newgamebtn.addEventListener("click",initGame);
