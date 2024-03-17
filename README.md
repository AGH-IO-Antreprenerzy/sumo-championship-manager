# Sumo Championship Manager

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=Spring&logoColor=white) ![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)


### About
System for sumo championship management. Created as a project for Software Engineering course at AGH University of Science and Technology (Computer Science studies).


### Requirements

- Java 17
- Maven


### Build and run

#### Backend

Basic run with Maven (without tests):

```sh
mvn clean install -DskipTests exec:java -Dexec.mainClass=com.sumoc.sumochampionship.SumoChampionshipApplication -DSUMO_DB_URL="<url>" -DSUMO_PASSWORD="<password>" -DSUMO_USERNAME="<username>"
```

*Caution: You need to set the variables!*

#### Frontend

1. [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable):
```sh
npm install --global yarn
```

2. Enter `frontend/sumo-championship` directory and run:
```sh
yarn install
```

3. Run the frontend app:
```sh
yarn start
```

### Authors
- [Antoni Wójcik](https://github.com/AntuanW)
- [Arkadiusz Mincberger](https://github.com/ArkadiuszMin)
- [Jakub Pawlina](https://github.com/jakubpawlina)
- [Magdalena Cebula](https://github.com/meg3758)
- [Michał Skałka](https://github.com/Skalakid)
- [Szymon Twardosz](https://github.com/szymont18)

## DEFINITION OF DONE

1. **Działa zgodnie z założeniami / spełnia kryteria akceptacyjne**
   - Jeżeli w trakcie robienia taska okaże się, że coś musi/powinno być zrobione inaczej, to:
     - Konsultacja PO (obowiązkowa) odnośnie zmiany
     - Konsultacja z teamem/grupą w zależności od wielkości zmiany
     - Info w komentarzu/nowy task zależności od wielkości zmiany

2. **Code Review.**
   - 1 osoba, a w razie potrzeby (big task/kontrowersje) 2 osoby

3. **Testy - jak są, to przechodzi**
   - A co do tego, czy powinny być:
     - Front - Jak jest jakaś grubsza logika
     - Back - Testy dla story, jeden integracyjny

4. **Nie wybucha aplikacja**
   - Bez QA sprawdzenia
   - Ten, kto pisze feature'a, powinien sprawdzić, czy nic nie wybuchło
   - Reviewer nie sprawdza tego
   - W momencie zauważenia, że coś wybuchło, reporter zgłasza, ale zajmuje się osobą poczuwającą się do odpowiedzialności (ten, kto robił w rejonie, gdzie wybuchło)

5. **Stan taska zgadza się z jego kolumną na Jirze (szczególnie przy merge'u, ale cały czas ma się zgadzać)**
