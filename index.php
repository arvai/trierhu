<?php
	require_once './classes/i18n/i18n.class.php';
	$i18n = new i18n('./lang/lang_{LANGUAGE}.json', './langcache/', 'en');
	$i18n->setForcedLang('en');
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
			<p class="billboard--row billboard--row__brick"><?= L::the_next_bus ?></p>
			<p class="billboard--row billboard--row__pink"><?= L::goes_to_trier ?>*</p>
			<p class="billboard--row billboard--row__green"><?= L::billboard_in ?></p>
		</div>

		<div class="ribbon">
			<p></p>
			<p><?= sprintf(L::hurry_up_you_have_to_wait_after_it, '<span></span>') ?></p>
		</div>

		<div class="info">
			* <?= L::from_luxembourg_johnfkennedy ?>
		</div>
	</div>

	<script type="text/javascript" src="./bin/bundle.js"></script>
</body>
</html>