// Copyright © 2020 Ryabov Alex
// Contacts:
//  email: armrus@armrus.org
//  url: armrus.org
//  tel: +79119220535
// License: https://git.armrus.org/open-source/gis/proj_parametr/blob/master/COPYING

/*
This file is part of proj_parametr.

    proj_parametr is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    proj_parametr is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with proj_parametr.  If not, see <https://www.gnu.org/licenses/>.

  (Этот файл — часть proj_parametr.

   proj_parametr - свободная программа: вы можете перераспространять ее и/или
   изменять ее на условиях Стандартной общественной лицензии GNU в том виде,
   в каком она была опубликована Фондом свободного программного обеспечения;
   либо версии 3 лицензии, либо (по вашему выбору) любой более поздней
   версии.

   proj_parametr распространяется в надежде, что она будет полезной,
   но БЕЗО ВСЯКИХ ГАРАНТИЙ; даже без неявной гарантии ТОВАРНОГО ВИДА
   или ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННЫХ ЦЕЛЕЙ. Подробнее см. в Стандартной
   общественной лицензии GNU.

   Вы должны были получить копию Стандартной общественной лицензии GNU
   вместе с этой программой. Если это не так, см.
   <https://www.gnu.org/licenses/>.)
   */

var point_arr = [];    //Массив точек для расчета параметров
// var wgs_proj ='+proj=longlat +datum=WGS84 +no_defs';
var wgs_proj ='EPSG:4326';  //СК для картографии и спутниковых измерений. Возможно сделаем ее выбираемой из списка в будущем.
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
  let arrp = {};
  arrp.wgs_x = Number.parseFloat(element.querySelectorAll(`[name="XXX"]`)[0].value);
  arrp.wgs_y = Number.parseFloat(element.querySelectorAll(`[name="YYY"]`)[0].value);
  arrp.msk_x = Number.parseFloat(element.querySelectorAll(`[name="MXX"]`)[0].value);
  arrp.msk_y = Number.parseFloat(element.querySelectorAll(`[name="MYY"]`)[0].value);
  arrp.id_dom = element.querySelectorAll(`[id]`)[0].value;
  // console.log(element.querySelectorAll(`[id]`)[0]);
  arrp.active = active.checked;
  arrp.name = element.querySelectorAll(`[name="NickName"]`)[0].value;
  point_arr.push(arrp);
}

function filter_point(point_to_filter) {
  if (point_to_filter.wgs_x && point_to_filter.wgs_y && point_to_filter.msk_x && point_to_filter.msk_y) {
    return true;
  }
  return false;
}

function transform_intermediary(element, index, array) {
  if(!element.active)
    return;
  let tpsnform_msk = proj4(wgs_proj,secondProjection,[element.wgs_x,element.wgs_y]);
  point_arr[index].intermediary_x = tpsnform_msk[0];
  point_arr[index].intermediary_y = tpsnform_msk[1];
}

function summCord(element, index, array) {
  if(!element.active)
    return;
  conform.summ_intermediary_x += element.intermediary_x;
  conform.summ_intermediary_y += element.intermediary_y;
  conform.summ_msk_x += element.msk_x;
  conform.summ_msk_y += element.msk_y;
}

var activ_ggs;
function additionCord(element, index, array) {
  if(!element.active)
    return;
  activ_ggs = activ_ggs + 1;  //Считаем активные точки
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
  let tpsnform_wgsmsk = proj4(wgs_proj,conform.projstring,[element.wgs_x,element.wgs_y]);      //Пересчитываем точку по вычисленным параметрам
  let tpsnform_mskwgs = proj4(conform.projstring,wgs_proj,[element.msk_x,element.msk_y]);      //Пересчитываем точку по вычисленным параметрам
  //В связи с нерешенной проблемой в proj4js  с gamma  https://github.com/proj4js/proj4js/issues/301
  //Для конечного вычисления точек по полученным парамметрам, будем считать координаты
  //на projbin на стороне сервера, для чего будем обращаться с функицей на сервер, где скрипт на php
  //будет обращаться к команде echo Xmsk Ymsk | cs2cs proj_string +to +init=epsg:4326 и парсить ответ передавая его браузеру
  //ajax
  const request = new XMLHttpRequest();
  const params = "projstring=" + encodeURIComponent(conform.projstring) + "&wgs_x=" + element.wgs_x + "&wgs_y=" + element.wgs_y + "&msk_x=" + element.msk_x + "&msk_y=" + element.msk_y;
  request.open('POST', url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      let arr_projBin = request.responseText.split(/[\t|\s*]/);
      tpsnform_wgsmsk[0] = Number.parseFloat(arr_projBin[3]);
      tpsnform_wgsmsk[1] = Number.parseFloat(arr_projBin[4]);
      tpsnform_mskwgs[0] = Number.parseFloat(arr_projBin[0]);
      tpsnform_mskwgs[1] = Number.parseFloat(arr_projBin[1]);
      //////////////////////////////////////////////////////////////
      point_arr[index].transform_x = tpsnform_wgsmsk[0];
      point_arr[index].transform_y = tpsnform_wgsmsk[1];
      point_arr[index].transform_wgs_x = tpsnform_mskwgs[0];
      point_arr[index].transform_wgs_y = tpsnform_mskwgs[1];
      point_arr[index].vx = point_arr[index].msk_x - point_arr[index].transform_x;              //Выясняем разницу между исходной коодинате X для точки в МСК и пересчитанной по выявленным параметрам
      point_arr[index].vy = point_arr[index].msk_y - point_arr[index].transform_y;              //Выясняем разницу между исходной коодинате Y для точки в МСК и пересчитанной по выявленным параметрам
      point_arr[index].v = Math.sqrt(point_arr[index].vx * point_arr[index].vx + point_arr[index].vy * point_arr[index].vy);  //Выясняем общую невязку для точки в МСК и пересчитанной по выявленным параметрам
      if(element.active){
        point_arr[index].vconform_x = (conform.h_0 * point_arr[index].intermediary_x + conform.h_1 * point_arr[index].intermediary_y + conform.proj_x) - point_arr[index].msk_x;  //Выясняем невязку конфорного преобразования по X
        point_arr[index].vconform_y = ((0 - conform.h_1) * point_arr[index].intermediary_x + conform.h_0 * point_arr[index].intermediary_y + conform.proj_y) - point_arr[index].msk_y; //Выясняем невязку конфорного преобразования по Y
      }
      //////////////////////////////////////////////////////////////
    }
  });
  request.send(params);
}
//
// function clearPointTransform(element, index, array) {
//   point_arr[index].intermediary_x = 0;
//   point_arr[index].intermediary_y = 0;
//   point_arr[index].dx_intermediary = 0;
//   point_arr[index].dx_msk = 0;
//   point_arr[index].dy_intermediary = 0;
//   point_arr[index].dy_msk = 0;
//   point_arr[index].transform_x = 0;
//   point_arr[index].transform_y = 0;
//   point_arr[index].transform_wgs_x = 0;
//   point_arr[index].transform_wgs_y = 0;
//   point_arr[index].vx = 0;
//   point_arr[index].vy = 0;
//   point_arr[index].v = 0;
//   point_arr[index].vconform_x = 0;
//   point_arr[index].vconform_y = 0;
// }

var NewPoint_count;
function okNewPoint(element, index, array) {
  if(element.transform_x > 0)
    NewPoint_count = NewPoint_count + 1;
}
function postconform(centrPoint) {
  // console.log(centrPoint);
  point_arr.forEach(okNewPoint);
  if(point_arr.length > NewPoint_count){
    // console.log("ждем");
    setTimeout(postconform, 200, centrPoint);
    return;
  }
  else{
    //Тут все что следует после пересчета координат (вывод на карту и тд.)
    // console.log(point_arr);
    //console.log(conform);
    print_parmetr();  //Выводим невязки
    point_arr.forEach(PointAddAll);
    center_msk_map(centrPoint.wgs_x,centrPoint.wgs_y);
    return;
  }
}

function count_activ_point(sum, current) {
  if(current.active)
    return ++sum;
  return sum;
}

function poj_parametr() {
  NewPoint_count = 0;
  activ_ggs = 0;
  point_arr = [];
  let centrPoint = {};
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

  centrPoint.wgs_x = Number.parseFloat(document.querySelectorAll(`[name="XXX"][id="0"]`)[0].value);
  centrPoint.wgs_y = Number.parseFloat(document.querySelectorAll(`[name="YYY"][id="0"]`)[0].value);
  if (centrPoint.wgs_x && centrPoint.wgs_y) {
    // point_arr.forEach(clearPointTransform);   //Удаляем всю информацию о трансформации из массива точек
    secondProjection = "+proj=" + document.querySelectorAll(`[id="projselect"]`)[0].value;
    secondProjection = secondProjection + " +lat_0=" + centrPoint.wgs_y;
    secondProjection = secondProjection + " +lonc=" + centrPoint.wgs_x;
    secondProjection = secondProjection + " +alpha=-0.00001 +k=1 +x_0=0 +y_0=0 +gamma=0";
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
    // console.log(point_arr.reduce(count_activ_point,0));
    let count_ggs_activ = point_arr.reduce(count_activ_point,0);
    conform.intermediary_x_centr = (conform.summ_intermediary_x) / count_ggs_activ;
    conform.msk_x_centr = (conform.summ_msk_x) / count_ggs_activ;
    conform.intermediary_y_centr = (conform.summ_intermediary_y) /count_ggs_activ;
    conform.msk_y_centr = (conform.summ_msk_y) / count_ggs_activ;
    /* подсчитать сумму произведений */
    point_arr.forEach(additionCord);
    if(activ_ggs < 3){
      alert("Необходимо минимум три активные точки WGS - MSK");
      return;
    }
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
    secondProjection = secondProjection + " +alpha=-0.00001";
    secondProjection = secondProjection + " +k=" + conform.scale;
    secondProjection = secondProjection + " +x_0=" + conform.proj_x;
    secondProjection = secondProjection + " +y_0=" + conform.proj_y;
    secondProjection = secondProjection + " +gamma=" + conform.rotation;  //К сожалению на момент написание кода проблема в proj4js  с gamma не решена https://github.com/proj4js/proj4js/issues/301
    secondProjection = secondProjection + " +ellps=" + document.getElementById('ellps').value;
    conform.projstring = secondProjection;
    // console.log(conform.rotation);
    console.log(conform.projstring);
    point_arr.forEach(newSkPoint);
    console.log(point_arr);
    postconform(centrPoint);
  }
  else {
    alert("Укажите центральную точку");
    return;
  }
}
