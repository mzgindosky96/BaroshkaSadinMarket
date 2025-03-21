<?php
$counter_file = 'visitors.dat';
$count = file_exists($counter_file) ? (int)file_get_contents($counter_file) + 1 : 1;
file_put_contents($counter_file, $count);
echo number_format($count);
?>
