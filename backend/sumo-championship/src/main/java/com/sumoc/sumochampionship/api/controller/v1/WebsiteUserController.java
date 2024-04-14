package com.sumoc.sumochampionship.api.controller.v1;

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
    public ResponseEntity<String> addWebsiteUser(@RequestBody WebsiteUserRequest websiteUserRequest){
        return websiteUserService.addWebsiteUser(websiteUserRequest);
    }
}
