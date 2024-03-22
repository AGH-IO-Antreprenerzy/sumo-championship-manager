package com.sumoc.sumochampionship.api.controller;

import com.sumoc.sumochampionship.api.dto.response.CategoriesResponse;
import com.sumoc.sumochampionship.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/category")
public class CategoryController {

    private final String SEASON_CATEGORIES_PER_PAGE = "10";
    private final CategoryService categoryService;
    /*
    URL for getting all categories, which is included in one season
     */
    @GetMapping("/to-season")
    public ResponseEntity<CategoriesResponse> getSeasonCategories(
            @RequestParam(required = true, name="season") String season,
            @RequestParam(required = false, defaultValue = "0", name="page") int page,
            @RequestParam(required = false, defaultValue = SEASON_CATEGORIES_PER_PAGE, name = "size") int pageSize){

        return ResponseEntity.ok(categoryService.getSeasonCategories(season, page, pageSize));

    }


}
