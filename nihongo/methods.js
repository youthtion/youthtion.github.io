// SWITCH
var accurateLevel = 80;	// always push when less level(%)
var expectedFinalStackNum = 300; // expected stack length when all reach accurateLevel

// VARIABLE
var questNum = 1;
var questStack = new Array();
var cookieKeyhead = "ac";
var versionKeyhead = "verd";
var spaceText = "＿";
var correctionMode = false;
var unshiftRemain = 0;

function initailStack()
{
	questStack = new Array();
	for(let i = 0; i < QAList.length; i++){
		if(QAList[i]["accr"] < accurateLevel){
			questStack.push(i);
		}
		else{
			let randn = Math.floor(Math.random()*100);
			if(randn >= QAList[i]["accr"] && adjStackNumRand()){
				questStack.push(i);
			}
		}
		QAList[i]["accr"] = QAList[i]["accr"]-1;
		if(QAList[i]["accr"] < 0){
			QAList[i]["accr"] = 0;
		}
	}
}

function adjStackNumRand()
{
	let a = expectedFinalStackNum / QAList.length * 100 / (100 - accurateLevel);
	let b = Math.random();
	if(b < a)
		return true;
	return false;
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
	if(QAList[questNum]["accr"] > accurateLevel){
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
					QAList[questNum]["accr"] = Math.floor((QAList[questNum]["accr"] + 100) / 2);
					writeLocalStorage();
				}
				else{
					QAList[questNum]["accr"] = 0;
					writeLocalStorage();
				}
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

function isCorrect()
{
	let input = document.getElementById("inputText").value;
	if(QAList[questNum]["accr"] > accurateLevel){
		if (QAList[questNum]["que"] == input){
			return true;
		}
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
	let stored = localStorage.getItem("accrData");
	if(stored){
		let accrs = JSON.parse(stored);
		for(let i = 0; i < accrs.length; i++){
			if(QAList[i]){
				QAList[i]["accr"] = accrs[i];
			}
		}
	}
}

function writeLocalStorage()
{
	let accrs = QAList.map(q => q["accr"]);
	localStorage.setItem("accrData", JSON.stringify(accrs));
}

function readVersion(lastVer)
{
	let isVerChange = false;
	let accTemp = new Array();
	for(let i = 0; i < QAList.length; i++){
		accTemp.push(QAList[i]["accr"]);
	}

	for(let i = 0; i < version_log.length-1; i++){
		if(version_log[i]["verd"] > lastVer){
			if(isVerChange == false){
				isVerChange = true;
			}
			let newAcc = new Array();
			for(let j = 0; j < QAList.length; j++){
				newAcc.push(-1);
			}
			for(let k in version_log[i]["changed"]){
				newAcc[k] = 0;
			}
			for(let k in version_log[i]["changed"]){
				let v = version_log[i]["changed"][k];
				if(v >= 0){
					newAcc[v] = accTemp[k];
				}
			}
			for(let j = 0; j < QAList.length; j++){
				if(newAcc[j] >= 0){
					accTemp[j] = newAcc[j];
				}
			}
		}
	}
	
	for(let i = 0; i < QAList.length; i++){
		QAList[i]["accr"] = accTemp[i];
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