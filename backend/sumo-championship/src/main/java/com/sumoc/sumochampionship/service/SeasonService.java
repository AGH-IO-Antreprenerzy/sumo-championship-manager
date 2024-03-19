package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.CategoryDto;
import com.sumoc.sumochampionship.api.dto.request.SeasonRequest;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.repository.CategoryRepository;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SeasonService {

    private final SeasonRepository seasonRepository;

    private final CategoryRepository categoryRepository;

    /*
    Check if the season is correct (TODO: Discuss when the season can not be saved !)
    If the season meet's all requirements return 'Http 202'
    Else return appropriate status code
     */
    public ResponseEntity<String> saveSeason(SeasonRequest seasonRequest){
        Season season = getSeasonFromRequest(seasonRequest);
        Set<Category> categories = getCategoriesFromRequest(seasonRequest);

        // Check if startDate < endDate and if actualDate < startDate
        if(!checkDate(season.getStart(), season.getEnd())){
            return ResponseEntity.badRequest().body("Invalid data provided. Start of the season should be " +
                    "before the end of the season. Moreover start of the season should be in the future");
        }

        // Check Age constraints
        if(!checkCategories(categories)){
            return ResponseEntity.badRequest().body("Invalid data provided. All categories should:\n" +
                    "* have a minimum weight less than the maximum weight.\n * have a minimum weight greater than 0\n" +
                    "* have a minimum age less than the maximum age.\n * have a minimum age greater than 0\n ");
        }


        // save Season to db
        if(!saveSeason(season, categories)){
            return ResponseEntity.internalServerError().body("Server can not save season due to problem " +
                    "with database connection");
        }

        return ResponseEntity.ok().body("Season and Categories saved");
    }

    /* TODO: Relation between season and categories is Many to Many. It means that user may use previously created
        categories. Therefore before saving Category from Request, I should check if the Category is not exists
        This MUST be tested
        Second option: Redo db connection from (Many to many) to One to Many (One Season has got many categories)

     */
    private boolean saveSeason(Season season, Set<Category> categories){
        try {
            categoryRepository.saveAll(categories);
            season.setCategories(categories);
            seasonRepository.save(season);
        }catch (DataAccessException ex){
            return false;
        }
        return true;
    }


    private boolean checkCategories(Set<Category> categories){
        for (Category category: categories){
            if(!(category.getMinAge() < category.getMaxAge())) return false;
            if(!(category.getMaxAge() > 0)) return false;

            if(!(category.getMinWeight() < category.getMaxWeight())) return false;
            if(!(category.getMinWeight() > 0)) return false;
        }
        return true;
    }

    private boolean checkDate(LocalDate start, LocalDate end){
        return start.isBefore(end) && start.isAfter(LocalDate.now());
    }
    private Season getSeasonFromRequest(SeasonRequest seasonRequest){
        return Season.builder()
                .name(seasonRequest.getName())
                .start(seasonRequest.getStartDate())
                .end(seasonRequest.getEndDate())
                .build();
    }

    private Set<Category> getCategoriesFromRequest(SeasonRequest seasonRequest){
        Set<CategoryDto> categoryDtos = seasonRequest.getCategories();

        return categoryDtos.stream().map(this::fromDto).collect(Collectors.toSet());

    }

    private Category fromDto(CategoryDto dto){
        return Category.builder()
                .name(dto.getName())
                .minAge(dto.getMinAge())
                .maxAge(dto.getMaxAge())
                .minWeight(dto.getMinWeight())
                .maxWeight(dto.getMaxWeight())
                .gender(dto.getGender())
                .build();
    }

}
