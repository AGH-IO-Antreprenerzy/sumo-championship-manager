package com.sumoc.sumochampionship.api.controller.v1;

import com.sumoc.sumochampionship.api.dto.tournament.TournamentDto;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentRequest;
import com.sumoc.sumochampionship.api.dto.tournament.AllTournamentsResponse;
import com.sumoc.sumochampionship.service.TournamentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/to-season")
    public ResponseEntity<List<TournamentDto>> getAllTournaments(@RequestParam String name){
        List<TournamentDto> response=null;
        try{
           response = tournamentService.getAllTournamentsToSeason(name);
        }catch (EntityNotFoundException e){
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<AllTournamentsResponse> getAllTournaments(
            @RequestParam(defaultValue = "0", required = false, name = "page") int page,
            @RequestParam(defaultValue = "10", required = false, name = "pageSize") int pageSize,
            @RequestParam(defaultValue = "false", required = false, name = "onlyActive") boolean onlyActive
    ){
        AllTournamentsResponse response = tournamentService.getAllTournaments(page, pageSize, onlyActive);
        return ResponseEntity.ok(response);
    }
}
