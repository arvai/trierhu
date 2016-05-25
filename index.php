<?php
	require_once './classes/i18n/i18n.class.php';
	$i18n = new i18n('./lang/lang_{LANGUAGE}.json', './langcache/', 'en');

	// Set language cookie when language change triggered
	if( isset($_GET['lang']) ) {
		setcookie('lang', $_GET['lang']);
	}

	// Set language based on cookie existance
	if ( isset($_GET['lang']) ) {
		$language = $_GET['lang'];
	}
	elseif ( isset($_COOKIE['lang']) ) {
		$language = $_COOKIE['lang'];
	}
	else {
		$language = 'en';
	}

	$i18n->setForcedLang($language);
	$i18n->init();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Trier.hu</title>
	<link rel="stylesheet" type="text/css" href="./bin/site.css" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta charset="utf-8">
	<script type="text/javascript">
		window.lang = JSON.parse('<?= L_getJSON() ?>');
		window.lang.langCode = '<?= $i18n->getAppliedLang() ?>';
	</script>
</head>
<body class="index">
	<div class="container">
		<div class="langs">
			<a href="/?lang=en">
				<img src="./bin/gb.svg" alt="fb" title="gb" />
			</a>
			<a href="?lang=hu">
				<img src="./bin/hu.svg" alt="hu" title="hu" />
			</a>
		</div>

		<div class="billboard">
			<p class="billboard--row billboard--row__brick"><?= L::the_next_bus ?></p>
			<p class="billboard--row billboard--row__pink"><?= L::goes_to_trier ?>*</p>
			<p class="billboard--row billboard--row__green"><?= L::billboard_in ?></p>
		</div>

		<div class="ribbon">
			<p></p>
			<p><?= L::hurry_up_you_have_to_wait_after_it('<span></span>') ?></p>
		</div>

		<div class="info">
			* <?= L::from_luxembourg_johnfkennedy ?>
		</div>
	</div>

	<script type="text/javascript" src="./bin/bundle.js"></script>

	<?php if ($_SERVER['REMOTE_ADDR'] !== '::1'): ?>
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-78324908-1', 'auto');
			ga('send', 'pageview');
		</script>
	<?php endif; ?>
</body>
</html>