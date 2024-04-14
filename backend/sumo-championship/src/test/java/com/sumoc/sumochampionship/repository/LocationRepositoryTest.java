package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Location;
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
class LocationRepositoryTest {

    @Autowired
    private LocationRepository locationRepository;

    @BeforeEach
    void setUp() {
        Location location01 = Location.builder()
                .country("Japan")
                .build();

        Location location02 = Location.builder()
                .country("Mongolia")
                .build();

        locationRepository.save(location01);
        locationRepository.save(location02);
    }

    @Test
    void findById() {
        Location location = locationRepository.findById(1);
        assertNotNull(location);
        assertEquals("Japan", location.getCountry());

        location = locationRepository.findById(2);
        assertNotNull(location);
        assertEquals("Mongolia", location.getCountry());
    }
}