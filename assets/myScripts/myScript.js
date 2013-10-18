/* массив диапазона чисел */
var start_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/* массив - таблица */
var back_arr = [ [], [], [], [] ];

/* проверочная строка */
var test_str = "cell_1,cell_2,cell_3,cell_4,cell_5,cell_6,cell_7,cell_8,cell_9,cell_10,cell_11,cell_12,cell_13,cell_14,cell_15,cell_not";

/* выводимая строка при правильном расскладе фишек */
var win_text = "ПОЗДРАВЛЯЕМ<br />Вы справились за ";
var base_url = 'http://localhost:8888/pyatnashki/';
var names;
var seconds = 0;
var minutes = 0;
var stops = 1;
var rating = 0;



/*! получегия случайного целого числа из диапазона */
function random(min, max) {
    var range = max - min + 1;
    return Math.floor(Math.random()*range) + min;
}			

/*! перемешивания массива */
function shuffle(arr) {
    var r_i; // случайный индекс
    var v; // временная переменная
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

/*! удаления всех доченних эллементов */
function removeChildren(node) {
    while(node.childNodes[0]){
		node.removeChild(node.childNodes[0]);
	}
}

/*! создания нового поля игры */
function newGame(arr) {
	$("#head_intime").animate({marginBottom:"0px"},500);
	stop();
	document.getElementById("timer").innerHTML = "00:00";
	
	names = 'false';
	myStartAjax();
	
	stop();
	seconds = 0, minutes = 0, hours = 0;
	back_arr = [ [], [], [], [] ]; // очищаем массив - таблицу

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
	game_place.appendChild(div_false);
	
	/* запоминаем позиции в массиве - таблице */
	copuInBackArr (back_arr);
}

/*! копирования id эллементов в массив - таблицу */
function copuInBackArr (arr) {
	var game_place = document.getElementById("game_place");
	var cild = game_place.childNodes;
	var i = 0;
	for (var y = 0; y < 4; y++) {
		for (var x = 0; x < 4; x++) {
			if (cild[i] == "cell_not") { 
				arr[y].push("cell_not");
			} else {
				cild[i].className = cild[i].className + " y" + y + " x" + x;
				arr[y].push(cild[i].id);
			} 
			i++;
		}
	}	
}



/*! обработки нажатия на фишку */
function moveCell(id_first, name){

	function replacement() {
		back_arr[ y_arr[i] ][ x_new[i] ] = id_first;
		back_arr[ y ][ x ] = "cell_not";
		inspection();
	}
	function inspection() {
		var str = back_arr.join(); // массив - таблицу переводим в строку
		/* сравниваем с тестовой строкой */
		if (str === test_str) {
			$("#head_intime").animate({marginBottom:"0px"},500);
			stop();
		
			/* если не управился в 60 сек. добавляем значение: минуты */
			if (minutes > 0) {				
				win_text = win_text + minutes + " мин. " + seconds + " сек.\nвведите ваше имя для сохранения результата!";
			} else win_text = win_text + seconds + "сек.";
			/* выводим поздравления и колличество затраченного времени с небольшой задержкой */
			aj(minutes, seconds);
		}
	}
	
	/* координаты нажатой фишки */
	var y = name[6], x = name[9];
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
			$("#head_intime").animate({marginBottom:"28px"}, 500);
			start();
			
			if (i == 0) {
				$("#" + id_first).animate({"left": "+=100px"}, 250).attr("class", "cell y" + y_arr[i] + " x" + x_new[i]);
				$("#cell_not").animate({"left": "-=100px"}, 10).attr("class", "cell y" + y + " x" + x);
				replacement();
			}
			if (i == 1) {
				$("#" + id_first).animate({"top": "+=100px"}, 250).attr("class", "cell y" + y_arr[i] + " x" + x_new[i]);
				$("#cell_not").animate({"top": "-=100px"}, 10).attr("class", "cell y" + y + " x" + x);
				replacement();
			}
			if (i == 2) {
				$("#" + id_first).animate({"left": "-=100px"}, 250).attr("class", "cell y" + y_arr[i] + " x" + x_new[i]);
				$("#cell_not").animate({"left": "+=100px"}, 10).attr("class", "cell y" + y + " x" + x);
				replacement();
			}
			if (i == 3) {
				$("#" + id_first).animate({"top": "-=100px"}, 250).attr("class", "cell y" + y_arr[i] + " x" + x_new[i]);
				$("#cell_not").animate({"top": "+=100px"}, 10).attr("class", "cell y" + y + " x" + x);
				replacement();
			}
			return 0;
		} 
	}
}

/* ! отлов нажатия ESC, ENTER */
function keyDown(event) {
   var key = event.keyCode;
   if (key==13) {
   		myAjax(minutes, seconds, undefined);
   }
   if (key==27) {
   		onceAgain();
   		event.preventDefault();//запрет на дальнейшее распространение
   		return false;//возвращаем false
   }
}

/* ! закрытие диалоговой формы и запуск новой игры */
function onceAgain() {
	 
	$("#div_form").fadeOut( 1000 );
	$("#flap").fadeOut(2000);
	newGame(start_arr);
}

/* ! открытия диалоговой формы */
function aj(minutes, seconds) {

	document.getElementById("div_message").innerHTML = win_text;
	$("#flap").fadeIn("slow");
	$("#div_form").fadeIn( 2000 );
	
	document.getElementById('inp_inp_name').focus();
	win_text = "ПОЗДРАВЛЯЕМ<br />Вы справились за ";

}

/* ! ajax без отсылки данных */
function myStartAjax() {
	$.ajax({
			type: "post",
			url: base_url + "index.php/ajax/get_db",
			cache: false,				
			success: function(json) {						
				try{		
					var obj = jQuery.parseJSON(json);
					show_rating(obj);
				}catch(e) {		
					alert('Неизвестная ошибка запроса..');
				}		
			},
			error: function() {						
				alert('Ошибка запроса..');
			}
	});
}

/* ! ajax с отсылкой данных */
function myAjax(minutes, seconds) {

	var names = document.getElementById("inp_inp_name").value;
	if (names == "") {
		alert("Забыли ввести имя!");
		return;
	} else onceAgain();

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
					alert('Неизвестная ошибка запроса..');
				}		
			},
			error: function() {						
				alert('Ошибка запроса..');
			}
	});
	
	seconds = 0;
	minutes = 0;
}

/*! открытие и закрытие панелей */
function rating_move(id) {

	if (rating == 0) {			
		$("#rating").animate({marginRight:"-497px"},800,function () {
			document.open_png.src = base_url + "assets/img/close.png";
			rating = 1;
		});						
	} else {		
		$("#rating").animate({marginRight:"-306px"},800,function () {
			document.open_png.src = base_url + "assets/img/open.png";
			rating = 0;
		});
	}
}

/* ! заполнение рейтинга */
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

/* ! запуск таймера */
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

	document.getElementById("timer").innerHTML = minutes + ":" + seconds;
	
	stops = 0;
	setTimeout("startTime()", 1000);
}

function stop() {
	stops = 0;
}
function start() {
	stops = 1;
	startTime();
}
