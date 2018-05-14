FROM python:3.6

# Dependencies and Packages
RUN apt-get -qq update
RUN apt-get install build-essential cmake git pkg-config default-jdk ant unzip wget -y 
RUN apt-get install libavformat-dev libswscale-dev libavcodec-dev -y 
RUN apt-get install nodejs -y 
RUN apt-get install libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev libboost-all-dev -y 
RUN apt-get install libtbb-dev libopenblas-dev libeigen3-dev libav-tools libgtk2.0-dev -y 

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

RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_8.x
RUN apt-get install -y nodejs npm
RUN npm install -g n
RUN n stable

# set working directory
RUN mkdir /usr/src/app 
RUN mkdir /usr/src/app/iviato-api 
RUN mkdir /usr/src/app/iviato-pipeline
RUN mkdir /usr/src/app/iviato-pipeline/ffmpeg
WORKDIR /usr/src/app/iviato-api

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/iviato-api/node_modules/.bin:$PATH

# install and cache app dependencies
COPY iviato-api/package.json /usr/src/app/iviato-api/package.json
RUN mkdir /root/.aws
COPY aws.txt /root/.aws/credentials
RUN npm install

RUN apt-get install python3-pip -y
RUN pip3 install --upgrade pip
RUN pip3 install psycopg2
RUN pip3 install opencv-python
RUN pip3 install dlib
RUN pip3 install imutils
RUN pip3 install numpy
RUN pip3 install uuid
RUN pip3 install psycopg2-binary

# demo purposes
# RUN mkdir /usr/src/app/iviato-storage
# COPY iviato-storage/demo-original.mov /usr/src/app/iviato-storage/demo-original.mov 
# COPY iviato-storage/demo-shinobi.mov /usr/src/app/iviato-storage/demo-shinobi.mov 

# start app
CMD ["npm", "start"]