<?php
if(isset($_POST["vvbtn"])){
 if($_POST["vvbtn"] == "Расчет"){
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
	echo '<td><input type="text" size="11" name="ves['.$i.']" value="0"></td>';
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
 echo '</tbody></table></form></body></html>';
}

?>