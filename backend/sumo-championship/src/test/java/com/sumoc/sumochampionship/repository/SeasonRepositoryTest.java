package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Season;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class SeasonRepositoryTest {

    @Autowired
    private SeasonRepository seasonRepository;



    @Test
    public void findSeasonsByEndBefore(){
        // Act
        Sort sort = Sort.by("startDate").descending();
        Pageable pageable = PageRequest.of(0, 10, sort);
        Page<Season> seasonPage = seasonRepository.findSeasonsByEndDateBefore(LocalDate.now(), pageable);
        List<Season> seasons = seasonPage.getContent();

        // Assertions
        Assertions.assertEquals(1, seasons.size());
        Assertions.assertEquals("2023", seasons.get(0).getName());
    }

    @Test
    public void findSeasonsByEndDateAfter(){
        // Act
        Sort sort = Sort.by("startDate").descending();
        Pageable pageable = PageRequest.of(0, 10, sort);
        Page<Season> seasonPage = seasonRepository.findSeasonsByEndDateAfter(LocalDate.now(), pageable);
        List<Season> seasons = seasonPage.getContent();

        // Assertions
        Assertions.assertEquals(2, seasons.size());
        Assertions.assertEquals("2024", seasons.get(0).getName());
        Assertions.assertEquals("2024-2", seasons.get(1).getName());
    }

    @BeforeEach
    public void context(){
        Season season2023 = Season.builder()
                .name("2023")
                .startDate(LocalDate.of(2023, 10, 24))
                .endDate(LocalDate.of(2023, 11, 24))
                .build();

        Season season2024 = Season.builder()
                .name("2024")
                .startDate(LocalDate.now().plusDays(20))
                .endDate(LocalDate.now().plusDays(40))
                .build();

        Season now = Season.builder()
                .name("2024-2")
                .startDate(LocalDate.now().minusDays(10))
                .endDate(LocalDate.now().plusDays(10))
                .build();

        seasonRepository.save(season2023);
        seasonRepository.save(season2024);
        seasonRepository.save(now);

    }
}
