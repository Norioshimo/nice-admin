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

## Nota... Arquitectura en Capas (Layered Architecture)
- Repository = Acceso a datos. Responsabilidad.
  - Persistir entidades
  - Consultar la base de datos
  - Encapsular SQL / JPQL / Criteria
  - Abstraer la tecnología de persistencia (JPA, JDBC, Mongo, etc.)


- Service = Lógica de negocio. Responsabilidad.
  - Reglas del negocio
  - Orquestar múltiples repositorios
  - Manejo de transacciones
  - Validaciones complejas
  - Decisiones del sistema


- Controller = Capa de entrada (adaptador). Responsabilidad.
  - Recibir requests HTTP
  - Leer @PathVariable, @RequestParam, @RequestBody
  - Validar entrada básica (@Valid)
  - Delegar al Service
  - Construir la respuesta HTTP (ResponseEntity)




