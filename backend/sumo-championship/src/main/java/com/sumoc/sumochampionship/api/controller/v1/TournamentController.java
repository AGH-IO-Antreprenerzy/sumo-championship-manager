package com.sumoc.sumochampionship.api.controller.v1;

import com.sumoc.sumochampionship.api.dto.enrollment.WrestlerEnrollmentDto;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentDetailsResponse;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentDto;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentRequest;
import com.sumoc.sumochampionship.api.dto.tournament.AllTournamentsResponse;
import com.sumoc.sumochampionship.service.TournamentService;
import com.sumoc.sumochampionship.service.WrestlerEnrollmentService;
import com.sumoc.sumochampionship.utils.CsvGeneratorUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/v1/tournament")
public class TournamentController {
    private final TournamentService tournamentService;
    private final WrestlerEnrollmentService wrestlerEnrollmentService;

    @Autowired
    private CsvGeneratorUtil csvGeneratorUtil;

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

    @GetMapping("/exportContestants")
    public ResponseEntity<byte[]> exportContestants(@RequestParam Long tournamentId) {
        if (!this.tournamentService.checkTournamentExist(tournamentId)) {
            return ResponseEntity.badRequest().body(new byte[0]);
        }

        List<WrestlerEnrollmentDto> wrestlerEnrollmentDtos = wrestlerEnrollmentService.getWrestlerEnrollments(tournamentId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "contestants.csv");

        byte[] csvBytes = csvGeneratorUtil.generateCsvBytes(wrestlerEnrollmentDtos);

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }

    @GetMapping("details")
    public ResponseEntity<TournamentDetailsResponse> getTournamentDetails(@RequestParam Long tournamentId){
        TournamentDetailsResponse tournamentDetailsResponse = null;
        try{
            tournamentDetailsResponse = tournamentService.getTournamentDetails(tournamentId);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(tournamentDetailsResponse);
    }
}
