<!DOCTYPE html>
<html lang="ru" dir="ltr">
  <head>
    <meta charset="utf-8">
    <script src="js/js_main.js"></script>
    <script src="js/proj2.6.js"></script>
    <script src="js/conform.js"></script>
    <title>Для теста расчета</title>
  </head>
  <body>
    <input id="projselect" type="text"  value="omerc">
    <input id="ellps" type="text"  value="krass">
    <table>
        <tbody>
          <tr>
            <td></td>
            <td>ГГС</td>
            <td>Хгр</td>
            <td>Угр</td>
            <td>Хм</td>
            <td>Ум</td>
          </tr>
          <tr>
            <td></td>
            <td>Марьино (959)</td>
            <td><input id="0" type="text" name="XXX" value="33"></td>
            <td><input id="0" type="text" name="YYY" value="59.8338730825"></td>
            <td><input id="0" type="text" name="MXX" value="2193212.72"></td>
            <td><input id="0" type="text" name="MYY" value="425057.63"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Аннинно (900)</td>
            <td><input type="text" name="XXX" value="30.0412923373"></td>
            <td><input type="text" name="YYY" value="59.7795946807"></td>
            <td><input type="text" name="MXX" value="2199080.76"></td>
            <td><input type="text" name="MYY" value="418924.47"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Егерская слобода (993)</td>
            <td><input type="text" name="XXX" value="29.840390224"></td>
            <td><input type="text" name="YYY" value="59.8679694038"></td>
            <td><input type="text" name="MXX" value="2187961.87"></td>
            <td><input type="text" name="MYY" value="428941.23"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Новополье (960)</td>
            <td><input type="text" name="XXX" value="29.9999211612"></td>
            <td><input type="text" name="YYY" value="59.8301622944"></td>
            <td><input type="text" name="MXX" value="2196837.89"></td>
            <td><input type="text" name="MYY" value="424590.33"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Марьино (959)</td>
            <td><input type="text" name="XXX" value="29.9351669792"></td>
            <td><input type="text" name="YYY" value="59.8338730825"></td>
            <td><input type="text" name="MXX" value="2193212.72"></td>
            <td><input type="text" name="MYY" value="425057.63"></td>
          </tr>
        </tbody>
    </table>
    <button type="button" onClick="poj_parametr()">PROJ!</button>
  </body>
</html>