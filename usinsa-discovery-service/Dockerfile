FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-discovery-service-1.0.jar UsinsaDiscoveryService.jar
ENTRYPOINT ["java", "-jar", "UsinsaDiscoveryService.jar"]