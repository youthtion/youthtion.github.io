var i;
var questNum = 1;
var questStack = new Array();
var unshiftRemain = 0;
var accurateLevel = 75;	// always pushed when less level(%)
var cookieKeyhead = "ac";
var accMode = 0;	//1:Kanji 0:Last
var versionKeyhead = "verd";
var params = QAList[QAList.length-1];

function initailStack()
{
	questStack = new Array();
	for(var i = 0; i < QAList.length-1; i++){
		if(QAList[i]["accr"] < accurateLevel){
			questStack.push(i);
		}
		else{
			var randn = Math.floor(Math.random()*100);
			if(randn >= QAList[i]["accr"]){
				questStack.push(i);
			}
		}
		QAList[i]["accr"] = QAList[i]["accr"]-1;
		if(QAList[i]["accr"] < 0){
			QAList[i]["accr"] = 0;
		}
	}
}

function randomSort()
{
	for(var i = 0; i < questStack.length; i++)
		exchange(i,Math.floor(Math.random()*questStack.length));
}

function groupGather()
{
	for(var i = 0; i < questStack.length; i++){
		if(QAList[questStack[i]]["group"] > 0){
			for(var j = i+1; j < questStack.length; j++){
				if(QAList[questStack[i]]["group"] == QAList[questStack[j]]["group"]){
					if(i+1 != j)
						exchange(i+1,j);
					break;
				}
			}
		}
	}
}

function exchange(pos1,pos2)
{
	var temp;
	temp = questStack[pos1];
	questStack[pos1] = questStack[pos2];
	questStack[pos2] = temp;
}

function setRemain()
{
	document.getElementById("remainText").innerHTML = questStack.length;
	adjustPos(document.getElementById("remainText"));
}

function getQuestion()
{
	if(questStack.length == 0)
	{
		initailStack();
		if(questStack.length == 0){
			getQuestion();
			return;
		}
		randomSort();
		groupGather();
		unshiftRemain = questStack.length;
	}
	
	setRemain();
	
	questNum = questStack.shift();
	var questText = QAList[questNum]["que"];
	if(QAList[questNum]["accr"] > accurateLevel){
		if(questText.indexOf(params["space"]) == -1){
			var newText = "";
			if(accMode){
				for(var i = 0; i < questText.length; i++){
					var subStrTemp = questText.substr(i, 1);
					if(isKanji(subStrTemp)){
						newText += subStrTemp;
					}
					else{
						newText += params["space"];
					}
				}
			}
			else{
				questText = QAList[questNum]["ans"];
				for(var i = 0; i < questText.length-1; i++){
					newText += params["space"];
				}
				newText += questText.slice(-1);
			}
			questText = newText;
		}
	}
	document.getElementById("questText").innerHTML = questText;
	document.getElementById("answerText").innerHTML = QAList[questNum]["tip"];
}

function isKanji(strParam){
    var unicode = strParam.charCodeAt(0);
    if ((unicode>=0x4e00  && unicode<=0x9fcf) ||	// CJK統合漢字
        (unicode>=0x3400  && unicode<=0x4dbf) ||	// CJK統合漢字拡張A
        (unicode>=0x20000 && unicode<=0x2a6df) ||	// CJK統合漢字拡張B
        (unicode>=0xf900  && unicode<=0xfadf) ||	// CJK互換漢字
        (unicode>=0x2f800 && unicode<=0x2fa1f))		// CJK互換漢字補助
		return true;
    return false;
}

function handleKey(e)
{
	if(typeof e == "undefined" || (!e))
		e = window.event;
		
	if(e.keyCode == 13){
		if (isCorrect()){
			if(unshiftRemain > 0){
				QAList[questNum]["accr"] = Math.floor((QAList[questNum]["accr"]+100)/2);
				writeCookie();
			}
			getQuestion();
		}
		else{
			QAList[questNum]["accr"] = 0;
			writeCookie();
			document.getElementById("questText").innerHTML = QAList[questNum]["que"];
			document.getElementById("answerText").innerHTML = QAList[questNum]["ans"];
			questStack.push(questNum);
			setRemain();
		}
		document.getElementById("inputText").value = "";
		unshiftRemain = unshiftRemain-1;
	}
}

function isCorrect()
{
	if(QAList[questNum]["accr"] > accurateLevel){
		if (QAList[questNum]["que"] == document.getElementById("inputText").value){
			return true;
		}
	}
	if (QAList[questNum]["ans"] == document.getElementById("inputText").value){
		return true;
	}
	return false;
}

function readCookie()
{
	if(document.cookie){
		var accStack = new Array();
		var subc = document.cookie.split(';');
		for (var i = 0; i < subc.length; i++){
			var khidx = subc[i].indexOf(cookieKeyhead);
			var vhidx = subc[i].indexOf("=");
			if(khidx != -1){
				var acchidx = Number(subc[i].substr(khidx+2,1));
				var accvs = subc[i].substr(vhidx+1);
				if(accvs.length%2 == 0){
					for(var j = 0; j < accvs.length / 2; j++){
						var accv = Number(subc[i].substr(vhidx+1+j*2,2));
						QAList[j*10+acchidx]["accr"] = accv;
					}
				}
			}
			else if(subc[i].indexOf(versionKeyhead) != -1){
				var last_ver = Number(subc[i].slice(vhidx+1));
				readVersion(last_ver);
			}
		}
	}
	writeVersion();
}

function writeCookie()
{
	var temp = "";
	for(var i = 0; i < QAList.length-1; i++){
		if(i%10 == questNum%10){
			if(QAList[i]["accr"] < 10){
				temp += "0";
			}
			temp += QAList[i]["accr"];
		}
	}
	var now = new Date();
	now.setTime(now.getTime()+1000*60*60*24*365);
	document.cookie = cookieKeyhead+(questNum%10)+"="+temp+";expires="+now.toGMTString();
}

function readVersion(lastVer)
{
	var accTemp = new Array();
	for(var i = 0; i < QAList.length-1; i++){
		if(QAList[i]["accr"] != 0){
			accTemp.push(QAList[i]["accr"]);
		}
		else{
			accTemp.push(0);
		}
	}

	for(var i = 0; i < version_log.length-1; i++){
		if(version_log[i]["verd"] > lastVer){
			var newAcc = new Array();
			for(var j = 0; j < QAList.length-1; j++){
				newAcc.push(-1);
			}
			for(var k in version_log[i]["changed"]){
				newAcc[k] = 0;
			}
			for(var k in version_log[i]["changed"]){
				var v = version_log[i]["changed"][k];
				if(v >= 0){
					newAcc[v] = accTemp[k];
				}
			}
			for(var j = 0; j < QAList.length-1; j++){
				if(newAcc[j] >= 0){
					accTemp[j] = newAcc[j];
				}
			}
		}
	}
	
	for(var i = 0; i < QAList.length-1; i++){
		QAList[i]["accr"] = accTemp[i];
	}
}

function writeVersion()
{
	var now = new Date();
	now.setTime(now.getTime()+1000*60*60*24*365);
	document.cookie = versionKeyhead+"="+params["verd"].toString()+";expires="+now.toGMTString();
}

function adjustPos(obj)
{
	obj.style.left = window.innerWidth/2 - obj.clientWidth/2;
}

function changeBody()
{
	var windowHei = window.innerHeight;
	
	document.getElementById("remainText").style.fontSize = ""+windowHei*0.036+"px";
	document.getElementById("remainText").style.letterSpacing = ""+windowHei*0.008+"px";
	document.getElementById("questText").style.fontSize = ""+windowHei*0.048+"px";
	document.getElementById("questText").style.letterSpacing = ""+windowHei*0.008+"px";
	document.getElementById("answerText").style.fontSize = ""+windowHei*0.048+"px";
	document.getElementById("answerText").style.letterSpacing = ""+windowHei*0.008+"px";
	document.getElementById("inputText").style.fontSize = ""+windowHei*0.048+"px";
	document.getElementById("inputText").style.letterSpacing = ""+windowHei*0.008+"px";

	adjustPos(document.getElementById("remainText"));
	adjustPos(document.getElementById("questText"));
	adjustPos(document.getElementById("answerText"));
}