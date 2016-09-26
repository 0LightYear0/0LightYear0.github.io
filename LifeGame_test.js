describe('initLifeGame',function(){
	it('should be a function', function(){
		assert.isFunction(initLifeGame);
	});
	it('should have no arguments', function(){
		assert.equal(initLifeGame.length, 0);
	});
});

describe('restartLifeGame',function(){
	it('should be a function', function(){
		assert.isFunction(restartLifeGame);
	});
	it('should have no arguments', function(){
		assert.equal(restartLifeGame.length, 0);
	});
});

describe('startLifeGame',function(){
	it('should be a function', function(){
		assert.isFunction(startLifeGame);
	});
	it('should have one argument', function(){
		assert.equal(startLifeGame.length, 1);
	});
	it('should return false when the first argument is minus', function(){
		var test1 = -5;
		assert.strictEqual(startLifeGame(test1),false);
	});
	it('should return false when the first argument is NaN', function(){
		var test2 = NaN;
		assert.strictEqual(startLifeGame(test2),false);
	});
});

describe('refreshLife',function(){
	it('should be a function', function(){
		assert.isFunction(refreshLife);
	});
	it('should have no arguments', function(){
		assert.equal(refreshLife.length, 0);
	});
});