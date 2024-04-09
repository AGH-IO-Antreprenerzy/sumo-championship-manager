package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.season.Category;
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
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@TestPropertySource(properties = {
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
public class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SeasonRepository seasonRepository;
    private final String seasonName = "Spring 2024";

    @BeforeEach
    public void context(){
        Season season = Season.builder()
                .name(seasonName)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(1))
                .build();
        List<Category> categories = List.of(
                Category.builder().name("Junior").minAge(13).maxAge(14).minWeight(45).maxWeight(65).gender(Gender.FEMALE).season(season).build(),
                Category.builder().name("Senior").minAge(24).maxAge(90).minWeight(60).maxWeight(125).gender(Gender.FEMALE).season(season).build()
        );
        seasonRepository.save(season);
        categoryRepository.saveAll(categories);

        Category wrong = Category.builder().name("Junior1").minAge(13).maxAge(14).minWeight(45).maxWeight(65).gender(Gender.FEMALE).build();
        categoryRepository.save(wrong);
    }

    @Test
    public void findCategoriesBySeasonName(){
        // Act
        Pageable pageable = PageRequest.of(0, 10);
        Page<Category> categoryPage = categoryRepository.findCategoriesBySeasonName(seasonName, pageable);
        List<Category> categories = categoryPage.getContent();

        // Assert
        Assertions.assertEquals(2, categories.size());
        Assertions.assertEquals(seasonName, categories.get(0).getSeason().getName());
        Assertions.assertEquals(seasonName, categories.get(1).getSeason().getName());
        Assertions.assertEquals("Junior", categories.get(0).getName());
        Assertions.assertEquals("Senior", categories.get(1).getName());
    }

}
