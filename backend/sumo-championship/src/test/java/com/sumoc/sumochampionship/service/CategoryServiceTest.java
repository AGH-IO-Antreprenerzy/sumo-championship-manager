package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.category.CategoryDto2;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    private TournamentRepository tournamentRepository;


    @InjectMocks
    private CategoryService categoryService;


    /*
    Test if method returns correct categories in correct format
     */
    @Test
    public void getTournamentCategories(){
        // Arrange
        final int categoryNo = 5;
        Set<Category> categorySet = new HashSet<>();

        for(int i = 0; i < categoryNo; i++){
            categorySet.add(Category.builder()
                            .name("Junior")
                            .maxWeight(i + 1)
                            .build());
        }

        Tournament tournament = Tournament.builder()
                .categories(categorySet)
                .build();

        when(tournamentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(tournament));

        // Act
        List<CategoryDto2> categories = categoryService.getTournamentCategories(1L);

        // Assert
        Assertions.assertEquals(1, categories.size());
        Assertions.assertEquals(categoryNo, categories.get(0).getWeightsAndGender().size());

    }

}
