# Use an official OpenJDK runtime as a parent image
FROM adoptopenjdk:17-jre-hotspot

# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file into the container at the specified working directory
COPY target/your-spring-boot-app.jar /app/

# Specify the command to run on container startup
CMD ["java", "-jar", "your-spring-boot-app.jar"]