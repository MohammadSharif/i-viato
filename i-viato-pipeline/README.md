# i-viato Pipeline
This repository will contain all work towards the visual recognition project. Please note that building this image
for the first time will take a long time. After running `docker-compose build`, grab a coffee, play a game of PUBG,or go lift some weights.


To execute you must have docker then:  
```
$docker-compose build
```  

Then:
```
$docker-compose up
```

Or if you want the bash:  
```
$docker-compose up -d  
$docker exec -it django-apache2 bash 
```

Once you're done with the execution run remove instance with:  
```
$docker-compose down
```  

