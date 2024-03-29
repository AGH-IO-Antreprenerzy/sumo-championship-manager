package com.sumoc.sumochampionship.api.controller;

import com.sumoc.sumochampionship.api.dto.response.WrestlersResponse;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.service.WrestlerService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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


}
