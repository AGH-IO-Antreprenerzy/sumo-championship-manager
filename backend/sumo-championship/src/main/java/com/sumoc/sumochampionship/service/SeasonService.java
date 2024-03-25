package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.CategoryDto;
import com.sumoc.sumochampionship.api.dto.SeasonDto;
import com.sumoc.sumochampionship.api.dto.request.CategoryRequest;
import com.sumoc.sumochampionship.api.dto.request.SeasonRequest;
import com.sumoc.sumochampionship.api.dto.response.AllSeasonResponse;
import com.sumoc.sumochampionship.api.dto.response.SeasonDetailsResponse;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.repository.CategoryRepository;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
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

        // Check if season with this id exists in the database
        // TODO: Ask if it is necessary
        if (seasonRepository.findByName(season.getName()) != null){
            return ResponseEntity.badRequest().body("Invalid data. Season with this 'name' has already been created");
        }

        if(!notNullCheck(season) || !notNullCheck(categories)){
            return ResponseEntity.badRequest().body("Invalid data. All parameters can not be null");
        }

        // Check if startDate < endDate and if actualDate < startDate
        if(!checkDate(season.getStartDate(), season.getEndDate())){
            return ResponseEntity.badRequest().body("Invalid data provided. Start of the season should be " +
                    "before the end of the season.");
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

    /*
    Get Season by its name. Name of the Season is unique in the database, so there should not be the problem.
    If there is no Season with this name in db -> throw EntityNotFoundException
     */
    public SeasonDto getSeason(String name) throws EntityNotFoundException{
        Season season = seasonRepository.findByName(name);

        if (season == null){
            throw new EntityNotFoundException("Season with name " + name + " not found");
        }

        return SeasonDto.builder()
                .name(season.getName())
                .start(season.getStartDate())
                .end(season.getEndDate())
                .build();
    }

    public AllSeasonResponse getAllSeasons(int pageNo, int pageSize, boolean historical){
        Sort sort = Sort.by("startDate").descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Season> seasonPage = null;
        // Returns only this Season that has already ended
        if(historical){
            seasonPage = seasonRepository.findSeasonsByEndDateBefore(LocalDate.now(), pageable);
        }
        else{
            seasonPage =  seasonRepository.findSeasonsByEndDateAfter(LocalDate.now(), pageable);
        }

        List<Season> seasons = seasonPage.getContent();

        List<SeasonDto> seasonDtos = seasons.stream().map(SeasonDto::mapToDto).toList();

        return AllSeasonResponse.builder()
                .seasonDtoList(seasonDtos)
                .pageNo(seasonPage.getNumber())
                .pageSize(seasonPage.getSize())
                .totalElements(seasonPage.getTotalElements())
                .totalPages(seasonPage.getTotalPages()).build();
    }


    public SeasonDetailsResponse getSeasonDetails(String name) throws EntityNotFoundException{
        Season season = seasonRepository.findByName(name);

        if (season == null){
            throw new EntityNotFoundException("Season with name " + name + " not found");
        }
        List<Category> categories = categoryRepository.findCategoriesBySeason(season);
        List<CategoryDto> categoriesdto = categories.stream().map(CategoryDto::toDto).toList();

        return SeasonDetailsResponse.builder()
                .start(season.getStartDate())
                .end(season.getEndDate())
                .categories(categoriesdto)
                .name(season.getName())
                .build();
    }

    /*
    Test if 'season.setCategories() will properly connect Categories with Seasons'
     */
    private boolean saveSeason(Season season, Set<Category> categories){
        try {
            seasonRepository.save(season);
            for (Category category: categories){
                category.setSeason(season);
                categoryRepository.save(category);
            }

        }catch (DataAccessException ex){
            return false;
        }
        return true;
    }

    private boolean notNullCheck(Season season){
        return season.getName() != null && season.getStartDate() != null && season.getEndDate() != null;
    }

    private boolean notNullCheck(Set<Category> categories){
        for(Category category : categories){
           if (category.getMinWeight() == null || category.getMinAge() == null || category.getMaxAge() == null ||
           category.getGender() == null || category.getMaxWeight() == null) return false;
        }
        return true;
    }


    private boolean checkCategories(Set<Category> categories){
        for (Category category: categories){
            if(!(category.getMinAge() < category.getMaxAge())) return false;
            if(!(category.getMinAge() > 0)) return false;

            if(!(category.getMinWeight() < category.getMaxWeight())) return false;
            if(!(category.getMinWeight() > 0)) return false;
        }
        return true;
    }

    private boolean checkDate(LocalDate start, LocalDate end){
        return start.isBefore(end);
    }
    private Season getSeasonFromRequest(SeasonRequest seasonRequest){
        return Season.builder()
                .name(seasonRequest.getName())
                .startDate(seasonRequest.getStartDate())
                .endDate(seasonRequest.getEndDate())
                .build();
    }

    private Set<Category> getCategoriesFromRequest(SeasonRequest seasonRequest){
        Set<CategoryRequest> categoryRequests = seasonRequest.getCategories();

        return categoryRequests.stream().map(CategoryRequest::fromRequest).collect(Collectors.toSet());

    }


}
