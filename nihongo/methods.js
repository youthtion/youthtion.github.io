// VARIABLE
var questNum = 1;
var questStack = new Array();
var spaceText = "＿";
var correctionMode = false;
var unshiftRemain = 0;

function initailStack()
{
	questStack = new Array();
	for(let i = 0; i < QAList.length; i++){
		if(QAList[i]["acdt"] == 0 || QAList[i]["acdt"] < nowSec()){
			questStack.push(i);
		}
	}
}

function nowSec()
{
	return Math.floor(Date.now() / 1000);
}

function randomSort()
{
	for(let i = 0; i < questStack.length; i++){
		exchange(i,Math.floor(Math.random()*questStack.length));
	}
}

function groupGather()
{
	for(let i = 0; i < questStack.length; i++){
		if(QAList[questStack[i]]["group"] > 0){
			for(let j = i+1; j < questStack.length; j++){
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
	let temp;
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
	
	let questText = QAList[questNum]["que"];
	if(QAList[questNum]["accr"] > 0){
		let newText = "";
		questText = QAList[questNum]["ans"];
		if(questText.length == 1){
			newText = spaceText;
		}
		else{
			if(QAList[questNum]["lhint"] == 1){
				newText += questText.slice(0, 1);
				for(let i = 0; i < questText.length-1; i++){
					newText += spaceText;
				}
			}
			else{
				for(let i = 0; i < questText.length-1; i++){
					newText += spaceText;
				}
				newText += questText.slice(-1);
			}
		}
		questText = newText;
	}
	document.getElementById("questText").innerHTML = questText;
	document.getElementById("answerText1").innerHTML = QAList[questNum]["tip"];
	document.getElementById("answerText2").innerHTML = QAList[questNum]["ch"];
	correctionMode = false;
}

function handleKey(e)
{
	if(typeof e == "undefined" || (!e))
		e = window.event;		
	if(e.keyCode == 13){
		if (isCorrect()){
			if(unshiftRemain > 0){
				if(correctionMode == false && unshiftRemain > 0){
					QAList[questNum]["acdt"] = nextDate(QAList[questNum]["acdt"], QAList[questNum]["accr"]);
					QAList[questNum]["accr"] += 1;
				}
				else{
					QAList[questNum]["acdt"] = 0;
					QAList[questNum]["accr"] = 0;
				}
				writeLocalStorage();
				unshiftRemain = unshiftRemain - 1;
			}
			getQuestion();
		}
		else{
			document.getElementById("questText").innerHTML = QAList[questNum]["que"];
			document.getElementById("answerText2").innerHTML = QAList[questNum]["ans"];
			correctionMode = true;
			questStack.push(questNum);
			setRemain();
		}
		document.getElementById("inputText").value = "";
	}
}

function nextDate(_last, _accr)
{
	let res = 86400;
	for(let i = 1; i <= _accr; i++){
		if(i == _accr){
			res += nowSec() - _last;
		}
		res *= Math.max(2 - (i * 0.1), 1.2);
	}
	return Math.floor(nowSec() + res);
}

function isCorrect()
{
	let input = document.getElementById("inputText").value;
	if (QAList[questNum]["que"] == input){
		return true;
	}
	let ans = QAList[questNum]["ans"];
	if (kataToHira(ans) == kataToHira(input)){
		return true;
	}
	return false;
}

function kataToHira(str)
{
	return str.replace(/[\u30a1-\u30f6]/g, function(match){
		const char_code = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(char_code);
	});
}

function readCookie()
{
	if(document.cookie){
		let subc = document.cookie.split(';');
		for (let i = 0; i < subc.length; i++){
			let khidx = subc[i].indexOf("verd");
			let vhidx = subc[i].indexOf("=");
			if(khidx != -1){
				let last_ver = Number(subc[i].slice(vhidx + 1));
				readVersion(last_ver);
			}
		}
	}
	writeVersion();
}

function readLocalStorage()
{
	let stored = localStorage.getItem("acData");
	if(stored){
		let datas = JSON.parse(stored);
		for(let i = 0; i < datas.length; i++){
			if(QAList[i]){
				QAList[i]["accr"] = datas[i][0];
				QAList[i]["acdt"] = datas[i][1];
			}
		}
	}
}

function writeLocalStorage()
{
	let datas = QAList.map(q => [
		q["accr"],
		q["acdt"]
	]);
	localStorage.setItem("acData", JSON.stringify(datas));
}

function readVersion(lastVer)
{
	let isVerChange = false;
	let temp = new Array();
	for(let i = 0; i < QAList.length; i++){
		temp.push({
			accr : QAList[i]["accr"],
			acdt : QAList[i]["acdt"],
		});
	}

	for(let i = 0; i < version_log.length-1; i++){
		if(version_log[i]["verd"] > lastVer){
			if(isVerChange == false){
				isVerChange = true;
			}
			let newTemp = new Array();
			for(let j = 0; j < QAList.length; j++){
				newTemp.push({
					accr : -1,
					acdt : 0
				});
			}
			for(let k in version_log[i]["changed"]){
				newTemp[k].accr = 0;
			}
			for(let k in version_log[i]["changed"]){
				let v = version_log[i]["changed"][k];
				if(v >= 0){
					newTemp[v] = temp[k];
				}
			}
			for(let j = 0; j < QAList.length; j++){
				if(newTemp[j].accr >= 0){
					temp[j] = newTemp[j];
				}
			}
		}
	}
	
	for(let i = 0; i < QAList.length; i++){
		QAList[i]["accr"] = temp[i].accr;
		QAList[i]["acdt"] = temp[i].acdt;
	}
	
	if(isVerChange == true){
		writeLocalStorage();
	}
}

function writeVersion()
{
	let now = new Date();
	now.setTime(now.getTime() + 1000 * 60 * 60 * 24 * 365);
	document.cookie = "verd=" + listVer.toString() + ";expires=" + now.toGMTString();
}

function adjustPos(obj)
{
	obj.style.left = window.innerWidth / 2 - obj.clientWidth / 2;
}

function changeBody()
{
	let windowHei = window.innerHeight;
	document.getElementById("remainText").style.fontSize = "" + windowHei * 0.024 + "px";
	document.getElementById("remainText").style.letterSpacing = "" + windowHei * 0.008 + "px";
	document.getElementById("questText").style.fontSize = "" + windowHei * 0.032 + "px";
	document.getElementById("questText").style.letterSpacing = "" +windowHei * 0.008 + "px";
	document.getElementById("answerText1").style.fontSize = "" +windowHei * 0.032 + "px";
	document.getElementById("answerText1").style.letterSpacing = "" +windowHei * 0.008 + "px";
	document.getElementById("answerText2").style.fontSize = "" +windowHei * 0.032 + "px";
	document.getElementById("answerText2").style.letterSpacing = "" +windowHei * 0.008 + "px";
	document.getElementById("inputText").style.fontSize = "" +windowHei * 0.032 + "px";
	document.getElementById("inputText").style.letterSpacing = "" +windowHei * 0.008 + "px";
	adjustPos(document.getElementById("remainText"));
	adjustPos(document.getElementById("questText"));
	adjustPos(document.getElementById("answerText1"));
	adjustPos(document.getElementById("answerText2"));
}