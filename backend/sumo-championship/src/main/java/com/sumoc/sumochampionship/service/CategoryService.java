package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.category.CategoriesResponse2;
import com.sumoc.sumochampionship.api.dto.category.CategoryDto;
import com.sumoc.sumochampionship.api.dto.category.CategoriesResponse;
import com.sumoc.sumochampionship.api.dto.category.CategoryDto2;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.repository.CategoryRepository;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final TournamentRepository tournamentRepository;

    /*
    Get categories that belong to Season.
    Support Pagination
    Does not support Sorting (because I think there is no need to sort categories ?)
    I can provide it in the future (COULD)
     */
    public CategoriesResponse getSeasonCategories(String name, int page, int pageSize){
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Category> categoryPage = categoryRepository.findCategoriesBySeasonName(name, pageable);

        List<Category> categories = categoryPage.getContent();

        List<CategoryDto> categoriesDto = categories.stream().map(CategoryDto::toDto).toList();

        return CategoriesResponse.builder()
                .categories(categoriesDto)
                .pageNo(categoryPage.getNumber())
                .pageSize(categoryPage.getSize())
                .totalElements(categoryPage.getTotalElements())
                .totalPages(categoryPage.getTotalPages()).build();

    }

    public List<CategoryDto> getAllCategories(){
        List<Category> categories = categoryRepository.findAll();

        return categories.stream().map(CategoryDto::toDto).toList();

    }

    public List<CategoryDto2> getTournamentCategories(Long tournamentId){

        Optional<Tournament> tournamentOptional = tournamentRepository.findById(tournamentId);
        if (tournamentOptional.isEmpty()){
            throw new EntityNotFoundException("Tournament with id = " + tournamentId + " does not exists");
        }

        List<Category> categories = tournamentOptional.get().getCategories().stream().toList();

        return CategoryDto2.mapListToDto(categories);
    }

    //-----------------------------API VERSION 2-----------------------------//
    /*
    Get Categories to all Season in new format (Swagger UI)
     */
    public CategoriesResponse2 getAllCategoriesToSeason(String name, int page, int pageSize){
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Category> categoryPage = categoryRepository.findCategoriesBySeasonName(name, pageable);

        List<Category> categories = categoryPage.getContent();

        List<CategoryDto2> categoriesDto = CategoryDto2.mapListToDto(categories);

        return CategoriesResponse2.builder()
                .categories(categoriesDto)
                .pageNo(categoryPage.getNumber())
                .pageSize(categoryPage.getSize())
                .totalElements(categoryPage.getTotalElements())
                .totalPages(categoryPage.getTotalPages()).build();

    }


}
