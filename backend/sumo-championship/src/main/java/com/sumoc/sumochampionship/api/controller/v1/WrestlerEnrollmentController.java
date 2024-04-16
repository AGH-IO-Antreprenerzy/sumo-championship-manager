package com.sumoc.sumochampionship.api.controller.v1;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sumoc.sumochampionship.api.dto.wrestlerenrollment.WrestlerEnrollmentRequest;
import com.sumoc.sumochampionship.api.dto.wrestlerenrollment.WrestlerEnrollmentResponse;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.service.WrestlerEnrollmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/v1/wrestler-enrollment")
public class WrestlerEnrollmentController {

    private final WrestlerEnrollmentService wrestlerEnrollmentService;

    @PostMapping("/enroll-wrestlers")
    public ResponseEntity<JsonNode> enrollWrestlers(@RequestBody List<WrestlerEnrollmentRequest> enrollments){
        String response = wrestlerEnrollmentService.enrollWrestlers(enrollments);
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode json = objectMapper.createObjectNode();
        json.put("response", response);

        if (response.startsWith("Error!")){
            return ResponseEntity.badRequest().body(json);
        }
        return ResponseEntity.ok(json);
    }

    @GetMapping("/to-tournament")
    public ResponseEntity<WrestlerEnrollmentResponse> getWrestlersToTournament(
            @AuthenticationPrincipal WebsiteUser websiteUser,
            @RequestParam Long tournamentId){

        WrestlerEnrollmentResponse wer = null;
        try{
            wer = wrestlerEnrollmentService.getWrestlerToTrainerAndTournament(websiteUser, tournamentId);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(wer);
    }

    @GetMapping("/all/to-tournament")
    public ResponseEntity<WrestlerEnrollmentResponse> getAllWrestlersToTournament(@RequestParam Long tournamentId){
        WrestlerEnrollmentResponse wer = null;
        try{
            wer = wrestlerEnrollmentService.getAllWrestlersToTournament(tournamentId);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(wer);
    }


}
