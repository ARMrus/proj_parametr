<?php
echo exec('echo '.$_POST['msk_x'].' '.$_POST['msk_y'].' | cs2cs '.$_POST['projstring'].' +to +init=epsg:4326  -f %.16f')." ";
echo exec('echo '.$_POST['wgs_x'].' '.$_POST['wgs_y'].' | cs2cs +init=epsg:4326  +to '.$_POST['projstring'].' -f %.4f');
?>
