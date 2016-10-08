<?php require_once('./bootstrap.php'); ?>
<?php require_once('./getData.php'); ?>
<?php
	$apiGet = new apiGet();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Trier.hu</title>
	<link rel="stylesheet" type="text/css" href="./bin/site.css"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="theme-color" content="#FE4365">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="description"
		  content="">
	<meta charset="utf-8">
	<script type="text/javascript">
		window.lang = JSON.parse('<?= L_getJSON() ?>');
		window.lang.langCode = '<?= $i18n->getAppliedLang() ?>';
	</script>
	<script>
		window.config = {
			next  : <?= $apiGet->getNextToSeconds() ?>,
			after : <?= $apiGet->getAfterToSeconds() ?>
		};
	</script>
</head>
<body class="index">
<div class="container">
	<div class="langs">
		<a href="/?lang=en">
			<img src="./bin/gb.svg" alt="fb" title="en"/>
		</a>

		<a href="?lang=hu">
			<img src="./bin/hu.svg" alt="hu" title="hu"/>
		</a>


		<a href="?lang=ru">
			<img src="./bin/ru.svg" alt="ru" title="ru"/>
		</a>
		<!--
					<a href="?lang=hi">
						<img src="./bin/in.svg" alt="hindi" title="hindi" />
					</a>
					-->
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
	<div class="github">
		<a href="http://www.github.com/arvai/trierhu">
			<img src="./bin/github.png" alt="Github Repo" title="Github Repo"/>
		</a>
	</div>
</div>
<script type="text/javascript" src="./bin/bundle.js"></script>
<?php
// Check if http://dev.trier.hu
if (strpos($_SERVER['HTTP_HOST'], 'dev.') !== 0):
?>
	<script>
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-78324908-1', 'auto');
		ga('send', 'pageview');
	</script>
<?php endif; ?>
</body>
</html>