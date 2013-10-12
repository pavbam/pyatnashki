<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>hello</title>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<style type="text/css">
			div {
				background-color: grey;
				width: 200px;
				height: 24px;
				
			}
			
		</style>
		<script>
			function goTo(url) { 
            	window.location = "<?base_url();?>" + url;
            }
		</script>
			</head>
	<body>
            <h1>Hello!</h1>
            <div>
            	<input id="int" type="button" value="пятнашки" onclick="goTo('index.php/games/pyatnashki')">
            </div>
	</body>
</html>