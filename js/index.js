//Запись начального состояния пятнашек , для возбновления в случае неразрешаемой комбинации 
function memory(){
	if(memoryArr.length < num.length){
		for(let i = 0; i < num.length ; i++){
			memoryArr.push(num[i].innerHTML);
		}
	};
};
//Возвращение пятнашек в начальное состояние 
function activeMemory(){
	for(let i = 0; i < num.length ; i++){
		num[i].innerHTML = memoryArr[i];
	}
}
//Запуск перемешивания пятнашек
randomElemBot.onclick = function(){
		//Записываем начало
		memory();
		//Случайные позиции
		randomPosition();
}
//ФУНКЦИЯ ПЕРЕМЕШИВАНИЯ раставляем числа по порядку путем случайной позиции в колекции класа микс после проставки числа убираем атрибут класс микс и проставляем в случайном порядке дальше
function randomPosition(){
	//Убираем кнопку
	randomElemBot.style.display = "none";
	for(let i = 1; i <= 8 ; i++){
		let mix = document.getElementsByClassName("mix");
		mix[randomNum(0,mix.length-1)].setAttribute("class","elem metka");
		let metka = document.getElementsByClassName("metka");
		metka[0].innerHTML=i;
		metka[0].setAttribute("class","elem num");
	}
	//Проверка на плохую комбинацию
	errorPosition();
};
//Функция проверки плохой комбинации Берем число по порядку через цыкл и пропускаем через второй цыкл всех чисел и ищем количество чисел которые дальше по порядку меньше и записываем в мини каунт далее сумируем мини каунь в каунт Алл и если число алл Каунт не четное то комбинация ошибочная
function errorPosition(){
	let countAll = 0;
	let countMini = 0; 
	for(let i = 0; i < num.length ; i++){
		for(let j = i ; j < num.length ; j++){
			if(num[i].innerHTML > num[j].innerHTML){
				countMini++;
			}
		}
		countAll += countMini;
		countMini = 0;
	};
	if(countAll%2 != 0){
		console.log("Неправильная растановка");
		activeMemory();
		for(let i = 0 ; i < num.length-1 ; i++ ){
			num[i].setAttribute("class","elem num mix");
		}
		randomPosition();
	};
};
//Случайные числа
function randomNum(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//функция Проверка выигрыша 
function win(){
	let k = 0;
	for(let i = 1; i < num.length ; i++){
		if(i == Number(num[i-1].innerHTML)){
			k++;
		};
	};
	return k;
};
//Запуск авто игры
autoGame.onclick = function(){
	start();
};

function start(){
	let interval = setInterval(move,1000);
	let theEnd = false;
	stopBot.onclick = function(){
		clearInterval(interval);
	}
	function move(){
				let row = "";
				//Проверка на победу
				if(document.body.innerHTML == "Победа"){
					clearInterval(interval);
				}
				//Какой порядок чисел выбрать
				if(snake1["Дом"].innerHTML != 9 ){
					row = snake1.goCircleRow( Number(snake1["Дом"].innerHTML));
				}

				if(theEnd != true && snake1["Дом"].innerHTML != 9 &&  snake1.allCorner(9) != true && snake1["Дом"].innerHTML == 1 &&( snake1.getNum(4)+1 == snake1.getNum(9) ||( snake1.getNum(4) == 7 && snake1.getNum(9) == 0) ) ){
					//Если начало с 1 в центре поставить 1 за 4
					snake1["Дом"].click();
				}else if( theEnd != true && snake1["Дом"].innerHTML != 9 && row == 1 && snake1.allCorner(9) != true && snake1.getNum(9)-1 == snake1.getNum(snake1.getFalseCircle() )){
					//Порядок 1 растановка чисел за 1 по свободным нужным  с центра, центр пустой
					snake1["Дом"].click();
				}else if( theEnd != true &&  snake1["Дом"].innerHTML != 9 && row == 2 && snake1.allCorner(9) != true &&( snake1.getNum(9)+1 == snake1.getNum(snake1.getFalse2Circle() ) )){
					//Порядок 2 растановка чисел за 1 по свободным нужным  с центра , центр пустой
					snake1["Дом"].click();
				}else if(snake1.getFalseCenter() == undefined){
					//Проверка конца пятнашек и запус последней карусели
					snake1["Все"][snake1.getNum(5)].click();
					theEnd = true;
				}else if( theEnd != true && snake1["Дом"].innerHTML == 9 && snake1.allCorner(snake1.getFalseCenter()) != true ){
						//Поиск в круге первого нужного числа порядка 1 и чтоб число не было в углу
						snake1["Все"][snake1.getNum(snake1.getFalseCenter())].click();
				}else if(theEnd != true && snake1["Дом"].innerHTML == 9 && snake1.allCorner(snake1.getFalse2Center()) != true){
					//Поиск в круге первого нужного числа порядка 2 и чтоб число не было в углу
					snake1["Все"][snake1.getNum(snake1.getFalse2Center())].click();
				}else if(theEnd != true && snake1["Дом"].innerHTML == 9 &&( snake1.allCorner(snake1.getFalseCenter()) == true && snake1.allCorner(snake1.getFalse2Center()) == true) ){
					//все нужные числа в круге в углу , запуск функции Таке плюс
					console.log(snake1["Все"][snake1.getNum(snake1.takePlus())]);
					snake1["Все"][snake1.getNum(snake1.takePlus())].click();
				}else if(snake1.getNum(9) == 7){
		   			//Ход
		   			snake1["Все"][0].click();
		 		}else{
		 			//Ход
		  			snake1["Все"][snake1.getNum(9)+1].click();
		 		}
};
	class Snake{
	constructor(one,two,three,four,five,six,seven,eight,home){
		this["Все"] = [one,two,three,four,five,six,seven,eight];
		this["Дом"] = home;
		this["Порядок"] = [1,2,3,5,6,8,7,4];
		this["Порядок2"] = [1,4,7,8,6,5,3,2];
	}
	//В случае если нужное число в углу
	takePlus(){
		let one = this.getFalseCenter();
		let countOne = this["Порядок"].indexOf(one);
		let two = this.getFalse2Center();
		let countTwo = this["Порядок2"].indexOf(two);
		if(this.allCorner(this["Порядок"][countOne+1]) != true && (this.getNum(this.getFalseCircle() )+1) != this.getNum(this["Порядок"][countOne+1]) ){
			return this["Порядок"][countOne+1];
			console.log(1);
		}else if(this.allCorner(this["Порядок2"][countTwo+1]) != true && (this.getNum(this.getFalse2Circle() )-1) != this.getNum(this["Порядок2"][countTwo+1])){
			return this["Порядок2"][countTwo+1]
				console.log(2);
		}else if(this.allCorner(this["Порядок"][countOne+2]) != true && (this.getNum(this.getFalseCircle() )+1) != this.getNum(this["Порядок"][countOne+2]) ){
			return this["Порядок"][countOne+2];
			console.log(3);
		}else if(this.allCorner(this["Порядок2"][countTwo+2]) != true && (this.getNum(this.getFalse2Circle() )-1) != this.getNum(this["Порядок2"][countTwo+2])){
			return this["Порядок2"][countTwo+2]
			console.log(4);
		}else if(this.allCorner(this["Порядок"][countOne+3]) != true && (this.getNum(this.getFalseCircle() )+1) != this.getNum(this["Порядок"][countOne+3]) ){
			return this["Порядок"][countOne+3];
			console.log(5);
		}
	}
	//Функция для Порядка 1 число с круга в центр
	getFalseCenter(){
		let arr = this["Порядок"];
		for(let i = 0; i < arr.length ; i++){
			if(this.getNextCircle(arr[i],arr[i+1],9)){
				return arr[i+1];
			}
		}
	}
	//Функция для Порядка 2 число с круга в центр
	getFalse2Center(){
		let arr = this["Порядок2"];
		for(let i = 0; i < arr.length ; i++){
			if(this.getNext2Circle(arr[i],arr[i+1],9)){
				return arr[i+1];
			}
		}
	}
	
	//Функция для Порядка 1 куда вставлять число с центра 
	getFalseCircle(){
		let arr = this["Порядок"];
		for(let i = 0; i < arr.length ; i++){
			if(this.getNextCircle(arr[i],arr[i+1],9)){
				return arr[i];
			}
		}
	}
	//Функция инструмент для getFalseCircle проверка сойдененой пары
	getNextCircle(one,two,empty){
		let elemOne = Number(this.getNum(one));
		let elemTwo = Number(this.getNum(two));
		let elemThree = Number(this.getNum(empty));
		if(elemOne == 7 && elemTwo == 0){
			return false;
		}else if( elemOne+1 == elemThree && elemThree+1 == elemTwo){
			return false;
		}else if( elemOne == 7 && elemTwo == 1 && elemThree == 0){
			return false;
		}else if( elemOne+1 != elemTwo){
			return true;
		}
	}
	//Функция для Порядка 2 куда вставлять число с центра
	getFalse2Circle(){
		let arr = this["Порядок2"];
		for(let i = 0; i < arr.length ; i++){
			if(this.getNext2Circle(arr[i],arr[i+1],9)){
				return arr[i];
			}
		}
	}
	//Функция инструмент для getFalseCircle2 проверка сойдененой пары
	getNext2Circle(one,two,three){
		let elemOne = Number(this.getNum(one));
		let elemTwo = Number(this.getNum(two));
		let elemThree = Number(this.getNum(three));
		if(elemOne == 0 && elemTwo == 7){
			return false;
		}else if( elemOne-1 == elemThree && elemThree-1 == elemTwo){
			return false;
		}else if( elemOne == 1 && elemTwo == 7 && elemThree == 0){
			return false;
		}else if( elemOne-1 != elemTwo){
			return true;
		}
	}
	//Выбрать порядок
	goCircleRow(num){
		let one = this["Порядок"].indexOf(num);
		let two = this["Порядок2"].indexOf(num);
		let needOne = this["Порядок"].indexOf(this.getFalseCircle());
		let needTwo = this["Порядок2"].indexOf(this.getFalse2Circle());
		if(one < two){
			return 1;
		}else if(two < one){
			return 2;
		}else if(one==0 && two == 0){
			return 3;
		}else if(needOne > needTwo){
			return 1;
		}else if(needOne < needTwo){
			return 2;
		}else{
			return 1;
		}
		
	}
	//Нужный елемент в углу или нет
	allCorner(num){
		let elem = Number(this.getNum(num));
		if(elem == 1 || elem == 3 || elem == 5 || elem == 7){
			
			return true;
		}else{
			
			return false;
		}
		
	}
	//Место в пятнашках
	getNum = function(num){
		for(let i = 0; i < this["Все"].length;i++){
			if(num == this["Все"][i].innerHTML){
				return i;
			}
		}
	}
	//Елемент в плюсе
	getPlus(num){
		let elem = this.getNum(num);
		if(elem == 0 || elem == 2 || elem == 4 || elem == 6){
			
			return true;
		}else{
			
			return false;
		}
		
	}
}
let snake1 = new Snake(num[5],num[8],num[7],num[6],num[3],num[0],num[1],num[2],num[4]);
}
