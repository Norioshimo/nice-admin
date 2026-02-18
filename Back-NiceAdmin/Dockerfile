# ---------- BUILD STAGE ----------
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copiamos solo lo necesario primero (mejora cache)
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests -Pprod



# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:17-jre-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

# Optimizar JVM para producción
ENV JAVA_OPTS="-Xms128m -Xmx512m -XX:+UseG1GC -XX:+HeapDumpOnOutOfMemoryError"

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]