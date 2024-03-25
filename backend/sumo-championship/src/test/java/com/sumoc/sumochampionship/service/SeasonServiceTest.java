package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.CategoryDto;
import com.sumoc.sumochampionship.api.dto.SeasonDto;
import com.sumoc.sumochampionship.api.dto.request.CategoryRequest;
import com.sumoc.sumochampionship.api.dto.request.SeasonRequest;
import com.sumoc.sumochampionship.api.dto.response.AllSeasonResponse;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.repository.CategoryRepository;
import com.sumoc.sumochampionship.repository.CategoryRepositoryTest;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SeasonServiceTest {

    @Mock
    private SeasonRepository seasonRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private SeasonService seasonService;

    /*
     * Test if good seasons is saved and bad seasons is rejected
     */
    @Test
    public void saveSeasons(){
        // Arrange
        when(seasonRepository.save(Mockito.any())).thenReturn(new Season());
        when(categoryRepository.save(Mockito.any())).thenReturn(new Category());
        Set<CategoryRequest> goodCategorySet = Set.of(
                CategoryRequest.builder().name("Junior").minAge(13).maxAge(14).minWeight(50).maxWeight(60).gender(Gender.MALE).build(),
                CategoryRequest.builder().name("Senior").minAge(24).maxAge(50).minWeight(50).maxWeight(60).gender(Gender.MALE).build()
        );

        Set<CategoryRequest> wrongCategorySet1 = Set.of(
                // Wrong Age
                CategoryRequest.builder().name("Junior").minAge(15).maxAge(14).minWeight(50).maxWeight(60).gender(Gender.MALE).build(),
                CategoryRequest.builder().name("Senior").minAge(24).maxAge(50).minWeight(50).maxWeight(60).gender(Gender.MALE).build()
                );

        Set<CategoryRequest> wrongCategorySet2 = Set.of(
                // Wrong Weight
                CategoryRequest.builder().name("Junior").minAge(13).maxAge(14).minWeight(50).maxWeight(60).gender(Gender.MALE).build(),
                CategoryRequest.builder().name("Senior").minAge(24).maxAge(50).minWeight(70).maxWeight(60).gender(Gender.MALE).build()
        );

        Set<CategoryRequest> wrongCategorySet3 = Set.of(
                // Provided to less information (lack of ages)
                CategoryRequest.builder().name("Junior").maxAge(14).minWeight(50).maxWeight(60).gender(Gender.MALE).build(),
                CategoryRequest.builder().name("Senior").minWeight(70).maxWeight(60).gender(Gender.MALE).build()
        );

        SeasonRequest wrongSeasonRequest1 = SeasonRequest.
                builder()
                .name("Spring 2024")
                .startDate(LocalDate.of(2024, 10, 24))
                .endDate(LocalDate.of(2024, 10, 23)) // Wrong date !
                .categories(goodCategorySet)
                .build();

        SeasonRequest wrongSeasonRequest2 = SeasonRequest.
                builder()
                .name("Spring 2024")
                .startDate(LocalDate.of(2024, 10, 24))
                .endDate(LocalDate.of(2024, 10, 29)) // Wrong date !
                .categories(wrongCategorySet1)
                .build();

        SeasonRequest wrongSeasonRequest3 = SeasonRequest.
                builder()
                .name("Spring 2024")
                .startDate(LocalDate.of(2024, 10, 24))
                .endDate(LocalDate.of(2024, 10, 29)) // Wrong date !
                .categories(wrongCategorySet2)
                .build();

        SeasonRequest wrongSeasonRequest4 = SeasonRequest.
                builder()
                .name("Spring 2024")
                .startDate(LocalDate.of(2024, 10, 24))
                .endDate(LocalDate.of(2024, 10, 29)) // Wrong date !
                .categories(wrongCategorySet3)
                .build();

        SeasonRequest goodSeasonRequest = SeasonRequest.
                builder()
                .name("Spring 2024")
                .startDate(LocalDate.of(2024, 10, 24))
                .endDate(LocalDate.of(2024, 10, 29)) // Wrong date !
                .categories(goodCategorySet)
                .build();

        // Act
        ResponseEntity<String> response1 = seasonService.saveSeason(wrongSeasonRequest1);
        ResponseEntity<String> response2 = seasonService.saveSeason(wrongSeasonRequest2);
        ResponseEntity<String> response3 = seasonService.saveSeason(wrongSeasonRequest3);
        ResponseEntity<String> response4 = seasonService.saveSeason(wrongSeasonRequest4);
        ResponseEntity<String> response5 = seasonService.saveSeason(goodSeasonRequest);

        // Assert
        Assertions.assertEquals(HttpStatusCode.valueOf(400), response1.getStatusCode());
        Assertions.assertEquals(HttpStatusCode.valueOf(400), response2.getStatusCode());
        Assertions.assertEquals(HttpStatusCode.valueOf(400), response3.getStatusCode());
        Assertions.assertEquals(HttpStatusCode.valueOf(400), response4.getStatusCode());
        Assertions.assertEquals(HttpStatusCode.valueOf(200), response5.getStatusCode());
    }

    @Test
    public void getSeason(){
        // Arrange
        String seasonName = "Spring 2024";
        Season season = Season.builder()
                .name(seasonName)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(10))
                .build();
        when(seasonRepository.findByName(Mockito.anyString())).thenReturn(season);

        // Act
        SeasonDto seasondto = seasonService.getSeason(seasonName);

        // Assert
        Assertions.assertEquals(seasonName, seasondto.getName());
    }


    @Test
    public void getAllSeasons(){
        // Arrange
        List<Season> actualSeasons = List.of(Season.builder()
                .name("Spring1")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(10))
                .build());
        List<Season> historicalSeason = List.of(Season.builder()
                .name("SpringYearAgo")
                .startDate(LocalDate.of(2021, 10, 24))
                .endDate(LocalDate.of(2022, 10, 24))
                .build());

        int page = 0;
        int pageSize = 10;
        when(seasonRepository.findSeasonsByEndDateAfter(Mockito.any(), Mockito.any()))
                .thenReturn(new PageImpl<>(actualSeasons, PageRequest.of(page, pageSize), actualSeasons.size()));
        when(seasonRepository.findSeasonsByEndDateBefore(Mockito.any(), Mockito.any()))
                .thenReturn(new PageImpl<>(historicalSeason, PageRequest.of(page, pageSize), actualSeasons.size()));

        // Act
        AllSeasonResponse historical = seasonService.getAllSeasons(page, pageSize, true);
        AllSeasonResponse actual = seasonService.getAllSeasons(page, pageSize, false);

        // Assertions
        Assertions.assertEquals(1, historical.getSeasonDtoList().size());
        Assertions.assertEquals(1, actual.getSeasonDtoList().size());
        Assertions.assertEquals("SpringYearAgo", historical.getSeasonDtoList().get(0).getName());
        Assertions.assertEquals("Spring1", actual.getSeasonDtoList().get(0).getName());
    }


}
