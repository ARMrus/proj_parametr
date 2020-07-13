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

  tpsnform_msk = proj4(conform.projstring,wgs_proj,[element.msk_x,element.msk_y]);      //Пересчитываем точку по вычисленным параметрам
  point_arr[index].transform_wgs_x = tpsnform_msk[0];
  point_arr[index].transform_wgs_y = tpsnform_msk[1];
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
  if (arrp.wgs_x && arrp.wgs_y) {
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
    point_arr.forEach(PointAddAll);
  }
  else {
    // Тут надо подсветить поля для обязательного заполнения
    return;
  }
}
