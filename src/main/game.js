
const blockRowCount=10;
const blockColumnCount=10;
const timeLimit=10;

let gameState='idle';
let gameTimer=0;
let gameInterval;
let hitCount=0;

$(document).ready(function() {
    const gameTable= $('#tbGamePlaceHolder');

    for(i=0;i<blockRowCount;i++){
        let rowContent=''
        for(j=0;j<blockColumnCount;j++){
            rowContent+= '<td></td>';
            // rowContent+= '<td>'+ (i*j + j)+'</td>';
        }
        gameTable.append('<tr>'+ rowContent+'</tr>');
    }

    //Set table width to the window width
    const windowWidth=$(window).width();
    const windowHeight=$(window).height();
   // const minWidthHeight= windowWidth<windowHeight?windowWidth:windowHeight;
    gameTable.width(windowWidth);
    gameTable.height(windowHeight);

   
    $('#btnStart').click(onClickStart);
});

function lightRandomCell(){
    const randomRow= Math.round(Math.random() * blockRowCount-1);
    const randomColumn= Math.round(Math.random() * blockColumnCount-1);

    $('#tbGamePlaceHolder tr:eq('+randomRow+') td:eq('+randomColumn+')').addClass('active');
    $('.active').mousedown(onCellClick);
}

function onClickStart(){
    if(gameState=='idle'){
        gameState='running';

        $(this).text('Reset');

        gameInterval= setInterval(function(){
            gameTimer++;
            $('#lblTimer').text('Time: '+ gameTimer);
            if(gameTimer==timeLimit){
                resetGame();
            }
        },1000);
        lightRandomCell();

    }else if(gameState=='running'){
        resetGame();
    }
}

function resetGame(){
    gameState='idle';
    $('#btnStart').text('Start');
    $('.active').unbind();
    $('.active').removeClass('active');
    $('#lblTimer').text('');
    clearInterval(gameInterval);
    hitCount=0;
    gameTimer=0;
}

function onCellClick(){
    $(this).removeClass('active');
    $(this).unbind();
    lightRandomCell();
    hitCount++;
    $('#lblHitCount').text('Hit Count: '+ hitCount);
}