package com.sumoc.sumochampionship.api.controller.v2;

import com.sumoc.sumochampionship.api.dto.category.CategoriesResponse2;
import com.sumoc.sumochampionship.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("api/v2/category")
public class CategoryController2 {
    /**
     * Category Controller made after consultation with client
     * It will enable getting categories to Season with new logic consulted with client
     */

    final private CategoryService categoryService;

    @GetMapping("/to-season")
    public ResponseEntity<CategoriesResponse2> getCategoriesToSeason(
            @RequestParam(required = true, name="season") String season,
            @RequestParam(required = false, defaultValue = "0", name="page") int page,
            @RequestParam(required = false, defaultValue = "100", name = "size") int pageSize){

        return ResponseEntity.ok(categoryService.getAllCategoriesToSeason(season, page, pageSize));
    }

}
