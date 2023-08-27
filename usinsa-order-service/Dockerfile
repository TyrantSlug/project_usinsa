FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-order-service-1.0.jar UsinsaOrderService.jar
ENTRYPOINT ["java", "-jar", "UsinsaOrderService.jar"]