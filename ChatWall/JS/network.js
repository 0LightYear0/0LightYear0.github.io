var socketUrl = "https://wall.cgcgbcbc.com";
var socket = io.connect(socketUrl);
socket.on('new message', function(info){
	infoContact(info);
});
socket.on('admin', function(info){
	info.isAdmin = true;
	infoContact(info);
});
var getOldMessage = function (){
	var obj = new Array();
	var xhr = new XMLHttpRequest();
	var oldmessage;
    xhr.onreadystatechange = function(event){
        if(xhr.readyState == 4)
        {
            if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304)
            {
                //alert(xhr.responseText);
                oldmessage = eval(xhr.responseText);
				
                for(var i = 0;i < 4;i++)
                {
					//alert(oldmessage[i].content);
                    //console.log(111, oldmessage[i]);
					obj[i] = {nickname: oldmessage[i].nickname, content: oldmessage[i].content, headimgurl: oldmessage[i].headimgurl};
                    infoContact(obj[i]);
                }
            }
        }
    };
    xhr.open("GET","https://wall.cgcgbcbc.com/api/messages?num=4",true);
    xhr.send(null);
};
getOldMessage();


