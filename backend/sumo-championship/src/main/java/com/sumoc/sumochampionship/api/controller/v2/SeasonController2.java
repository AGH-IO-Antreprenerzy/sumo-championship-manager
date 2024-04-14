package com.sumoc.sumochampionship.api.controller.v2;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sumoc.sumochampionship.api.dto.season.SeasonDetailsResponse;
import com.sumoc.sumochampionship.api.dto.season.SeasonDetailsResponse2;
import com.sumoc.sumochampionship.api.dto.season.SeasonRequest2;
import com.sumoc.sumochampionship.service.SeasonService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("api/v2/season")
public class SeasonController2 {
    /**
     * Season Controller made after consultation with client
     * It will enable creating Season with new logic for Categories
     */

    private final SeasonService seasonService;


    @PostMapping("/add")
    public ResponseEntity<JsonNode> addSeason(@RequestBody SeasonRequest2 seasonRequest){
        System.out.println("Strat Adding Season");
        String response = seasonService.saveSeason(seasonRequest);
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode json = objectMapper.createObjectNode();
        json.put("response", response);

        if (response.startsWith("Error!")){
            return ResponseEntity.badRequest().body(json);
        }
        return ResponseEntity.ok(json);
    }

    @GetMapping("/details")
    public ResponseEntity<SeasonDetailsResponse2> getSeason(@RequestParam(name = "name") String name){
        SeasonDetailsResponse2 response = null;

        try{
            response = seasonService.getSeasonDetails2(name);
        }catch (EntityNotFoundException e){
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
}
