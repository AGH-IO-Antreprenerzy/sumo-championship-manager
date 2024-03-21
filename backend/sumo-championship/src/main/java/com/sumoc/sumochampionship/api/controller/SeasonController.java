package com.sumoc.sumochampionship.api.controller;

import com.sumoc.sumochampionship.api.dto.request.SeasonRequest;
import com.sumoc.sumochampionship.service.SeasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Season controller
 * Implements POST for adding new seasons (and their categories)
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/season")
public class SeasonController {

    private final SeasonService seasonService;

    /*
    This controller should be available only for admin. Therefore, I DO NOT checking user authorities because it should
    be done earlier.
     */
    @PostMapping("/add")
    public ResponseEntity<String> addSeasonWithCategories(@RequestBody SeasonRequest seasonRequest){
        return seasonService.saveSeason(seasonRequest);
    }

}
