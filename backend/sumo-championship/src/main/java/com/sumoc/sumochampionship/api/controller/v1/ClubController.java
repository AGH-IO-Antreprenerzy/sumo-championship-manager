package com.sumoc.sumochampionship.api.controller.v1;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sumoc.sumochampionship.api.dto.club.ClubRequest;
import com.sumoc.sumochampionship.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("api/v1/club")
public class ClubController {
    private final ClubService clubService;

    @PostMapping("/add")
    public ResponseEntity<JsonNode> addClub(@RequestBody ClubRequest clubRequest){
        String response = clubService.addClub(clubRequest);
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode json = objectMapper.createObjectNode();
        json.put("response", response);

        if (response.startsWith("Error!")){
            return ResponseEntity.badRequest().body(json);
        }
        return ResponseEntity.ok(json);
    }
}
