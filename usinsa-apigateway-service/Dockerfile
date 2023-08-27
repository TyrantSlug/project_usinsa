FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-apigateway-service-1.0.jar UsinsaApigatewayService.jar
ENTRYPOINT ["java", "-jar", "UsinsaApigatewayService.jar"]