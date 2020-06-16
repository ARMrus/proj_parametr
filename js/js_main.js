var point_arr = [];    //Массив точек для расчета параметров
var wgs_proj ='+proj=longlat +datum=WGS84 +no_defs';
var secondProjection;
var conform = {
  "summ_intermediary_x":0,
  "summ_intermediary_y":0,
  "summ_msk_x":0,
  "summ_msk_y":0,
  "sdxy_0":0,
  "sdxy_2":0,
  "sdxy_3":0,
  "sdxy_4":0,
  "sdxy_5":0,
  "sdxy_6":0,
  "intermediary_x_centr":0,
  "msk_x_centr":0,
  "intermediary_y_centr":0,
  "msk_y_centr":0,
  "h_0":0,
  "h_1":0,
  "proj_x":0,
  "proj_y":0,
  "scale":0,
  "det":0,
  "rotation":0};

function str_tab(element, index, array) {
  let active = element.querySelectorAll(`[name="active"]`)[0];
  if(active.checked == true){
    let arrp = {};
    arrp.wgs_x = Number.parseFloat(element.querySelectorAll(`[name="XXX"]`)[0].value);
    arrp.wgs_y = Number.parseFloat(element.querySelectorAll(`[name="YYY"]`)[0].value);
    arrp.msk_x = Number.parseFloat(element.querySelectorAll(`[name="MXX"]`)[0].value);
    arrp.msk_y = Number.parseFloat(element.querySelectorAll(`[name="MYY"]`)[0].value);
    point_arr.push(arrp);
  }
}

function filter_point(point_to_filter) {
  if (point_to_filter.wgs_x && point_to_filter.wgs_y && point_to_filter.msk_x && point_to_filter.msk_y) {
    return true;
  }
  return false;
}

function transform_intermediary(element, index, array) {
  let tpsnform_msk = proj4(wgs_proj,secondProjection,[element.wgs_x,element.wgs_y]);
  point_arr[index].intermediary_x = tpsnform_msk[0];
  point_arr[index].intermediary_y = tpsnform_msk[1];
}

function summCord(element, index, array) {
  conform.summ_intermediary_x += element.intermediary_x;
  conform.summ_intermediary_y += element.intermediary_y;
  conform.summ_msk_x += element.msk_x;
  conform.summ_msk_y += element.msk_y;
}

function additionCord(element, index, array) {
  /* вычислить разности */
  point_arr[index].dx_intermediary = element.intermediary_x - conform.intermediary_x_centr;
  point_arr[index].dx_msk = element.msk_x - conform.msk_x_centr;
  point_arr[index].dy_intermediary = element.intermediary_y - conform.intermediary_y_centr;
  point_arr[index].dy_msk = element.msk_y - conform.msk_y_centr;
  /* суммировать */
  conform.sdxy_0 += point_arr[index].dx_intermediary * point_arr[index].dx_intermediary;
  conform.sdxy_2 += point_arr[index].dy_intermediary * point_arr[index].dy_intermediary;
  conform.sdxy_3 += point_arr[index].dx_intermediary * point_arr[index].dx_msk;
  conform.sdxy_4 += point_arr[index].dy_intermediary * point_arr[index].dx_msk;
  conform.sdxy_5 += point_arr[index].dx_intermediary * point_arr[index].dy_msk;
  conform.sdxy_6 += point_arr[index].dy_intermediary * point_arr[index].dy_msk;
}

function newSkPoint(element, index, array) {
  let tpsnform_msk = proj4(wgs_proj,conform.projstring,[element.wgs_x,element.wgs_y]);      //Пересчитываем точку по вычисленным параметрам
  point_arr[index].transform_x = tpsnform_msk[0];
  point_arr[index].transform_y = tpsnform_msk[1];
  point_arr[index].vx = point_arr[index].msk_x - point_arr[index].transform_x;              //Выясняем разницу между исходной коодинате X для точки в МСК и пересчитанной по выявленным параметрам
  point_arr[index].vy = point_arr[index].msk_y - point_arr[index].transform_y;              //Выясняем разницу между исходной коодинате Y для точки в МСК и пересчитанной по выявленным параметрам
  point_arr[index].v = Math.sqrt(point_arr[index].vx * point_arr[index].vx + point_arr[index].vy * point_arr[index].vy);  //Выясняем общую невязку для точки в МСК и пересчитанной по выявленным параметрам
  point_arr[index].vconform_x = (conform.h_0 * point_arr[index].intermediary_x + conform.h_1 * point_arr[index].intermediary_y + conform.proj_x) - point_arr[index].msk_x;  //Выясняем невязку конфорного преобразования по X
  point_arr[index].vconform_y = ((0 - conform.h_1) * point_arr[index].intermediary_x + conform.h_0 * point_arr[index].intermediary_y + conform.proj_y) - point_arr[index].msk_y; //Выясняем невязку конфорного преобразования по Y
}

function poj_parametr() {
  //epsg 4326 +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs
  //+proj=omerc +lat_0=52.02642240080064 +lonc=21 +alpha=-0.0001 +k=1 +x_0=0 +y_0=0 +gamma=0 +ellps=krass

  point_arr = [];
  let arrp = {};
  secondProjection ="";
  conform = {
    "summ_intermediary_x":0,
    "summ_intermediary_y":0,
    "summ_msk_x":0,
    "summ_msk_y":0,
    "sdxy_0":0,
    "sdxy_2":0,
    "sdxy_3":0,
    "sdxy_4":0,
    "sdxy_5":0,
    "sdxy_6":0,
    "intermediary_x_centr":0,
    "msk_x_centr":0,
    "intermediary_y_centr":0,
    "msk_y_centr":0,
    "h_0":0,
    "h_1":0,
    "scale":0,
    "proj_x":0,
    "proj_y":0,
    "det":0,
    "rotation":0};

  arrp.wgs_x = Number.parseFloat(document.querySelectorAll(`[name="XXX"][id="0"]`)[0].value);
  arrp.wgs_y = Number.parseFloat(document.querySelectorAll(`[name="YYY"][id="0"]`)[0].value);
  arrp.msk_x = Number.parseFloat(document.querySelectorAll(`[name="MXX"][id="0"]`)[0].value);
  arrp.msk_y = Number.parseFloat(document.querySelectorAll(`[name="MYY"][id="0"]`)[0].value);
  // point_arr.push(arrp);
  if (arrp.wgs_x && arrp.wgs_y && arrp.msk_x && arrp.msk_y) {
    secondProjection = "+proj=" + document.querySelectorAll(`[id="projselect"]`)[0].value;
    secondProjection = secondProjection + " +lat_0=" + arrp.wgs_y;
    secondProjection = secondProjection + " +lonc=" + arrp.wgs_x;
    secondProjection = secondProjection + " +alpha=-0.01 +k=1 +x_0=0 +y_0=0 +gamma=0";
    secondProjection = secondProjection + " +ellps=" + document.getElementById('ellps').value;
    // console.log(secondProjection);
    var row_geopoint = document.querySelectorAll(`[name="th"]`);
    row_geopoint.forEach(str_tab);
    point_arr = point_arr.filter(filter_point);

    //------------------------------------------------------
    //Конформное преобразование
    //------------------------------------------------------
    point_arr.forEach(transform_intermediary);
    /* подсчитать сумму координат */
    point_arr.forEach(summCord);
    /* найти центр масс */
    conform.intermediary_x_centr = (conform.summ_intermediary_x) / point_arr.length;
    conform.msk_x_centr = (conform.summ_msk_x) / point_arr.length;
    conform.intermediary_y_centr = (conform.summ_intermediary_y) / point_arr.length;
    conform.msk_y_centr = (conform.summ_msk_y) / point_arr.length;
    /* подсчитать сумму произведений */
    point_arr.forEach(additionCord);
    /* найти первичные параметры */
    conform.det = conform.sdxy_0 + conform.sdxy_2;
    conform.h_0 = (conform.sdxy_3 + conform.sdxy_6) / conform.det;
    conform.h_1 = (conform.sdxy_4 - conform.sdxy_5) / conform.det;
    conform.proj_x = conform.msk_x_centr - conform.h_0 * conform.intermediary_x_centr - conform.h_1 * conform.intermediary_y_centr;
    conform.proj_y = conform.msk_y_centr + conform.h_1 * conform.intermediary_x_centr - conform.h_0 * conform.intermediary_y_centr;
    /* найти вторичные параметры */
    conform.scale = Math.sqrt(conform.h_0 * conform.h_0 + conform.h_1 * conform.h_1);
    conform.rotation = Math.atan2(conform.h_1, conform.h_0) / Math.PI * 180;
    //-------------------------------------------------------

    secondProjection = "+proj=" + document.querySelectorAll(`[id="projselect"]`)[0].value;
    secondProjection = secondProjection + " +lat_0=" + Number.parseFloat(document.querySelectorAll(`[name="YYY"][id="0"]`)[0].value);
    secondProjection = secondProjection + " +lonc=" + Number.parseFloat(document.querySelectorAll(`[name="XXX"][id="0"]`)[0].value);
    secondProjection = secondProjection + " +alpha=-0.01";
    secondProjection = secondProjection + " +k=" + conform.scale;
    secondProjection = secondProjection + " +x_0=" + conform.proj_x;
    secondProjection = secondProjection + " +y_0=" + conform.proj_y;
    secondProjection = secondProjection + " +gamma=" + conform.rotation;
    secondProjection = secondProjection + " +ellps=" + document.getElementById('ellps').value;
    conform.projstring = secondProjection;
    point_arr.forEach(newSkPoint);


    console.log(point_arr);
    console.log(conform);
  }
  else {
    // Тут надо подсветить поля для обязательного заполнения
    return;
  }
}




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
