var point_arr = [];    //Массив точек для расчета параметров
var wgs_proj ='+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
var secondProjection;
var conform = {"summ_intermediary_x":0,
  "summ_intermediary_y":0,
  "summ_msk_x":0,
  "summ_msk_y":0,
  "sdxy_1":0,
  "sdxy_2":0,
  "sdxy_3":0,
  "sdxy_4":0,
  "sdxy_5":0,
  "intermediary_x_centr":0,
  "msk_x_centr":0,
  "intermediary_y_centr":0,
  "msk_y_centr":0,
  "a_1":0,
  "b_1":0,
  "a_0":0,
  "b_0":0,
  "scale":0,
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
  //let tpsnform_msk = proj4(wgs_proj,secondProjection,[element.wgs_x,element.wgs_y]);
  point_arr[index].intermediary_x = element.wgs_x;
  point_arr[index].intermediary_y = element.wgs_y;
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
  conform.sdxy_1 += point_arr[index].dx_intermediary * point_arr[index].dx_msk;
  conform.sdxy_2 += point_arr[index].dy_intermediary * point_arr[index].dy_msk;
  conform.sdxy_3 += point_arr[index].dx_intermediary * point_arr[index].dy_msk;
  conform.sdxy_4 += point_arr[index].dy_intermediary * point_arr[index].dx_msk;
  conform.sdxy_5 += (point_arr[index].dx_intermediary * point_arr[index].dx_intermediary) + (point_arr[index].dy_intermediary * point_arr[index].dy_intermediary);
}

function newSkPoint(element, index, array) {
  point_arr[index].xv = conform.a_0 + (conform.a_1 * element.intermediary_x) - (conform.b_1 * element.intermediary_y);
  point_arr[index].yv = conform.b_0 + (conform.b_1 * element.intermediary_x) + (conform.a_1 * element.intermediary_y);
  point_arr[index].vx = element.msk_x - point_arr[index].xv;
  point_arr[index].vy = element.msk_y - point_arr[index].yv;
  point_arr[index].v = Math.sqrt(point_arr[index].vx * point_arr[index].vx + point_arr[index].vy * point_arr[index].vy);
}

function poj_parametr() {
  //epsg 4326 +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs
  //+proj=omerc +lat_0=52.02642240080064 +lonc=21 +alpha=-0.0001 +k=1 +x_0=0 +y_0=0 +gamma=0 +ellps=krass

  point_arr = [];
  let arrp = {};
  secondProjection ="";
  conform = {"summ_intermediary_x":0,
    "summ_intermediary_y":0,
    "summ_msk_x":0,
    "summ_msk_y":0,
    "sdxy_1":0,
    "sdxy_2":0,
    "sdxy_3":0,
    "sdxy_4":0,
    "sdxy_5":0,
    "intermediary_x_centr":0,
    "msk_x_centr":0,
    "intermediary_y_centr":0,
    "msk_y_centr":0,
    "a_1":0,
    "b_1":0,
    "a_0":0,
    "b_0":0,
    "scale":0,
    "rotation":0};

  arrp.wgs_x = Number.parseFloat(document.querySelectorAll(`[name="XXX"][id="0"]`)[0].value);
  arrp.wgs_y = Number.parseFloat(document.querySelectorAll(`[name="YYY"][id="0"]`)[0].value);
  arrp.msk_x = Number.parseFloat(document.querySelectorAll(`[name="MXX"][id="0"]`)[0].value);
  arrp.msk_y = Number.parseFloat(document.querySelectorAll(`[name="MYY"][id="0"]`)[0].value);
  point_arr.push(arrp);
  if (arrp.wgs_x && arrp.wgs_y && arrp.msk_x && arrp.msk_y) {

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
    conform.a_1 = (conform.sdxy_1 + conform.sdxy_2) / conform.sdxy_5; //(s[0] + s[1]) / s[4];
    conform.b_1 = (conform.sdxy_3 - conform.sdxy_4) / conform.sdxy_5; //(s[2] - s[3]) / s[4];
    conform.a_0 = conform.msk_x_centr - (conform.a_1 * conform.intermediary_x_centr) + (conform.b_1 * conform.intermediary_y_centr); //yc[0] - a[1][0] * xc[0] + a[1][1] * xc[1];
    conform.b_0 = conform.msk_y_centr - (conform.b_1 * conform.intermediary_x_centr) - (conform.a_1 * conform.intermediary_y_centr); //yc[1] - a[1][1] * xc[0] - a[1][0] * xc[1];
    /* найти вторичные параметры */
    conform.scale = Math.sqrt(conform.a_1 * conform.a_1 + conform.b_1 * conform.b_1); //hypot(a[1][0], a[1][1])
    conform.rotation = Math.atan2(conform.b_1, conform.a_1) / Math.PI * 180; //atan2(a[1][1], a[1][0])
    point_arr.forEach(newSkPoint);

    console.log(point_arr);
    console.log(conform);
  }
  else {
    // Тут надо подсветить поля для обязательного заполнения
    return;
  }
}
