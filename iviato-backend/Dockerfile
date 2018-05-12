FROM node:9.6.1

# Dependencies and Packages
RUN apt-get update
RUN apt-get install build-essential -y 
RUN apt-get install cmake -y
RUN apt-get install git -y
RUN apt-get install libgtk2.0-dev -y
RUN apt-get install pkg-config -y
RUN apt-get install libavcodec-dev -y
RUN apt-get install libavformat-dev -y 
RUN apt-get install libswscale-dev -y 
RUN apt-get install python3 -y 
RUN apt-get install python3-dev -y 
RUN apt-get install python-numpy -y 
RUN apt-get install libtbb2 -y 
RUN apt-get install libtbb-dev -y 
RUN apt-get install libjpeg-dev -y 
RUN apt-get install libpng-dev -y 
RUN apt-get install libtiff-dev -y 
RUN apt-get install libjasper-dev -y 
RUN apt-get install libdc1394-22-dev -y 
RUN apt-get install libboost-all-dev -y 
RUN apt-get install libtbb-dev -y 
RUN apt-get install libopenblas-dev -y 
RUN apt-get install libeigen3-dev -y 
RUN apt-get install default-jdk -y 
RUN apt-get install ant -y 
RUN apt-get install unzip -y
RUN apt-get install wget -y
RUN apt-get install libav-tools -y


RUN mkdir /home/Downloads
# OpenCV
WORKDIR /home/Downloads
RUN wget https://github.com/Itseez/opencv/archive/3.4.0.zip -O opencv-3.4.0.zip
RUN unzip opencv-3.4.0.zip
WORKDIR /home/Downloads/opencv-3.4.0
RUN mkdir build 
WORKDIR /home/Downloads/opencv-3.4.0/build
RUN cmake -D WITH_TBB=ON ..
RUN make -j4
RUN make install

# Dlib
WORKDIR /home/Downloads
RUN wget http://dlib.net/files/dlib-19.1.tar.bz2
RUN bunzip2 dlib-19.1.tar.bz2
RUN tar xf dlib-19.1.tar
WORKDIR /home/Downloads/dlib-19.1
RUN mkdir build
WORKDIR /home/Downloads/dlib-19.1/build
RUN cmake ..
RUN make -j4
RUN make install

# Openface
WORKDIR /home/Downloads
RUN git clone https://github.com/TadasBaltrusaitis/OpenFace.git
WORKDIR /home/Downloads/OpenFace
RUN mkdir build
WORKDIR /home/Downloads/OpenFace/build
RUN cmake ..
RUN make -j4
RUN make install

# set working directory
RUN mkdir /usr/src/app 
RUN mkdir /usr/src/app/iviato-api 
RUN mkdir /usr/src/app/iviato-pipeline
WORKDIR /usr/src/app/iviato-api

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/iviato-api/node_modules/.bin:$PATH

# install and cache app dependencies
COPY iviato-api/package.json /usr/src/app/iviato-api/package.json
RUN npm install --silent

# start app
CMD ["npm", "start"]