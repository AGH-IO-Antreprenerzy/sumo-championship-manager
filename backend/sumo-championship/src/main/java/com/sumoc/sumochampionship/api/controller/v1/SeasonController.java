package com.sumoc.sumochampionship.api.controller.v1;

import com.sumoc.sumochampionship.api.dto.season.SeasonDto;
import com.sumoc.sumochampionship.api.dto.season.SeasonRequest;
import com.sumoc.sumochampionship.api.dto.season.AllSeasonResponse;
import com.sumoc.sumochampionship.api.dto.season.SeasonDetailsResponse;
import com.sumoc.sumochampionship.service.SeasonService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Season controller
 * Implements POST for adding new seasons (and their categories)
 */
@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("api/v1/season")
public class SeasonController {

    private final SeasonService seasonService;
    private final String SEASON_ON_PAGE = "6";

    /*
    This controller should be available only for admin. Therefore, I DO NOT checking user authorities because it should
    be done earlier.
     */
    @PostMapping("/add")
    public ResponseEntity<String> addSeasonWithCategories(@RequestBody SeasonRequest seasonRequest){
        return seasonService.saveSeason(seasonRequest);
    }

    /*
        Get season information like: Name, Start and End Date.
     */
    @GetMapping("/info")
    public ResponseEntity<SeasonDto> getSeasonMainInformation(@RequestParam("name") String name){
        SeasonDto seasonDto = null;
        try {
            seasonDto = seasonService.getSeason(name);
        }
        catch (EntityNotFoundException e){
            return ResponseEntity.badRequest().body(seasonDto);
        }

        return ResponseEntity.ok(seasonDto);

    }

    /*
    Get all seasons information like: name, start, end Date
    The historical parameter is used to control whether historical seasons (those that have ended)
        or those that are in progress should be returned
     */
    @GetMapping("/all")
    public ResponseEntity<AllSeasonResponse> getAllSeasonMainInformation(
            @RequestParam(defaultValue = "0", required = false, name = "page") int page,
            @RequestParam(defaultValue = SEASON_ON_PAGE, required = false, name = "size") int pageSize,
            @RequestParam(required = false, defaultValue = "false", name = "historical") boolean historical){

        AllSeasonResponse allSeasonResponse = seasonService.getAllSeasons(page, pageSize, historical);
        return ResponseEntity.ok(allSeasonResponse);
    }

    /*
    Return all information about specified season: Dates, Tournaments and Categories
     */
    @GetMapping("/details")
    public ResponseEntity<SeasonDetailsResponse> getSeason(@RequestParam(name = "name") String name){
        SeasonDetailsResponse response = null;

        try{
            response = seasonService.getSeasonDetails(name);
        }catch (EntityNotFoundException e){
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

}
