package com.sumoc.sumochampionship.api.controller.v1;

import com.sumoc.sumochampionship.db.season.Country;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
    Controller that returns all Countries available in our system.
    For now Countries are stored in enum, but they should be persisted in database

 */
@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("api/v1/country")
public class CountryController {

    @GetMapping("/all")
    public ResponseEntity<List<String>> getAllCountries(){
        return ResponseEntity.ok(Country.getAllCountries());
    }

}
