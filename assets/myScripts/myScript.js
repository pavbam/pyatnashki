/* массив диапазона чисел */
var start_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
/* массив - таблица */
var back_arr = [ [], [], [], [] ];
/* проверочная строка */
var test_str = "cell_1,cell_2,cell_3,cell_4,cell_5,cell_6,cell_7,cell_8,cell_9,cell_10,cell_11,cell_12,cell_13,cell_14,cell_15,cell_not";

var ms_start = undefined;
var sec = "", min = "";
/* выводимая строка при правильном расскладе фишек */
var win_text = "ПОЗДРАВЛЯЕМ<br />Вы справились за ";
var base_url = 'http://localhost:8888/pyatnashki/';
var names;
/* ФУНКЦИЯ получегия случайного целого числа из диапазона */
function random(min, max) {
    var range = max - min + 1;
    return Math.floor(Math.random()*range) + min;
}			

/* ФУНКЦИЯ перемешивания массива */
function shuffle(arr) {
    var r_i; // случайный индекс
    var v; // временная переÏменная
    for (var i = 0; i < arr.length-1; i++) {
        /* получаем случайный индекс (кроме последнего) */
        r_i = random(0, arr.length-1);
        /* меняем местами случайный элемент массива с последним */
        v = arr[r_i];
        arr[r_i] = arr[arr.length-1];
        arr[arr.length-1] = v;
    }
    return arr;
}

function reloadPage(){
window.location.reload()
}

/* ФУНКЦИЯ удаления всех доченних эллементов */
function removeChildren(node) {
    while(node.childNodes[0]){
		node.removeChild(node.childNodes[0]);
	}
}

/* ФУНКЦИЯ создания нового поля игры */
function newGame(arr) {
	document.getElementById("flap").style.display ="none";
	names = 'false';
	myAjax(minutes, seconds, false);
	
	stop();
	seconds = 0, minutes = 0, hours = 0;
	back_arr = [ [], [], [], [] ]; // очищаем массив - таблицу
	ms_start = undefined;
	
//	start_arr = shuffle(arr); // перемешиваем массив ячеек
	var game_place = document.getElementById("game_place");
	removeChildren(game_place);	// удаляем все дочерние эллементы
	
	
	/* вписываем эллементы (фишки) в страницу */
	/* фишки с номерами от 1 до 15 */
	for (var c = 0; c < 15; c++) {
		var div = document.createElement('div');
		div.className = 'cell';
		div.id = "cell_" + start_arr[c];
		div.innerHTML = start_arr[c];
		div.setAttribute("onclick", "moveCell(id, className)");
		game_place.appendChild(div);
	}
	
	/* фишка отвечающая за пустую ячейку */
	var div_false = document.createElement('div');
	div_false.className = 'cell';
	div_false.onclick = "moveCell(id, className)";
	div_false.id = "cell_not";
	div_false.setAttribute("onclick", "moveCell(id, className)");
	game_place.appendChild(div_false);
	
	/* запоминаем позиции в массиве - таблице */
	copuInBackArr (back_arr);
}

/* ФУНКЦИЯ копирования id эллементов в массив - таблицу */
function copuInBackArr (arr) {
	var game_place = document.getElementById("game_place");
	var cild = game_place.childNodes;
	var i = 0;
	for (var y = 0; y < 4; y++) {
		for (var x = 0; x < 4; x++) {
			cild[i].className = cild[i].className + " " + y + " " + x;
			arr[y].push(cild[i].id);
			i++;
		}
	}	
}

/* ФУНКЦИЯ обработки нажатия на фишку */
function moveCell(id_first, name){
	
	/* координаты нажатой фишки */
	var y = name[5], x = name[7];
	/* массивы с координатами перемешений для проверки соседних фишек */
	var y_arr = [y, +y+1, y, +y-1], x_new = [+x+1, x, +x-1, x];
	/* обходим вокруг фишки */
	for (var i = 0; i < 4; i++) {
		/* обход ошибки с обработки ниженего ряда */
		if (y_arr[i] > 3) {
			i++;
		}
		/* получаем id соседней фишки */
		var id = back_arr[ y_arr[i] ][ x_new[i] ];
		/* если фишка пустая то меняем местами */
		if (id === "cell_not") {
			
			/* запускасем таймер */
			if (ms_start == undefined) {
				ms_start = true;
				start();
			}
			
			/* получаем атрибуты */
			var div_first_position = document.getElementById(id_first);
			var div_new_position = document.getElementById(id);
			var id1 = div_first_position.id, name_class1 = div_first_position.className, val1 = div_first_position.innerHTML;
			var id2 = div_new_position.id, name_class2 = div_new_position.className, val2 = div_new_position.innerHTML;
			/* меняем местами */
			div_first_position.id = id2;
			div_first_position.className = name_class1;
			div_first_position.innerHTML = val2;
			back_arr[y][x] = id2; //фиксируем изменения в массиве - таблице
			
			div_new_position.id = id1;
			div_new_position.className = name_class2;
			div_new_position.innerHTML = val1;
			back_arr[ y_arr[i] ][ x_new[i] ] = id1; //фиксируем изменения в массиве - таблице
			
			/* проверка на окончание игры */
			var str = back_arr.join(); // массив - таблицу переводим в строку
			/* сравниваем с тестовой строкой */
			if (str === test_str) {
				
				stop();
			
				/* если не управился в 60 сек. добавляем значение: минуты */
				if (minutes > 0) {				
					win_text = win_text + minutes + " мин. " + seconds + " сек.\nвведите ваше имя для сохранения результата!";
				} else win_text = win_text + seconds + "сек.";
				setTimeout('document.getElementById("time").innerHTML = "<strong>Новая игра</strong>"', 150);
				/* выводим поздравления и колличество затраченного времени с небольшой задержкой */
				setTimeout('aj(minutes, seconds)', 150);
				/* закрываем поле для предотвращения случайных нажатий */
				div_flap = document.getElementById("flap");
				
				setTimeout('div_flap.style.display ="block"', 140);
				setTimeout('document.getElementById("div_form").style.display ="block"', 160);
			}
			return 0;
		} 
	}
}

function aj(minutes, seconds) {

	document.getElementById("div_message").innerHTML = win_text;
	document.getElementById('inp_inp_name').focus();
	win_text = "ПОЗДРАВЛЯЕМ<br />Вы справились за ";

}

function myAjax(minutes, seconds, inp) {
	
	var names = false;
	if (inp == undefined) {
		var temp = document.getElementById("inp_inp_name").value;
		if (temp == "") {
			alert("Забыли ввести имя!");
			return;
		} else names = temp;
		
	}
//	else names = false;
	
	
	$.ajax({
			type: "post",
			url: base_url + "index.php/ajax/upd_bd",
			cache: false,				
			data: {
				name: names,
				min: minutes,
				sec: seconds
			},
			success: function(json) {						
				try{		
					var obj = jQuery.parseJSON(json);
					show_rating(obj);
				}catch(e) {		
					alert('Exception while request..');
				}		
			},
			error: function() {						
				alert('Error while request..');
			}
	});
	
	document.getElementById("div_form").style.display ="none";
	
	seconds = 0;
	minutes = 0;
}

/* открытие и закрытие панелей */
var rating = false;
var radio_i = false;
function rating_move(id) {
	var rat = document.getElementById(id);
	if (id == "rating") {
		if (rating == false) {
			rat.style.right = "83px";
			setTimeout('document.open_png.src = "http://localhost:8888/pyatnashki/assets/img/close.png"', 400);
			rating = true;
		} else {
			rat.style.right = "274px";
			setTimeout('document.open_png.src = "http://localhost:8888/pyatnashki/assets/img/open.png"', 400);
			rating = false;
		}
	} else {
		if (radio_i == false) {
			rat.style.top = "426px";
			radio_i = true;
		} else {
			rat.style.top = "262px";
			radio_i = false;
		}
	}
}

function show_rating(obj) {

	var result = document.getElementById('res_time');
	removeChildren(result);
	
	for (var i = 0; i < obj.length; i++) {
		var div = document.createElement('div');
		
		var colon = document.createElement('div');
		colon.setAttribute('class', 'colon');
		var login = document.createElement('div');
		login.setAttribute('class', 'login');
		var res_time = document.createElement('div');
		res_time.setAttribute('class', 'res_time');
		
		colon.innerHTML = ":";
		login.innerHTML = obj[i].name;
		res_time.innerHTML = obj[i].time;
		
		div.appendChild(login);
		div.appendChild(colon);
		div.appendChild(res_time);		
		div.setAttribute('class', 'name_and_time');
		div.setAttribute('id', 'id_' + i);
		
		result.appendChild(div);
	}
	
}

function newSet() {
	stop();
	seconds = 0, minutes = 0, hours = 0;
	back_arr = [ [], [], [], [] ]; // очищаем массив - таблицу
	ms_start = undefined;
//	win_text = "ПОЗДРАВЛЯЕМ\nВы справились за ";
//	start_arr = shuffle(arr); // перемешиваем массив ячеек
	var game_place = document.getElementById("game_place");
	removeChildren(game_place);	// удаляем все дочерние эллементы
}

function keyDown(event) {
   var key = event.keyCode;
   if (key==13) {
   		myAjax(minutes, seconds, undefined);
   }
   if (key==27) {
   		document.getElementById('div_form').style.display ='none';
   		event.preventDefault();//запрет на дальнейшее распространение
   		return false;//возвращаем false
   }
}



var seconds = 0;
var minutes = 0;

var stops = 1;

function startTime() {
	if (stops == 0) {
		return 0;
	}
	seconds++;
	if (seconds < 10) seconds = "0" + seconds;
	if (seconds > 59) {
	    seconds = 0;
	    minutes += 1;
	}
	minutes = +minutes;
	if (minutes < 10) minutes = "0" + minutes;

	document.getElementById("time").innerHTML = minutes + ":" + seconds;
	
	setTimeout("startTime()", 1000);
}

function stop() {
	stops = 0;
}
function start() {
	stops = 1;
	startTime();
}