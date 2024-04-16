package com.sumoc.sumochampionship.db.people;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class WrestlerTest {

    @Test
    void availableForTournamentCategory() {
        // Arrange
        Wrestler availableWrestler = Wrestler.builder()
                .birthday(LocalDate.of(2002,10,24))
                .build();

        // Act
        boolean available = availableWrestler.availableForTournamentCategory(18,24,
                LocalDate.of(2024, 5, 10));

        boolean notAvailable1 = availableWrestler.availableForTournamentCategory(18, 20,
                LocalDate.of(2024, 5, 10));

        boolean notAvailable2 = availableWrestler.availableForTournamentCategory(18, 24,
                LocalDate.of(2028, 5, 10));

        // Assert
        Assertions.assertTrue(available);
        Assertions.assertFalse(notAvailable1);
        Assertions.assertFalse(notAvailable2);
    }
}