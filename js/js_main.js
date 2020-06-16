function delrow(rows_del_id){
    // console.log(tbl);
    var th = document.querySelectorAll(`[name="th"][id="${rows_del_id}"]`);
    var tl = document.querySelectorAll(`[name="tl"][id="${rows_del_id}"]`);
    th[0].parentNode.removeChild(th[0]);
    tl[0].parentNode.removeChild(tl[0]);
}

function lastrow(){
  var table = document.getElementById('TBL1');
      var rowCount = table.rows.length;
  return Math.trunc(rowCount / 2 -1);
}

function mnnrefresh(){
  // var cnt;
  // for(cnt = 1;cnt <= lastrow();cnt++){
  //   mnn(cnt);
  // }
}

function mnn(myrow){
  // var th = document.getElementsByName('th');
  // var tl = document.getElementsByName('tl');
  console.log("раскраска");
  // var mytrh = th.getElementById(myrow);
  // var mytrl = tl.getElementById(myrow);

  var mytrh = document.querySelectorAll(`[name="th"][id="${myrow}"]`)[0];
  var mytrl = document.querySelectorAll(`[name="tl"][id="${myrow}"]`)[0];

  // var maxx = document.getElementById('MNX');
  // var maxy = document.getElementById('MNY');
  // var nvx = document.getElementById(`NVX${myrow}`);
  // var nvy = document.getElementById(`NVY${myrow}`);
  // var nxy = document.getElementById(`NXY${myrow}`);
  // if(+nxy.value > Math.hypot(+maxx.value,+maxy.value)){
  //   mytrh.setAttribute( 'style', 'background-color: #ff9999 !important; color: #4a4a4a !important');
  //   mytrl.setAttribute( 'style', 'background-color: #ff9999 !important; color: #4a4a4a !important');
  // }else if(+nvx.value > +maxx.value){
  //   mytrh.setAttribute( 'style', 'background-color: #ffff99 !important; color: #4a4a4a !important');
  //   mytrl.setAttribute( 'style', 'background-color: #ffff99 !important; color: #4a4a4a !important');
  // }else if(+nvy.value > +maxy.value){
  //   mytrh.setAttribute( 'style', 'background-color: #ff99ff !important; color: #4a4a4a !important');
  //   mytrl.setAttribute( 'style', 'background-color: #ff99ff !important; color: #4a4a4a !important');
  // }else{
    if(myrow % 2){
      mytrh.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
      mytrl.setAttribute( 'style', 'background-color: #ffffff !important; color: #4a4a4a !important');
    }else{
      mytrh.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
      mytrl.setAttribute( 'style', 'background-color: #eeffff !important; color: #4a4a4a !important');
    }
  // }
}

function act(myrow){
  var mytrh = document.querySelectorAll(`[name="th"][id="${myrow}"]`)[0];
  var mytrl = document.querySelectorAll(`[name="tl"][id="${myrow}"]`)[0];
  var active = mytrh.querySelectorAll(`[name="active"][id="${myrow}"]`)[0];
  if(active.checked == true){
    if(myrow % 2){
      mytrh.setAttribute( 'style', 'background-color: #ffffff !important; color: inherit !important');
      mytrl.setAttribute( 'style', 'background-color: #ffffff !important; color: inherit !important');
    }else{
      mytrh.setAttribute( 'style', 'background-color: #eeffff !important; color: inherit !important');
      mytrl.setAttribute( 'style', 'background-color: #eeffff !important; color: inherit !important');
    }
  }else{
    if(myrow % 2){
      mytrh.setAttribute( 'style', 'background-color: #ffffff !important; color: #cccccc !important');
      mytrl.setAttribute( 'style', 'background-color: #ffffff !important; color: #cccccc !important');
    }else{
      mytrh.setAttribute( 'style', 'background-color: #eeffff !important; color: #cccccc !important');
      mytrl.setAttribute( 'style', 'background-color: #eeffff !important; color: #cccccc !important');
    }
    //mnn(myrow);
  }
}

function addrow(){
  var tbl = document.getElementById('TBL1');
  var rows_end = tbl.getElementsByTagName('tr');
  var id_end_rows = rows_end[rows_end.length -1].id;
  var rownum = parseInt(id_end_rows.replace(/\D+/g,""))+1;
  var newRow = tbl.insertRow(lastrow() * 2 + 2);
  newRow.align = "center";
  newRow.id = rownum;
  newRow.setAttribute("name", "th");
  //console.log(newRow.name);
  if(rownum % 2){
    newRow.setAttribute( 'style', 'background-color: #ffffff !important; color: inherit !important');
  }else{
    newRow.setAttribute( 'style', 'background-color: #eeffff !important; color: inherit !important');
  }
  var cnt;
  var newCell;
  newCell = newRow.insertCell(0);
  newCell.innerHTML = rownum;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(1);
  newCell.innerHTML = `<input type="checkbox" name="active" id="${rownum}" value="${rownum}" onchange="act('${rownum}')" checked><button type="button" onclick="delrow('${rownum}')">-</button>`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(2);
  newCell.innerHTML = `<input type="text" size="8" name="NickName" value="">`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(3);
  newCell.innerHTML = `<input type="text" size="20" name="XXX" id="${rownum}" pattern="\\d{1,3}((\\.|,)\\d*)?" value="" onchange="m2s('X${rownum}')">`;
  newCell.colSpan = 3;
  newCell = newRow.insertCell(4);
  newCell.innerHTML = `<input type="text" size="20" name="MXX" id="${rownum}" pattern="\\d*((\\.|,)\\d*)?" value="">`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(5);
  newCell.innerHTML = `<input type="text" size="20" name="YYY" id="${rownum}" pattern="\\d{1,3}((\\.|,)\\d*)?" value="" onchange="m2s('Y${rownum}')">`;
  newCell.colSpan = 3;
  newCell = newRow.insertCell(6);
  newCell.innerHTML = `<input type="text" size="20" name="MYY" id="${rownum}" pattern="\\d*((\\.|,)\\d*)?" value="">`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(7);
  newCell.innerHTML = `<section name="NVX" id="${rownum}"></section>`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(8);
  newCell.innerHTML = `<section name="NVY" id="${rownum}"></section>`;
  newCell.rowSpan = 2;
  newCell = newRow.insertCell(9);
  newCell.innerHTML = `<section name="NXY" id="${rownum}"></section>`;
  newCell.rowSpan = 2;
  newRow = tbl.insertRow(lastrow() * 2 + 3);
  newRow.align ="center";
  newRow.id = rownum;
  newRow.setAttribute("name", "tl");
  if((lastrow()) % 2){
    newRow.setAttribute( 'style', 'background-color: #ffffff !important; color: inherit !important');
  }else{
    newRow.setAttribute( 'style', 'background-color: #eeffff !important; color: inherit !important');
  }
  newCell = newRow.insertCell(0);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="XXD" id="${rownum}" pattern="\\d{0,3}" value="" onchange="s2m('X${rownum}')">`;
  newCell = newRow.insertCell(1);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="XXM" id="${rownum}" pattern="\\d{0,2}" value="" onchange="s2m('X${rownum}')">`;
  newCell = newRow.insertCell(2);
  newCell.innerHTML = `<input type="text" size="8" name="XXS" id="${rownum}" pattern="\\d{0,2}((\\.|,)\\d*)?" value="" onchange="s2m('X${rownum}')">`;
  newCell = newRow.insertCell(3);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="YYD" id="${rownum}" pattern="\\d{0,3}" value="" onchange="s2m('Y${rownum}')">`;
  newCell = newRow.insertCell(4);
  newCell.innerHTML = `<input type="text" size="2" maxlength="2" name="YYM" id="${rownum}" pattern="\\d{0,2}" value="" onchange="s2m('Y${rownum}')">`;
  newCell = newRow.insertCell(5);
  newCell.innerHTML = `<input type="text" size="8" name="YYS" id="${rownum}" pattern="\\d{0,2}((\\.|,)\\d*)?" value="" onchange="s2m('Y${rownum}')">`;
}

function m2s(my_id){
  if(my_id.substring(0,1) == 'X'){
    var XXX = document.querySelectorAll(`[name="XXX"][id="${my_id.substring(1)}"]`)[0];
    var XXD = document.querySelectorAll(`[name="XXD"][id="${my_id.substring(1)}"]`)[0];
    var XXM = document.querySelectorAll(`[name="XXM"][id="${my_id.substring(1)}"]`)[0];
    var XXS = document.querySelectorAll(`[name="XXS"][id="${my_id.substring(1)}"]`)[0];
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
    var YYY = document.querySelectorAll(`[name="YYY"][id="${my_id.substring(1)}"]`)[0];
    var YYD = document.querySelectorAll(`[name="YYD"][id="${my_id.substring(1)}"]`)[0];
    var YYM = document.querySelectorAll(`[name="YYM"][id="${my_id.substring(1)}"]`)[0];
    var YYS = document.querySelectorAll(`[name="YYS"][id="${my_id.substring(1)}"]`)[0];
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
    var XXX = document.querySelectorAll(`[name="XXX"][id="${my_id.substring(1)}"]`)[0];
    var XXD = document.querySelectorAll(`[name="XXD"][id="${my_id.substring(1)}"]`)[0];
    var XXM = document.querySelectorAll(`[name="XXM"][id="${my_id.substring(1)}"]`)[0];
    var XXS = document.querySelectorAll(`[name="XXS"][id="${my_id.substring(1)}"]`)[0];
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
    var YYY = document.querySelectorAll(`[name="YYY"][id="${my_id.substring(1)}"]`)[0];
    var YYD = document.querySelectorAll(`[name="YYD"][id="${my_id.substring(1)}"]`)[0];
    var YYM = document.querySelectorAll(`[name="YYM"][id="${my_id.substring(1)}"]`)[0];
    var YYS = document.querySelectorAll(`[name="YYS"][id="${my_id.substring(1)}"]`)[0];
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
