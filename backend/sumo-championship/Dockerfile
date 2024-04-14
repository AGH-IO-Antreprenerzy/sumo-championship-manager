FROM maven:3.8.7-openjdk-18 AS build

WORKDIR /backend

COPY . .

RUN mvn clean install -DskipTests

CMD ["mvn", "exec:java", "-Dexec.mainClass=com.sumoc.sumochampionship.SumoChampionshipApplication"]