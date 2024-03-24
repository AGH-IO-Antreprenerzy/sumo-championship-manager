package com.sumoc.sumochampionship.api.controller;

import com.sumoc.sumochampionship.api.dto.TournamentDto;
import com.sumoc.sumochampionship.api.dto.request.TournamentRequest;
import com.sumoc.sumochampionship.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/v1/tournament")
public class TournamentController {
    private final TournamentService tournamentService;

    @PostMapping("/add")
    public ResponseEntity<String> addTournament(@RequestBody TournamentRequest tournamentRequest){
        return tournamentService.saveTournament(tournamentRequest);
    }

    @GetMapping("/find")
    public ResponseEntity<TournamentDto> findTournament(@RequestParam Integer id){
        TournamentDto tournamentDto = null;
        try{
            tournamentDto = tournamentService.getTournament(id);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(tournamentDto);
        }
        return ResponseEntity.ok(tournamentDto);
    }
}
