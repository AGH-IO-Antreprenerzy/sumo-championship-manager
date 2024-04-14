package com.sumoc.sumochampionship.api.controller.v1;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlerDetails;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlerRequest;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersDto;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersResponse;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.service.WrestlerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller responsible for manipulating request given by Website Users
 */
@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/v1/wrestler")
public class WrestlerController {
    private final int WRESTLERS_ON_PAGE = 20;
    private final WrestlerService wrestlerService;

    /*
    Collect all wrestlers that are connected to WebsiteUser
    Supports Pagination by "{url}?page=1"
     */
    @GetMapping("/all")
    public ResponseEntity<WrestlersResponse> getWrestlers(@AuthenticationPrincipal WebsiteUser user,
                                                          @RequestParam(defaultValue = "0", required = false) int page){

        Pageable pageable = PageRequest.of(page, WRESTLERS_ON_PAGE);

        return ResponseEntity.ok(wrestlerService.findAllInClubs(user, pageable));

    }

    @PostMapping("/add")
    public ResponseEntity<JsonNode> addWrestler(@RequestBody WrestlerRequest wrestlerRequest){
        String response = wrestlerService.addWrestler(wrestlerRequest);
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode json = objectMapper.createObjectNode();
        json.put("response", response);

        if (response.startsWith("Error!")){
            return ResponseEntity.badRequest().body(json);
        }
        return ResponseEntity.ok(json);
    }
    // TODO: What about user authorities. Only user with proper authorities can affect the wrestlers
    @DeleteMapping("/delete")
    public ResponseEntity<JsonNode> deleteWrestler(@RequestParam Long id){
        String response = wrestlerService.deleteWrestler(id);
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode json = objectMapper.createObjectNode();
        json.put("response", response);

        if (response.startsWith("Error!")){
            return ResponseEntity.badRequest().body(json);
        }
        return ResponseEntity.ok(json);
    }

    @GetMapping("/details")
    public ResponseEntity<WrestlerDetails> getWrestlerDetails(Long id){
        WrestlerDetails wrestlerDetails;
        try{
            wrestlerDetails = wrestlerService.getWrestlerDetails(id);
        }catch (EntityNotFoundException e){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(wrestlerDetails);
    }

    @PutMapping("/modify")
    public ResponseEntity<JsonNode> modifyWrestler(@RequestParam Long id,
                                                   @RequestBody WrestlerRequest wrestlerRequest){
        String response = wrestlerService.modifyWrestler(id, wrestlerRequest);
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode json = objectMapper.createObjectNode();
        json.put("response", response);

        if (response.startsWith("Error!")){
            return ResponseEntity.badRequest().body(json);
        }
        return ResponseEntity.ok(json);
    }

    @GetMapping("/fit-to-category")
    public ResponseEntity<List<WrestlersDto>> filterWrestlerToClub(
            @AuthenticationPrincipal WebsiteUser user,
            @RequestParam(name = "categoryId") Long categoryId){

        // User is not logged
        if (user == null){
            return ResponseEntity.status(401).build();
        }

        List<WrestlersDto> response = null;
        try{
            response = wrestlerService.filterWrestler(user, categoryId);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

}
