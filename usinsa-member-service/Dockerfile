FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/usinsa-member-service-1.0.jar UsinsaMemberService.jar
ENTRYPOINT ["java", "-jar", "UsinsaMemberService.jar"]