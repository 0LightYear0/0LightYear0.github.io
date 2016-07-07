var infoCtrl = new Vue({
  el: '.page',
  data: {
    messages: [],
	adminInfo: []
  },
  methods: {
    newInfo: function(info){
			infoCtrl.messages.push(info);
			if(infoCtrl.messages.length > 4){
					infoCtrl.messages.shift();
			}
		}
  }
});

var temp = new Array();
var adminTimer = null;
function infoContact(info){
	if(info.isAdmin){
		info.headimgurl = "image/admin.jpg";
	}
	if(typeof info.handimgurl != "undefined" && typeof info.headimgurl == 'undefined'){
		info.headimgurl = info.handimgurl;
	}
	if(info.isAdmin == true){
		if(adminTimer != null){
			clearTimeout(adminTimer);
		}
		adminTimer = setTimeout(function(){
			while(infoCtrl.adminInfo.pop());
			adminTimer = null;
		}, 10000);
		while(infoCtrl.adminInfo.pop());
		setTimeout(function(){
			infoCtrl.adminInfo.push(info);
		}, 400);

	}
	else{
		temp.push(info);
	}
}
//设置动画(通过Vue)
Vue.transition('item', {
	beforeLeave: function(el){
		$('#messagebox').addClass('move');
  },
	afterLeave: function(el){
		$('#messagebox').removeClass('move');
  },
});
//头像加载
function imageLoad(item){
	$(item).removeClass('loading');
}
//设置定时器
var timer = setInterval(function(){
	if(temp.length > 0){
		infoCtrl.newInfo(temp.shift());
	}
}, 400);
