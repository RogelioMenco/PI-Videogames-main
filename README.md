## Dev

Para iniciar el proyecto deben seguirse los siguientes pasos

1. Instalar dependencias para client y server

```
cd api
npm install
```

```
cd client
npm install
```

3. Desde la raiz del directiorio del proyecto, ejecutar `docker compose up -d` para la creacion de la base de datos
4. Crear los archivos `.env` para client y server siguiendo los `.env.example`
5. Para iniciar la API

```
cd server
npm start
```

6. Para ejecutar el client

```
cd client
npm run dev
```

7. Por defecto client estara en el puerto `5173` y la API en `4000`
