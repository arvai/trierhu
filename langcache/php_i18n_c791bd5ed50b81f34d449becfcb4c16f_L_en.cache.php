<?php class L {
const the_next_bus = 'The next bus';
const goes_to_trier = 'goes to Trier';
const from_luxembourg_johnfkennedy = 'From Luxembourg - John F. Kennedy';
const hurry_up_you_have_to_wait_after_it = 'Hurry up! You have to wait %s after it!';
const billboard_in = 'in';
public static function __callStatic($string, $args) {
    return vsprintf(constant("self::" . $string), $args);
}
}
function L($string, $args=NULL) {
    $return = constant("L::".$string);
    return $args ? vsprintf($return,$args) : $return;
}