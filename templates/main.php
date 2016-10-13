<?php
class MainTemplate extends TemplateAbstract {
    public function render() {
?>
<div class="container">
    <div class="langs">
        <a href="/?lang=en">
            <img src="./bin/gb.svg" alt="fb" title="en" style="width: 25px;"/>
        </a>

        <a href="?lang=hu">
            <img src="./bin/hu.svg" alt="hu" title="hu" style="width: 25px;"/>
        </a>


        <a href="?lang=ru">
            <img src="./bin/ru.svg" alt="ru" title="ru" style="width: 25px;"/>
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
        <!--<p class="billboard--row billboard--row__green"><?= L::billboard_in ?></p>-->
        <p class="billboard--row billboard--row__green routeTip"> * <?= L::from_luxembourg_johnfkennedy ?></p>
    </div>

    <div class="ribbon">
        <p></p>
        <p><?= L::hurry_up_you_have_to_wait_after_it('<span></span>') ?></p>
    </div>

    <div class="whatsnew">
        <ul>
            <li>
                <h2>2016. 10. 08.</h2>
                <ul>
                    <li>Optimized and more precise functionality</li>
                    <li>New meta description and title <br> (&nbsp;<svg class="heart" viewBox="0 0 32 29.6">
                            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" style="width: 10px;height: 10px;"/>
                        </svg>&nbsp;Google )</li>
                    <li>Mobile Web App capability, icons (Add to home screen)</li>
                    <li>Minute countdown on the favicon</li>
                    <li>This list :)</li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="github">
        <a href="http://www.github.com/arvai/trierhu">
            <img src="./bin/github.png" alt="Github Repo" title="Github Repo"/>
        </a>
    </div>
</div>
<?php
    }
}
?>