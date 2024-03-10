# Sumo Championship Manager

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=Spring&logoColor=white) ![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)


### About
System for sumo championship management. Created as a project for Software Engineering course at AGH University of Science and Technology (Computer Science studies).


### Requirements

- Java 17
- Maven


### Build and run

Basic run with Maven (without tests):

```sh
mvn clean install -DskipTests exec:java -Dexec.mainClass=com.sumoc.sumochampionship.SumoChampionshipApplication -DSUMO_DB_URL="<url>" -DSUMO_PASSWORD="<password>" -DSUMO_USERNAME="<username>"
```

*Caution: You need to set the variables!*


### Authors
- [Antoni Wójcik](https://github.com/AntuanW)
- [Arkadiusz Mincberger](https://github.com/ArkadiuszMin)
- [Jakub Pawlina](https://github.com/jakubpawlina)
- [Magdalena Cebula](https://github.com/meg3758)
- [Michał Skałka](https://github.com/Skalakid)
- [Szymon Twardosz](https://github.com/szymont18)
