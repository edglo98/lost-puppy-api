
## Installation

Descarga el proyecto y ejecuta

Clone the project

```bash
  git clone https://github.com/edglo98/socket-chat.git
```

Ejecuta los comandos para instalar.

```bash
  cd lost-puppy-api
  npm install
```
    
## Environment Variables

Antes de correr el proyecto asegurate que esten las variables de entorno que
deje en el archivo `.env.example`, que son las siguientes:

`PORT`

`MONGO_CNN`

`SECRET_KEY`

  
## Run Locally

Existen dos comandos.

#### Start

Este es el comando que iniciara el proyecto tal como funcionaria en producción.

```bash
  npm run start
```

#### Dev

Este es el entorno que debes usar para desarrollar. Utiliza nodemon para tener hot refresh. 

```bash
  npm run dev
```
  

### Nota!

Si tienes problemas con el comando dev relacionados con la IP del servidor de red local puedes comentar la linea correspondiente a la funcion del archivo `models/server.js`

  