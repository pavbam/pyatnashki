<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>ыав</title>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script>
			var arr = [];
		</script>
	</head>
	<body>
		<!--
<?php foreach($rating as $item):?>
						<?php foreach($item as $i):?>
								<script>
									var name = <?=$i['name'];?>;
									var 
								</script><?=$i;?>					
						<?php endforeach;?>				
		<?php endforeach;?>
-->
		<?php 
		
		print_r($ra);
		print_r("<br /><br />");
	//	print_r(json_encode($ra));
		print_r("<br /><br />");
		?>
		
		<script>
			function myAjax() {
				$.ajax({
						type: "post",
						url: "<?=base_url();?>index.php/games/wwww",
						cache: false,				
						data: {
							name: "sdf",
							min: "sdfsf",
							sec: "zxczc"
						},
						success: function(json) {						
							try{		
								var obj = jQuery.parseJSON(json);
								document.write(obj);
								document.write("<br /><br />");
								var DDD = obj[1].name;
								document.write(DDD);
							}catch(e) {		
								alert('Exception while request..');
							}		
						},
						error: function() {						
							alert('Error while request..');
						}
				});
			}
		</script>
		<input type="button" onclick="myAjax()">
		
	</body>
</html>