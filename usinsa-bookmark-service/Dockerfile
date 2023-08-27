FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-bookmark-service-1.0.jar UsinsaBookmarkService.jar
ENTRYPOINT ["java", "-jar", "UsinsaBookmarkService.jar"]