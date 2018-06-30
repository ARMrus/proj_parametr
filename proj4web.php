<?php
if(isset($_POST["vvbtn"])){
 if($_POST["vvbtn"] == "Расчет"){
	 $myprefix=str_replace('.','',str_replace(' ','',microtime()));
	 $catll_name = sys_get_temp_dir().'/'.$myprefix.'-catll.tsv';
	 $cat_name = sys_get_temp_dir().'/'.$myprefix.'-cat.tsv';
	 $catloc_name = sys_get_temp_dir().'/'.$myprefix.'-catloc.tsv';
	 $var_name = sys_get_temp_dir().'/'.$myprefix.'-var.tsv';
	 
	 $catll = fopen($catll_name, 'w+');
	 $catloc = fopen($catloc_name, 'w+');
	 for($i=0; $i<count($_POST["XDDDD"]); $i++){
		 if (isset($_POST["active$i"]) and $_POST["active$i"] == $i){
		 }else{
		 	fwrite($catll, str_replace(',','.',$_POST["XDDDD"][$i].' '.$_POST["YDDDD"][$i])."\n"); // Запись в файл
		 	fwrite($catloc, str_replace(',','.',$_POST["XMMMM"][$i].' '.$_POST["YMMMM"][$i])."\n"); // Запись в файл
		 }
	 }
	 fclose($catll);
	 fclose($catloc);

	$myprojstring0 = 'proj -f "%.16g" +proj=omerc +lat_0='.$_POST["CYDDDD"].' +lonc=21 +alpha=-0.0001 +k=1 +x_0=0 +y_0=0 +ellps=krass '.$catll_name.' > '.$cat_name;
	$myprojstring1 = '/var/www/tst1/public_html/helmkey '.$cat_name.' '.$catloc_name.' '.$var_name;
	echo exec($myprojstring0);
	echo '<div widht="100%"><h2 align="center">';
	echo exec($myprojstring1);
	echo '</h2></div>';
	$var = fopen($var_name, 'r');
	$i=0;
	while (($buffer = fgets($var)) !== false) {
		$vvspl = explode(';',$buffer);
		while((isset($_POST["active$i"]) and $_POST["active$i"] == $i)){
			$_POST["NVX"][$i] = 0;
			$_POST["NVY"][$i] = 0;
			$_POST["NXY"][$i] = 0;
			$i++;
		}
		
		$_POST["NVX"][$i] = $vvspl[0];
		$_POST["NVY"][$i] = $vvspl[1];
		$_POST["NXY"][$i] = hypot($vvspl[0],$vvspl[1]);
		$i++;
	}
	 
	unlink($catll_name);
	unlink($cat_name);
	unlink($catloc_name);
	unlink($var_name);
	 
	
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
	unset($_POST);
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
if(isset($_POST["NXY"][$i])){
	echo '<td><input type="text" size="11" name="NXY['.$i.']" value="'.$_POST["NXY"][$i].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="NXY['.$i.']" value="0"></td>';
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
function codx(){
var myDD = d.getElementsByName('CX_DD')[0];
var myMM = d.getElementsByName('CX_MM')[0];
var mySS = d.getElementsByName('CX_SS')[0];
var myDDDD = d.getElementsByName('CXDDDD')[0];
myDDDD.value = +myDD.value + (+myMM.value/60) + (+mySS.value/3600);
}
function cody(){
var myDD = d.getElementsByName('CY_DD')[0];
var myMM = d.getElementsByName('CY_MM')[0];
var mySS = d.getElementsByName('CY_SS')[0];
var myDDDD = d.getElementsByName('CYDDDD')[0];
myDDDD.value = +myDD.value + (+myMM.value/60) + (+mySS.value/3600);
}
";
 echo '</script></head><body><form method="post">';
 echo '<table border="0" width="70%" align="left" id="v_table"><thead><tr>';
 echo '<th>XX.XXXXX</th><th>DD</th><th>MM</th><th>SS.SSSS</th><th>Метры</th>';
 echo '<th>YY.YYYYY</th><th>DD</th><th>MM</th><th>SS.SSSS</th><th>Метры</th>';
 echo '</tr></thead><tbody>';
if(isset($_POST["CXDDDD"])){
	echo '<td><input type="text" size="11" name="CXDDDD" value="'.$_POST["CXDDDD"].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="CXDDDD" value="0"></td>';
}
if(isset($_POST["CX_DD"])){
	echo '<td><input type="text" size="2" name="CX_DD" value="'.$_POST["CX_DD"].'" onchange="codx()"></td>';
}else{
	echo '<td><input type="text" size="2" name="CX_DD" value="0" onchange="codx()"></td>';
}
if(isset($_POST["CX_MM"])){
	echo '<td><input type="text" size="2" name="CX_MM" value="'.$_POST["CX_MM"].'" onchange="codx()"></td>';
}else{
	echo '<td><input type="text" size="2" name="CX_MM" value="0" onchange="codx()"></td>';
}
if(isset($_POST["CX_SS"])){
	echo '<td><input type="text" size="7" name="CX_SS" value="'.$_POST["CX_SS"].'" onchange="codx()"></td>';
}else{
	echo '<td><input type="text" size="7" name="CX_SS" value="0" onchange="codx()"></td>';
}
if(isset($_POST["CXMMMM"])){
	echo '<td><input type="text" size="11" name="CXMMMM" value="'.$_POST["CXMMMM"].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="CXMMMM" value="0"></td>';
}
if(isset($_POST["CYDDDD"])){
	echo '<td><input type="text" size="11" name="CYDDDD" value="'.$_POST["CYDDDD"].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="CYDDDD" value="0"></td>';
}
if(isset($_POST["CY_DD"])){
	echo '<td><input type="text" size="2" name="CY_DD" value="'.$_POST["CY_DD"].'" onchange="cody()"></td>';
}else{
	echo '<td><input type="text" size="2" name="CY_DD" value="0" onchange="cody()"></td>';
}
if(isset($_POST["CY_MM"])){
	echo '<td><input type="text" size="2" name="CY_MM" value="'.$_POST["CY_MM"].'" onchange="cody()"></td>';
}else{
	echo '<td><input type="text" size="2" name="CY_MM" value="0" onchange="cody()"></td>';
}
if(isset($_POST["CY_SS"])){
	echo '<td><input type="text" size="7" name="CY_SS" value="'.$_POST["CY_SS"].'" onchange="cody()"></td>';
}else{
	echo '<td><input type="text" size="7" name="CY_SS" value="0" onchange="cody()"></td>';
}
if(isset($_POST["CYMMMM"])){
	echo '<td><input type="text" size="11" name="CYMMMM" value="'.$_POST["CYMMMM"].'"></td>';
}else{
	echo '<td><input type="text" size="11" name="CYMMMM" value="0"></td>';
}
 echo '</tbody></table>';
 echo '<input type="submit" name="vvbtn" value="Расчет"/><input type="submit" name="vvbtn" value="+"/>';
 echo '<input type="submit" name="vvbtn" value="-"/><input type="submit" name="vvbtn" value="Очистить"/>';
 echo '<table border="0" width="100%" align="center" id="v_table"><thead><tr>';
 echo '<th>№</th><th>Неактив</th><th>Название</th><th>XX.XXXXX</th><th>DD</th><th>MM</th><th>SS.SSSS</th><th>Метры</th>';
 echo '<th>YY.YYYYY</th><th>DD</th><th>MM</th><th>SS.SSSS</th><th>Метры</th><th>НевязкаX</th><th>НевязкаY</th><th>Невязка</th>';
 echo '</tr></thead><tbody>';
}
function vvhtmlfoot(){
 echo '</tbody></table></form>';
 echo '</body></html>';
}

?>
