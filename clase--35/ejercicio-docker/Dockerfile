FROM node
#Definimos una imagen base: NODE. Esto lo toma de Docker Hub. 

WORKDIR /app
#Internamente, estamos creando una carpeta llamada App en donde guardamos nuestro proyecto. Generalmente la llamamos app. 

COPY package.json . 
#Copiamos el package.json de nuestro proyecto a nuestra nueva carpeta. 

RUN npm install 
#Acá le estamos diciendo que tiene que instalarse en la nueva carpeta. 

COPY . .
#Esto copia el resto de los archivos

EXPOSE 8080
#Le decimos en que puerto vamos a escuchar

CMD ["npm", "start"]
#Tiene que ejecutar "npm start" para que funcione, no se olviden de configurar el script en el package.json

