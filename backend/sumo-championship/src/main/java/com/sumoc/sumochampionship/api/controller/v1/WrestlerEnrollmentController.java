package com.sumoc.sumochampionship.api.controller.v1;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sumoc.sumochampionship.api.dto.wrestlerenrollment.WrestlerEnrollmentRequest;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import com.sumoc.sumochampionship.service.WrestlerEnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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


}
