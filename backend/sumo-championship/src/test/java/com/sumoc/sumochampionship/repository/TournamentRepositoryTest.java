package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Tournament;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@TestPropertySource(properties = {
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
class TournamentRepositoryTest {

    @Autowired
    private TournamentRepository tournamentRepository;

    @BeforeEach
    void setUp() {
        Tournament tournament01 = Tournament.builder()
                .name("Tournament 01")
                .build();

        Tournament tournament02 = Tournament.builder()
                .name("Tournament 02")
                .build();

        Tournament tournament03 = Tournament.builder()
                .name("Tournament 03")
                .build();

        tournamentRepository.save(tournament01);
        tournamentRepository.save(tournament02);
        tournamentRepository.save(tournament03);
    }

    @Test
    void findById() {
        Tournament tournament = tournamentRepository.findById(1);
        assertNotNull(tournament);
        assertEquals("Tournament 01", tournament.getName());

        tournament = tournamentRepository.findById(2);
        assertNotNull(tournament);
        assertEquals("Tournament 02", tournament.getName());

        tournament = tournamentRepository.findById(3);
        assertNotNull(tournament);
        assertEquals("Tournament 03", tournament.getName());
    }


}