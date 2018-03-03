FROM vcatechnology/linux-mint
MAINTAINER Hirad Pourtahmasbi - Mohammad Sharif

RUN apt-get update

RUN apt-get install build-essential cmake git libgtk2.0-dev pkg-config -y
RUN apt-get install libavcodec-dev libavformat-dev libswscale-dev python-dev
RUN apt-get python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev
RUN apt-get install libjasper-dev libdc1394-22-dev libboost-all-dev libtbb-dev 
RUN apt-get libopenblas-dev libeigen3-dev default-jdk ant

CMD ["apache2ctl", "-D", "FOREGROUND"]