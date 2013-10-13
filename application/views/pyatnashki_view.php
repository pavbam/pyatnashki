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
            var rating = false;
            
			function rating_move() {
				var rat = document.getElementById("rating");
				if (rating == false) {
					rat.style.right = "83px";
					
					rating = true;
				} else {
					rat.style.right = "274px";
					rating = false;
				}
				
			}
			
			</script>

        <div id="conteiner">
            <h1>Игра "Пятнашки"</h1>
            
		    <div class="gm">
		    	<img class="img3" src="<?=base_url();?>assets/img/bort3.png">
			    <div id="head">
			    	<div id="intime">
		            	<div id="time" onclick="newGame(start_arr)">
				    		<strong>Новая игра</strong>
				    	</div>
					</div>
					<img class="img" src="<?=base_url();?>assets/img/bort.png">
				</div>
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
		       
				<div class="rating" id="rating">
		    		<div id="inrating">
						<div id="title">
							Лучшие результаты:
						</div>
						<div id="res_time">
						</div>
					</div>
					<img class="img1" src="<?=base_url();?>assets/img/bort1.png" onclick="rating_move()">
				</div>
				
				<img class="img2" src="<?=base_url();?>assets/img/bort2.png" onclick="rating_move()">
				
				
			</div>

    </body>
</html>