FROM openjdk:17-oracle

WORKDIR /app

COPY . /app

RUN ./mvnw package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/StudentsManagement-0.0.1-SNAPSHOT.jar"]