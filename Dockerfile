FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /backend
COPY --from=build /backend/target/*.jar cookbook-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "cookbook-0.0.1-SNAPSHOT.jar"]
