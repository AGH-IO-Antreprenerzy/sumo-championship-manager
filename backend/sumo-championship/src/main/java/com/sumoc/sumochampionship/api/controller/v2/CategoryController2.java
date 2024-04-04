package com.sumoc.sumochampionship.api.controller.v2;

import com.sumoc.sumochampionship.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

//    @GetMapping("/to-season")
//    public ResponseEntity<List<CategoryController2>> getCategoriesToSeason(String seasonName){
//
//    }

}
