let elem = document.getElementsByClassName("elem");
let num = document.getElementsByClassName("num");
let randomElemBot = document.getElementById("random");
let autoGame = document.getElementById("auto");
let memoryBot = document.getElementById("memory");
let stopBot = document.getElementById("stop");

let memoryArr = [];

//ДВИЖЕНИЕ ПЯТНАШЕК
for(let i = 0; i < elem.length ; i++){
	elem[i].onclick = function(){
			if( elem[i+1].hasAttribute("data-border") !=true && elem[i+1].hasAttribute("id") ){
				moveInstrument(elem[i],elem[i+1]);
			}else if(elem[i-1].hasAttribute("id")){
				moveInstrument(elem[i],elem[i-1]);
			}else if(typeof elem[i+4] == "undefined" != true && elem[i+4].hasAttribute("id")){
				moveInstrument(elem[i],elem[i+4]);
			}else if(typeof elem[i-4] == "undefined" != true && elem[i-4].hasAttribute("id")){
				moveInstrument(elem[i],elem[i-4]);
			};
			if( win() == 8 ){
				alert("Победа!");
				document.body.innerHTML = "Победа";
			};
	};
};

// Сокращение кода ДВИЖЕНИЕ ПЯТНАШЕК 
function moveInstrument(one,two){
	let name = one.innerHTML;
	let name2 = two.innerHTML;
	two.innerHTML = name;
	one.innerHTML = name2
	one.setAttribute("id","empty");
	two.removeAttribute("id");
};
