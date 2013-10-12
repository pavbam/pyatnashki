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
            
			function myAjax(names, minutes, seconds) {
				
				$.ajax({
						type: "post",
						url: "<?=base_url();?>index.php/ajax/upd_bd",
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
			}
			
			function show_rating(obj) {

				var result = document.getElementById('res_time');
				removeChildren(result);
				
				for (var i = 0; i < obj.length; i++) {
					var div = document.createElement('div');
					var value = obj[i].name + " : " + obj[i].time;
					div.setAttribute('class', 'name_and_time');
					div.setAttribute('id', 'id_' + i);
					div.innerHTML = value;
					result.appendChild(div);
				}
				
			}
			
			</script>

        <div id="conteiner">
            <h1>Игра "Пятнашки"</h1>
            	        
		    <div class="gm">
		        <div id="game_place">
		        </div>
		        <div class="inp">
	        </div>

		    <div class="rating">
		    	<div id="time" onclick="newGame(start_arr)">
		    		<strong>Новая игра</strong>
		    	</div>
				<div id="title">Лучшие результаты:</div>
				<div id="res_time">

				</div>
			</div>
			
        </div>

    </body>
</html>