FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-reply-service-1.0.jar UsinsaReplyService.jar

ENTRYPOINT ["java", "-jar", "UsinsaReplyService.jar"]
                           