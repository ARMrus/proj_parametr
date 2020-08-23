<?php
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
echo exec('echo '.$_POST['msk_x'].' '.$_POST['msk_y'].' | cs2cs '.$_POST['projstring'].' +to +init=epsg:4326  -f %.16f')." ";
echo exec('echo '.$_POST['wgs_x'].' '.$_POST['wgs_y'].' | cs2cs +init=epsg:4326  +to '.$_POST['projstring'].' -f %.4f');
?>
