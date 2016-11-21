<?php class L {
const the_next_bus = 'A következő busz';
const goes_to_trier = 'Trierbe indul';
const from_luxembourg_johnfkennedy = 'Luxembourg - John F. Kennedy megállóból';
const hurry_up_you_have_to_wait_after_it = 'Siess! A várakozási idő ezután: %s';
const billboard_in = 'ekkor';
public static function __callStatic($string, $args) {
    return vsprintf(constant("self::" . $string), $args);
}
}
function L($string, $args=NULL) {
    $return = constant("L::".$string);
    return $args ? vsprintf($return,$args) : $return;
}