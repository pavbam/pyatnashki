<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>игра "пятнашки"</title>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <link href="<?=base_url();?>assets/myCSS/mycss.css" rel="stylesheet" type="text/css" media="screen, projection"/>
        <script src="<?=base_url();?>assets/myScripts/myScript.js"></script>
                
    </head>
    <body onload="newGame(start_arr)">
    	
        	<script>
            var rating = {};
            
			
			
			</script>

        <div id="conteiner">
            <h1>Игра "Пятнашки"</h1>
            	        
		    <div class="gm">
		        <div id="game_place">

		        </div>
	        	<div id="flap" style="display: none">
		        	<div id="div_form" style="display: none">
			        	<div id="massege">
				        	<div id="div_message">
				        	</div>
				        	<div id="div_in_name">
					        	Ваше имя <input id="inp_inp_name" onkeydown="keyDown(event)" autofocus="">
					        	<div id="div_buttons">
						        	<input id="inp_not" type="button" value="отказаться" onclick="document.getElementById('div_form').style.display ='none'">
						        	<input id="inp_ok" type="button" value="отправить" onclick="myAjax(minutes, seconds, undefined)">
					        	</div>
					        	
				        	</div>
			        	</div>
		        	</div>
	        	</div>
		        <div class="inp">
				</div>

				<div class="rating">
		    		<div id="time" onclick="newGame(start_arr)">
		    			<strong>Новая игра</strong>
					</div>
					<div id="title">
						Лучшие результаты:
					</div>
					<div id="res_time">
					</div>
				</div>
			</div>

    </body>
</html>