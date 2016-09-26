var life;
var lifeTimer = 0;
var canvas = new fabric.Canvas('canvas');
canvas.renderOnAddRemove = false;
var cells = [];

restartLifeGame();
//初始化生命游戏
function initLifeGame()
{
    var rect = new fabric.Rect({
        top : 0,
        left : 0,
        width : 800,
        height : 800,
        fill : 'white',
        strokeWidth: 2,
        stroke: '#C1C1C1'
    });
    canvas.add(rect);
    canvas.renderAll();
}

//按照输入大小重新开始
function restartLifeGame()
{
    var length = parseInt(document.getElementById('lifeSize').value);
    if (lifeTimer != 0)
        clearInterval(lifeTimer);
    canvas.clear();
    initLifeGame();
    startLifeGame(length);
}

function startLifeGame(length)
{
	if (isNaN(length) || length <= 0) {
        alert('输入错误，请重新输入');
        return false;
    }
    life = new LifeGame(length);
	var percent = parseInt(document.getElementById('lifePercent').value);
	if (isNaN(percent) || percent <= 0) {
        alert('输入错误，请重新输入');
        return false;
    }
    life.init(percent);
    var cellLength  = 800/life.length;
    for(var i=0;i<life.length;i++) {
        cells[i] = [];
        for(var j=0;j<life.length;j++) {
            cells[i][j] = new fabric.Circle({
                top:    i*cellLength,
                left:   j*cellLength,
                radius: cellLength/2,
                fill:   'yellow',
                stroke: '#00BCD4',
                strokeWidth: 1,
                visible:    false
            });
            canvas.add(cells[i][j]);
        }
    }
    refreshLife(); 
    lifeTimer = setInterval(refreshLife, 300);
}
//刷新状态
function refreshLife()
{
    for(var i=0;i<life.length;i++) {
        for(var j=0;j<life.length;j++) {
            if (life.isAlive(i,j))  {
               cells[i][j].visible = true;
            } else {
               cells[i][j].visible = false;
            }
        }
    }
    canvas.renderAll();
    document.getElementById('remainLifes').innerText = life.remainLifes;
	life.calNextState();
	life.changeNextState();
}