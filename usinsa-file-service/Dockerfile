FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-file-service-1.0.jar UsinsaFileService.jar
ENTRYPOINT ["java", "-jar", "UsinsaFileService.jar"]