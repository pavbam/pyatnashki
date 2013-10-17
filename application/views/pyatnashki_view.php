<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>игра "пятнашки"</title>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="<?=base_url();?>assets/JqweryScripts/jquery.min.v1.4.2.js" type="text/javascript"></script>
		<script src="<?=base_url();?>assets/JqweryScripts/jquery.animateColorText.js" type="text/javascript"></script>
		<script src="<?=base_url();?>assets/JqweryScripts/jquery.animate-colors-min.js" type="text/javascript"></script>
		
        <link href="<?=base_url();?>assets/myCSS/mycss.css" rel="stylesheet" type="text/css" media="screen, projection"/>
        <script src="<?=base_url();?>assets/myScripts/myScript.js"></script>              
    </head>
    <body onload="newGame(start_arr)">
        <div id="conteiner">
            <h1>Игра "Пятнашки"</h1>
            
		    <div class="gm">
		    	<div id="head_intime">
				    <div id="head">
				    	<div id="intime">
			            	<div id="time" title="нажать для начала новой игры" onclick="newGame(start_arr)">
					    		<strong>новая игра</strong>
					    	</div>
						</div>
						<img class="img" src="<?=base_url();?>assets/img/bort.png">
					</div>
					<div id="timer">
						00:00
					</div>
		    	</div>
		    	<img class="img3" src="<?=base_url();?>assets/img/bort3.png">
		        <div id="game_place">
					<!-- пятнашки -->
		        </div>
	        	<div id="flap" style="display: none">
		        	<div id="div_form" style="display: none">
			        	<div id="massege">
				        	<div id="div_message">
				        	</div>
				        	<div id="div_in_name">
					        	Ваше имя <input id="inp_inp_name" onkeydown="keyDown(event)" autofocus="">
					        	<div id="div_buttons">
						        	<input id="inp_not" type="button" value="отказаться" onclick="inp_not()">
						        	<input id="inp_ok" type="button" value="отправить" onclick="myAjax(minutes, seconds, undefined)">
						        	
					        	</div>
					        	
				        	</div>
			        	</div>
		        	</div>
	        	</div>	        	
	        	<div id="radio">
					<img class="img2" src="<?=base_url();?>assets/img/bort2.png">
					<img class="radio" title="радио" src="<?=base_url();?>assets/img/radio.png" onclick="rating_move('radio')">
	        	</div>		       
				<div class="rating" id="rating">
		    		<div id="inrating">
						<div id="title">
							Лучшие результаты:
						</div>
						<div id="res_time">
						</div>
					</div>
					<img class="img1" title="результаты" src="<?=base_url();?>assets/img/bort1.png">
					
					<img class="open_png" name="open_png" title="результаты" src="<?=base_url();?>assets/img/open.png" onclick="rating_move('rating')">
				</div>	
			</div>
    </body>
</html>