# Etapa 1: Build con Maven y JDK 17
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

# Copiar solo pom.xml primero para cachear dependencias si no cambian
COPY pom.xml .

# Descargar dependencias
RUN mvn dependency:go-offline

# Copiar el resto del código fuente
COPY src ./src

# Compilar y empaquetar sin tests (más rápido)
RUN mvn clean package -DskipTests

# Etapa 2: Imagen runtime ligera con solo JDK
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiar el jar construido en la etapa de build
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto que usa Spring Boot (ajusta si es otro)
EXPOSE 8080

# Comando para ejecutar la app
CMD ["java", "-jar", "app.jar"]
