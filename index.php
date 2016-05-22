
<?php
	require_once './classes/i18n/i18n.class.php';
	$i18n = new i18n('./lang/lang_{LANGUAGE}.ini', './langcache/', 'en');
	$i18n->init();
?>

<!DOCTYPE html>
<html>
<head>
	<title>Trier.hu</title>
	<link rel="stylesheet" type="text/css" href="./bin/site.css" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
</head>
<body class="index">
	<div class="container">
		<div class="billboard">
			<p class="billboard--row billboard--row__brick">The next bus</p>
			<p class="billboard--row billboard--row__pink">goes to Trier*</p>
			<p class="billboard--row billboard--row__green">in</p>
		</div>

		<div class="ribbon">
			<p></p>
			<p>Hurry up! You have to wait <span></span> after it!</p>
		</div>

		<div class="info">
			* From Luxembourg - John F. Kennedy
		</div>
	</div>

	<script type="text/javascript" src="./bin/bundle.js"></script>
</body>
</html>