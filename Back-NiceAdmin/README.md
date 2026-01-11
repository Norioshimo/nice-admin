# Back End Para el proyecto de Nice Admin


## Stack
- Java 1.7
- Postgresql 17
- Docker
- Maven

## Ejecutar para levantar la base de datos.

```
docker compose up -d
```

## Ejecutar para levantar el proyecto
```
mvn spring-boot:run
```

## JWT
Los tokens están firmados con HMAC SHA-256 usando una clave secreta de la aplicación: El token y expiration se configura en el application.yml.

Ejemplo de Token generado

```
{
    "sub": "admin",
    "userId": 1,
    "rolId": 2,
    "iat": 1768138705,
    "exp": 1768142305
}
```




