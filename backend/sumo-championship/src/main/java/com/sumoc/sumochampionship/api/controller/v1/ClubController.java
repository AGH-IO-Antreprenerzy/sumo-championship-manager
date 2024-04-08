package com.sumoc.sumochampionship.api.controller.v1;

import com.sumoc.sumochampionship.api.dto.club.ClubDto;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.service.ClubService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("api/v1/club")
public class ClubController {

    private final ClubService clubService;


    /*
    TODO: Test it after implementing login / register.
    Get All clubs that can be accessed by user (example: Admin may access all clubs)
     */
    @GetMapping("/to-user")
    public ResponseEntity<List<ClubDto>> getClubsToUser(@AuthenticationPrincipal WebsiteUser user){
        return ResponseEntity.ok(clubService.getAllClubsToUser(user));
    }

    /*
    Get club to wrestler
     */
    @GetMapping("/to-wrestler")
    public ResponseEntity<ClubDto> getClubToWrestler(@RequestParam Long wrestlerId){
        ClubDto club = null;

        try{
            club = clubService.getClubToWrestler(wrestlerId);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(club);
    }
}
