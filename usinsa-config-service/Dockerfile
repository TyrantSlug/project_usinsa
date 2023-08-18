FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-config-service-1.0.jar UsinsaConfigService.jar
ENTRYPOINT ["java", "-jar", "UsinsaConfigService.jar"]