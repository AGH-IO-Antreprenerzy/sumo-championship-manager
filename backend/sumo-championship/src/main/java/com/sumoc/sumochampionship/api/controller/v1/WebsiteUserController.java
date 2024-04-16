package com.sumoc.sumochampionship.api.controller.v1;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sumoc.sumochampionship.api.dto.websiteuser.WebsiteUserRequest;
import com.sumoc.sumochampionship.service.WebsiteUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("api/v1/website-user")
public class WebsiteUserController {
    private final WebsiteUserService websiteUserService;

    @PostMapping("/add")
    public ResponseEntity<JsonNode> addWebsiteUser(@RequestBody WebsiteUserRequest websiteUserRequest){
        String response = websiteUserService.addWebsiteUser(websiteUserRequest).getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode json = objectMapper.createObjectNode();
        json.put("response", response);

        return ResponseEntity.ok(json);
    }
}
