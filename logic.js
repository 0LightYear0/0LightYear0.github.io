function LifeGame(length) {
    this.length = length;
    this.cell = [];
    this.remainLifes = 0;
}

//初始化生命，百分比生成生命数量，随机生成位置
LifeGame.prototype.init = function(percent) {
    this.remainLifes = 0;
    for(var i=0;i<this.length;i++) {
        this.cell[i] = [];
        for(var j=0;j<this.length;j++) {
            if (Math.random() * 100 <= percent) {
                this.cell[i][j] = {'state':1, 'next':1};
                this.remainLifes++;
            } 
			else {
                this.cell[i][j] = {'state':0, 'next':0};
            }
        }
    }
};

//计算某个生命周围的细胞生存个数
LifeGame.prototype.aliveCount = function(x,y) {
    return this.cell[this.map(x-1)][this.map(y-1)].state + this.cell[this.map(x-1)][y].state + this.cell[this.map(x-1)][this.map(y+1)].state + this.cell[x][this.map(y-1)].state + this.cell[x][this.map(y+1)].state + this.cell[this.map(x+1)][this.map(y-1)].state + this.cell[this.map(x+1)][y].state + this.cell[this.map(x+1)][this.map(y+1)].state;
};

//边界相通，使游戏的地图无限延展
LifeGame.prototype.map = function(t) {
    if (t >= this.length){
		return t%this.length;
	}
	else if(t < 0){
		return this.length + t;
	}
	else{
		return t;
	}
};

//用于计算某个生命的下一回合的生存状态
LifeGame.prototype.nextState = function(x,y) {
    var aliveCount = this.aliveCount(x,y);
    if (aliveCount >= 4) {
        return 0;
    } 
	else if(aliveCount == 3) {
        return 1;
    } 
	else if(aliveCount >= 2) {
        return this.cell[x][y].next;
    } 
	else {
        return 0;
    }
};

//计算所有生命的下一回合的生存状态
LifeGame.prototype.calNextState = function() {
    this.remainLifes = 0;
    for(var i=0;i<this.length;i++) {
        for(var j=0;j<this.length;j++) {
            this.cell[i][j].next = this.nextState(i, j);
            if (this.cell[i][j].next == 1) {
                this.remainLifes++;
            }
        }
    }
};
//转换
LifeGame.prototype.changeNextState = function() {
  for(var i=0;i<this.length;i++) {
      for(var j=0;j<this.length;j++) {
          this.cell[i][j].state = this.cell[i][j].next;
      }
  }
};

//判断某个生命是否存活
LifeGame.prototype.isAlive = function(x,y) {
    return this.cell[x][y].state == 1;
};
