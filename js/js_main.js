function delrow(rows_del_id){
    var row_table_th = document.getElementById('th'+rows_del_id);
    var row_table_tl = document.getElementById('tl'+rows_del_id);
    row_table_th.parentNode.removeChild(row_table_th);
    row_table_tl.parentNode.removeChild(row_table_tl);
}
function lastrow(){
  var table = document.getElementById('TBL1');
      var rowCount = table.rows.length;
  return Math.trunc(rowCount / 2 -1);
}
function mnnrefresh(){
  var cnt;
  for(cnt = 1;cnt <= lastrow();cnt++){
    mnn(cnt);
  }
}
function mnn(myrow){
  var mytrh = document.getElementById(`th${myrow}`);
  var mytrl = document.getElementById(`tl${myrow}`);
  var maxx = document.getElementById('MNX');
  var maxy = document.getElementById('MNY');
  var nvx = document.getElementById(`NVX${myrow}`);
  var nvy = document.getElementById(`NVY${myrow}`);
  var nxy = document.getElementById(`NXY${myrow}`);
  if(+nxy.value > Math.hypot(+maxx.value,+maxy.value)){
    mytrh.setAttribute( 'style', 'background-color: #ff9999 !important; color: #4a4a4a !important');
    mytrl.setAttribute( 'style', 'background-color: #ff9999 !important; color: #4a4a4a !important');
  }else if(+nvx.value > +maxx.value){
    mytrh.setAttribute( 'style', 'background-color: #ffff99 !important; color: #4a4a4a !important');
    mytrl.setAttribute( 'style', 'background-color: #ffff99 !important; color: #4a4a4a !important');
  }else if(+nvy.value > +maxy.value){
    mytrh.setAttribute( 'style', 'background-color: #ff99ff !important; color: #4a4a4a !important');
    mytrl.setAttribute( 'style', 'background-color: #ff99ff !important; color: #4a4a4a !important');
  }else{
    if(myrow % 2){
      mytrh.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
      mytrl.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
    }else{
      mytrh.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
      mytrl.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
    }
  }
}
function act(myrow){
  var active = document.getElementById(`active${myrow}`);
  var mytrh = document.getElementById(`th${myrow}`);
  var mytrl = document.getElementById(`tl${myrow}`);
  if(active.checked == true){
    if(myrow % 2){
      mytrh.setAttribute( 'style', 'background-color: #ffffff !important; color: #eeffff !important');
      mytrl.setAttribute( 'style', 'background-color: #ffffff !important; color: #eeffff !important');
    }else{
      mytrh.setAttribute( 'style', 'background-color: #eeffff !important; color: #ffffff !important');
      mytrl.setAttribute( 'style', 'background-color: #eeffff !important; color: #ffffff !important');
    }
  }else{
    if(myrow % 2){
      mytrh.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
      mytrl.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
    }else{
      mytrh.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
      mytrl.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
    }
    mnn(myrow);
  }
}
function addrow(){
  var tbl = document.getElementById('TBL1');
  var rows_end = tbl.getElementsByTagName('tr');
  var id_end_rows = rows_end[rows_end.length -1].id;
  var rownum = parseInt(id_end_rows.replace(/\D+/g,""))+1;
  var newRow = tbl.insertRow(lastrow() * 2 + 2);
  newRow.align = "center";
  newRow.id = `th${rownum}`;
  if(rownum % 2){
    newRow.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
  }else{
    newRow.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
  }
  var cnt;
  var newCell;
  newCell = newRow.insertCell(0);
  newCell.innerHTML = rownum;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(1);
  newCell.innerHTML = `<input type="checkbox" name="active${rownum}" id="active${rownum}" value="${rownum}" onchange="act('${rownum}')"><button type="button" onclick="delrow('${rownum}')">-</button>`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(2);
  newCell.innerHTML = `<input type="text" size="8" name="NickName${rownum}" value="">`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(3);
  newCell.innerHTML = `<input type="text" size="20" name="XXX${rownum}" id="XXX${rownum}" pattern="\\d{1,3}((\\.|,)\\d*)?" value="" onchange="m2s('X${rownum}')">`;
  newCell.colSpan = 3;
  newCell = newRow.insertCell(4);
  newCell.innerHTML = `<input type="text" size="20" name="MXX${rownum}" id="MXX${rownum}" pattern="\\d*((\\.|,)\\d*)?" value="">`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(5);
  newCell.innerHTML = `<input type="text" size="20" name="YYY${rownum}" id="YYY${rownum}" pattern="\\d{1,3}((\\.|,)\\d*)?" value="" onchange="m2s('Y${rownum}')">`;
  newCell.colSpan = 3;
  newCell = newRow.insertCell(6);
  newCell.innerHTML = `<input type="text" size="20" name="MYY${rownum}" id="MYY${rownum}" pattern="\\d*((\\.|,)\\d*)?" value="">`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(7);
  newCell.innerHTML = `<section name="NVX${rownum}" id="NVX${rownum}"></section>`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(8);
  newCell.innerHTML = `<section name="NVY${rownum}" id="NVY${rownum}"></section>`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(9);
  newCell.innerHTML = `<section name="NXY${rownum}" id="NXY${rownum}"></section>`;
  newCell.rowSpan = 2;
  newRow = tbl.insertRow(lastrow() * 2 + 3);
  newRow.align ="center";
  newRow.id = `tl${rownum}`;
  if((lastrow()) % 2){
    newRow.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
  }else{
    newRow.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
  }
  newCell = newRow.insertCell(0);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="XXD${rownum}" id="XXD${rownum}" pattern="\\d{0,3}" value="" onchange="s2m('X${rownum}')">`;
  newCell = newRow.insertCell(1);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="XXM${rownum}" id="XXM${rownum}" pattern="\\d{0,2}" value="" onchange="s2m('X${rownum}')">`;
  newCell = newRow.insertCell(2);
  newCell.innerHTML = `<input type="text" size="8" name="XXS${rownum}" id="XXS${rownum}" pattern="\\d{0,2}((\\.|,)\\d*)?" value="" onchange="s2m('X${rownum}')">`;
  newCell = newRow.insertCell(3);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="YYD${rownum}" id="YYD${rownum}" pattern="\\d{0,3}" value="" onchange="s2m('Y${rownum}')">`;
  newCell = newRow.insertCell(4);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="YYM${rownum}" id="YYM${rownum}" pattern="\\d{0,2}" value="" onchange="s2m('Y${rownum}')">`;
  newCell = newRow.insertCell(5);
  newCell.innerHTML = `<input type="text" size="8" name="YYS${rownum}" id="YYS${rownum}" pattern="\\d{0,2}((\\.|,)\\d*)?" value="" onchange="s2m('Y${rownum}')">`;
}
function m2s(my_id){
  if(my_id.substring(0,1) == 'X'){
    var XXX = document.getElementById('XXX' + my_id.substring(1));
    var XXD = document.getElementById('XXD' + my_id.substring(1));
    var XXM = document.getElementById('XXM' + my_id.substring(1));
    var XXS = document.getElementById('XXS' + my_id.substring(1));
    XXX.value = XXX.value.replace(',','.');
    XXD.value = Math.trunc(XXX.value);
    XXM.value = Math.trunc((XXX.value - XXD.value) * 60);
    XXS.value = ((XXX.value - XXD.value) * 60 - XXM.value) * 60;
    if(XXX.value == 0){
      XXX.value ="";
    }
    if(XXD.value == 0){
      XXD.value ="";
    }
    if(XXM.value == 0){
      XXM.value ="";
    }
    if(XXS.value == 0){
      XXS.value ="";
    }
  }else if(my_id.substring(0,1) == 'Y'){
    var YYY = document.getElementById('YYY' + my_id.substring(1));
    var YYD = document.getElementById('YYD' + my_id.substring(1));
    var YYM = document.getElementById('YYM' + my_id.substring(1));
    var YYS = document.getElementById('YYS' + my_id.substring(1));
    YYY.value = YYY.value.replace(',','.');
    YYD.value = Math.trunc(YYY.value);
    YYM.value = Math.trunc((YYY.value - YYD.value) * 60);
    YYS.value = ((YYY.value - YYD.value) * 60 - YYM.value) * 60;
    if(YYY.value == 0){
      YYY.value ="";
    }
    if(YYD.value == 0){
      YYD.value ="";
    }
    if(YYM.value == 0){
      YYM.value ="";
    }
    if(YYS.value == 0){
      YYS.value ="";
    }
  }
}
function s2m(my_id){
  if(my_id.substring(0,1) == "X"){
    var XXX = document.getElementById('XXX' + my_id.substring(1));
    var XXD = document.getElementById('XXD' + my_id.substring(1));
    var XXM = document.getElementById('XXM' + my_id.substring(1));
    var XXS = document.getElementById('XXS' + my_id.substring(1));
    XXD.value = XXD.value.replace(',','.');
    XXM.value = XXM.value.replace(',','.');
    XXS.value = XXS.value.replace(',','.');
    XXX.value = +XXD.value + (+XXM.value/60) + (+XXS.value/3600);
    if(XXX.value == 0){
      XXX.value ="";
    }
    if(XXD.value == 0){
      XXD.value ="";
    }
    if(XXM.value == 0){
      XXM.value ="";
    }
    if(XXS.value == 0){
      XXS.value ="";
    }
  }else if(my_id.substring(0,1) == "Y"){
    var YYY = document.getElementById('YYY' + my_id.substring(1));
    var YYD = document.getElementById('YYD' + my_id.substring(1));
    var YYM = document.getElementById('YYM' + my_id.substring(1));
    var YYS = document.getElementById('YYS' + my_id.substring(1));
    YYD.value = YYD.value.replace(',','.');
    YYM.value = YYM.value.replace(',','.');
    YYS.value = YYS.value.replace(',','.');
    YYY.value = +YYD.value + (+YYM.value/60) + (+YYS.value/3600);
    if(YYY.value == 0){
      YYY.value ="";
    }
    if(YYD.value == 0){
      YYD.value ="";
    }
    if(YYM.value == 0){
      YYM.value ="";
    }
    if(YYS.value == 0){
      YYS.value ="";
    }
  }
}
