<?php
if(isset($_POST["vvbtn"])){
 if($_POST["vvbtn"] == "Расчет"){
	 $myprefix=str_replace('.','',str_replace(' ','',microtime()));
	 $pt_longlat_name = sys_get_temp_dir().'/'.$myprefix.'-pt_longlat.dat';
	 $pt_tmerc_name = sys_get_temp_dir().'/'.$myprefix.'-pt_tmerc.dat';
	 $data0_name = sys_get_temp_dir().'/'.$myprefix.'-data0.dat';
	 $data1_name = sys_get_temp_dir().'/'.$myprefix.'-data1.dat';
	 $key1_name = sys_get_temp_dir().'/'.$myprefix.'-key1.dat';
	 $var1_name = sys_get_temp_dir().'/'.$myprefix.'-var1.dat';
	 $pt_longlat = fopen($pt_longlat_name, 'w+');
	 $data0 = fopen($data0_name, 'w+');
	 for($i=0; $i<count($_POST["XDDDD"]); $i++){
		 if ($i == $_POST["center"]){
			 $lat0=$_POST["YDDDD"][$i];
			 $lon0=$_POST["XDDDD"][$i];
			 $x0=$_POST["XMMMM"][$i];
			 $y0=$_POST["YMMMM"][$i];
		 }else{
			 if (isset($_POST["active$i"]) and $_POST["active$i"] == $i){
			 }else{
				fwrite($pt_longlat, str_replace(',','.',$_POST["XDDDD"][$i].' '.$_POST["YDDDD"][$i])."\n"); // Запись в файл
				fwrite($data0, ($i + 1).' '.str_replace(',','.',$_POST["XDDDD"][$i].' '.$_POST["YDDDD"][$i].' '.$_POST["XMMMM"][$i].' '.$_POST["YMMMM"][$i].' '.$_POST["ves"][$i])."\n"); // Запись в файл
			 }
		 }
	 }
	 fclose($pt_longlat);
	 fclose($data0);
	 
	$myprojstring0 = 'proj -f "%.4f" +proj=tmerc +lat_0='.$lat0.' +lon_0='.$lon0.' +k=1 +x_0='.$x0.' +y_0='.$y0.' +ellps=krass '.$pt_longlat_name.' > '.$pt_tmerc_name;
	$myprojstring1 = "paste ".$data0_name." ".$pt_tmerc_name." | awk '{print $1, $7, $8, $4, $5, $6}' > ".$data1_name;
	$myprojstring2 = 'findkey '.$data1_name.' '.$key1_name.' '.$var1_name;
	echo exec($myprojstring0);
	echo exec($myprojstring1);
	echo exec($myprojstring2);

	$var1 = fopen($var1_name, 'r');
	while (($buffer = fgets($var1)) !== false) {
		$vvspl = explode(' ',$buffer);
		$_POST["NVX"][$vvspl[0]-1] = $vvspl[6];
		$_POST["NVY"][$vvspl[0]-1] = $vvspl[7];
	}
	fclose($var1); 

	$key1 = fopen($key1_name, 'r');
	$i = 1;
	while (($buffer = fgets($key1)) !== false) {
		if($i == 5){
			$myk = $buffer;
		}
		if($i == 6){
			$mya = $buffer;
		}
		$i++;
	}
	fclose($key1);
	 
	unlink($pt_longlat_name);
	unlink($pt_tmerc_name);
	unlink($data0_name);
	unlink($data1_name);
	unlink($key1_name);
	unlink($var1_name);
	 
	echo '<div widht="100%"><h2 align="center">+proj=omerc +lat_0='.$lat0.' +lonc='.$lon0.' +alpha='.$mya.' +gamma=0 +k='.$myk.' +x_0='.$x0.' +y_0='.$y0.' +ellps=krass</h2></div>';
	vvhtmlhead(count($_POST["name"]));
	vvhtmltbl(count($_POST["name"]));

	vvhtmlfoot();
 }elseif($_POST["vvbtn"] == "+"){
	vvhtmlhead(count($_POST["name"])+1);
	vvhtmltbl(count($_POST["name"])+1);
	vvhtmlfoot(); 
 }elseif($_POST["vvbtn"] == "-"){
	
	if (count($_POST["name"])-1 > 0){
	vvhtmlhead(count($_POST["name"])-1);
	vvhtmltbl(count($_POST["name"])-1);
	}else{
		vvhtmlhead(count($_POST["name"]));
		vvhtmltbl(count($_POST["name"]));
	}
	vvhtmlfoot(); 
 }else{
	vvhtmlhead(1);
	vvparamclean();
	vvhtmltbl(1);
	vvhtmlfoot();
 }
}else{
vvhtmlhead(1);
vvhtmltbl(1);
vvhtmlfoot();
}

function vvparamclean(){
	unset($_POST);
}

function vvhtmltbl($vvlast){
for ($i = 0; $i < $vvlast; $i++) {
echo '<tr><td>'.($i+1).'</td>';
if (isset($_POST["active$i"]) and $_POST["active$i"] == $i){
echo '<td><input type="checkbox" name="active'.$i.'" value="'.$i.'" checked></td>';
}else{
echo '<td><input type="checkbox" name="active'.$i.'" value="'.$i.'"></td>';	
}
if(isset($_POST["ves"][$i])){
	echo '<td><input type="text" size="11" name="ves['.$i.']" value="'.$_POST["ves"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="ves['.$i.']" value="1"></td>';
}
if(isset($_POST["name"][$i])){
	echo '<td><input type="text" size="11" name="name['.$i.']" value="'.$_POST["name"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="name['.$i.']" value=""></td>';
}
if(isset($_POST["XDDDD"][$i])){
	echo '<td><input type="text" size="11" name="XDDDD['.$i.']" value="'.$_POST["XDDDD"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="XDDDD['.$i.']" value="0"></td>';
}
if(isset($_POST["X_DD"][$i])){
	echo '<td><input type="text" size="2" name="X_DD['.$i.']" value="'.$_POST["X_DD"][$i].'" onchange="dodx('.$i.')"></td>';
}else{
	echo '<td><input type="text" size="2" name="X_DD['.$i.']" value="0" onchange="dodx('.$i.')"></td>';
}
if(isset($_POST["X_MM"][$i])){
	echo '<td><input type="text" size="2" name="X_MM['.$i.']" value="'.$_POST["X_MM"][$i].'" onchange="dodx('.$i.')"></td>';
}else{
	echo '<td><input type="text" size="2" name="X_MM['.$i.']" value="0" onchange="dodx('.$i.')"></td>';
}
if(isset($_POST["X_SS"][$i])){
	echo '<td><input type="text" size="7" name="X_SS['.$i.']" value="'.$_POST["X_SS"][$i].'" onchange="dodx('.$i.')"></td>';
}else{
	echo '<td><input type="text" size="7" name="X_SS['.$i.']" value="0" onchange="dodx('.$i.')"></td>';
}
if(isset($_POST["XMMMM"][$i])){
	echo '<td><input type="text" size="11" name="XMMMM['.$i.']" value="'.$_POST["XMMMM"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="XMMMM['.$i.']" value="0"></td>';
}
if(isset($_POST["YDDDD"][$i])){
	echo '<td><input type="text" size="11" name="YDDDD['.$i.']" value="'.$_POST["YDDDD"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="YDDDD['.$i.']" value="0"></td>';
}
if(isset($_POST["Y_DD"][$i])){
	echo '<td><input type="text" size="2" name="Y_DD['.$i.']" value="'.$_POST["Y_DD"][$i].'" onchange="dody('.$i.')"></td>';
}else{
	echo '<td><input type="text" size="2" name="Y_DD['.$i.']" value="0" onchange="dody('.$i.')"></td>';
}
if(isset($_POST["Y_MM"][$i])){
	echo '<td><input type="text" size="2" name="Y_MM['.$i.']" value="'.$_POST["Y_MM"][$i].'" onchange="dody('.$i.')"></td>';
}else{
	echo '<td><input type="text" size="2" name="Y_MM['.$i.']" value="0" onchange="dody('.$i.')"></td>';
}
if(isset($_POST["Y_SS"][$i])){
	echo '<td><input type="text" size="7" name="Y_SS['.$i.']" value="'.$_POST["Y_SS"][$i].'" onchange="dody('.$i.')"></td>';
}else{
	echo '<td><input type="text" size="7" name="Y_SS['.$i.']" value="0" onchange="dody('.$i.')"></td>';
}
if(isset($_POST["YMMMM"][$i])){
	echo '<td><input type="text" size="11" name="YMMMM['.$i.']" value="'.$_POST["YMMMM"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="YMMMM['.$i.']" value="0"></td>';
}
if(isset($_POST["NVX"][$i])){
	echo '<td><input type="text" size="11" name="NVX['.$i.']" value="'.$_POST["NVX"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="NVX['.$i.']" value="0"></td>';
}
if(isset($_POST["NVY"][$i])){
	echo '<td><input type="text" size="11" name="NVY['.$i.']" value="'.$_POST["NVY"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="NVY['.$i.']" value="0"></td>';
}
echo '</tr>';
}
}
function vvhtmlhead($vvlast){
 echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Proj4Web</title><style>td {text-align: center;}</style><script type="text/javascript">';
 echo "var d = document;
function dodx(rid){
var myDD = d.getElementsByName('X_DD['+rid+']')[0];
var myMM = d.getElementsByName('X_MM['+rid+']')[0];
var mySS = d.getElementsByName('X_SS['+rid+']')[0];
var myDDDD = d.getElementsByName('XDDDD['+rid+']')[0];
myDDDD.value = +myDD.value + (+myMM.value/60) + (+mySS.value/3600);
}
function dody(rid){
var myDD = d.getElementsByName('Y_DD['+rid+']')[0];
var myMM = d.getElementsByName('Y_MM['+rid+']')[0];
var mySS = d.getElementsByName('Y_SS['+rid+']')[0];
var myDDDD = d.getElementsByName('YDDDD['+rid+']')[0];
myDDDD.value = +myDD.value + (+myMM.value/60) + (+mySS.value/3600);
}
";
 echo '</script></head><body><form method="post">';
 if($vvlast > 1){
 echo '<select size="1" name="center">';
 for ($i = 0; $i < $vvlast; $i++) {
	 if($i == $_POST["center"]){
		if(!empty($_POST["name"][$i])){
			echo '<option selected value="'.$i.'">'.$_POST["name"][$i].'</option>';
		}else{
			echo '<option selected value="'.$i.'">'.($i+1).'</option>';
		}
	 }else{
		if(!empty($_POST["name"][$i])){
			echo '<option value="'.$i.'">'.$_POST["name"][$i].'</option>';
		}else{
			echo '<option value="'.$i.'">'.($i+1).'</option>';
		}
	 }
 }
 echo '</select>';
 }
 echo '<input type="submit" name="vvbtn" value="Расчет"/><input type="submit" name="vvbtn" value="+"/>';
 echo '<input type="submit" name="vvbtn" value="-"/><input type="submit" name="vvbtn" value="Очистить"/>';
 echo '<table border="0" width="100%" align="center" id="v_table"><thead><tr>';
 echo '<th>№</th><th>Неактив</th><th>Вес</th><th>Название</th><th>XX.XXXXX</th><th>DD</th><th>MM</th><th>SS.SSSS</th><th>Метры</th>';
 echo '<th>YY.YYYYY</th><th>DD</th><th>MM</th><th>SS.SSSS</th><th>Метры</th><th>НевязкаX</th><th>НевязкаY</th>';
 echo '</tr></thead><tbody>';
}
function vvhtmlfoot(){
 echo '</tbody></table></form>';
 echo '</body></html>';
}

?>
