FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-item-service-1.0.jar UsinsaItemService.jar
ENTRYPOINT ["java", "-jar", "UsinsaItemService.jar"]