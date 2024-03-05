# Use an official OpenJDK runtime as a parent image
#FROM adoptopenjdk:17-jre-hotspot
FROM eclipse-temurin:17
# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file into the container at the specified working directory
COPY target/exam-0.0.1-SNAPSHOT.jar /app/

# Specify the command to run on container startup
CMD ["java", "-jar", "exam-0.0.1-SNAPSHOT.jar"]