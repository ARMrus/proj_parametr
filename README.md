Получение параметров перехода от МСК к WGS и обратно.
Для работы необходим веб сервер и php.

Ссылка на демо (полноценно рабочую) страницу расчетов параметров:
https://armrus.org/extranet/proj/

Установка на ubuntu:
sudo apt install proj-bin
sudo apt install proj-data
sudo apt install gdal-bin
sudo apt install git
cd <каталог вебсайта>
git clone --recurse-submodules http://git.armrus.org/open-source/gis/proj_parametr.git

Установка на Centos:
sudo yum install proj
sudo yum install proj-epsg
sudo yum install gdal
sudo yum install git
cd <каталог вебсайта>
git clone --recurse-submodules http://git.armrus.org/open-source/gis/proj_parametr.git
