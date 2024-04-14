package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.club.ClubRequest;
import com.sumoc.sumochampionship.api.dto.websiteuser.WebsiteUserRequest;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.OwnedClub;
import com.sumoc.sumochampionship.db.people.UserRole;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.repository.ClubRepository;
import com.sumoc.sumochampionship.repository.OwnedClubsRepository;
import com.sumoc.sumochampionship.repository.WebsiteUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@AllArgsConstructor
@Service
public class WebsiteUserService {
    private final WebsiteUserRepository websiteUserRepository;
    private final ClubRepository clubRepository;
    private final OwnedClubsRepository ownedClubsRepository;
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<String> addWebsiteUser(WebsiteUserRequest websiteUserRequest) {
        WebsiteUser websiteUser = getWebsiteUserFromRequest(websiteUserRequest);
        String clubName = websiteUserRequest.getClub();
        String countryName = websiteUserRequest.getCountry();

        if ((countryName == null || clubName == null) && websiteUser.getUserRole() != UserRole.ADMIN) {
            return ResponseEntity.badRequest().body("You need to provide club and country for trainer");
        }

        if (websiteUserRepository.findByEmail(websiteUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }

        if (!saveWebsiteUser(websiteUser)){
            return ResponseEntity.internalServerError().body("Server cannot save user due to problem " +
                    "with database connection");
        }

        if (websiteUser.getUserRole() != UserRole.ADMIN && !addClubOwner(websiteUser, clubName, countryName)){
            return ResponseEntity.internalServerError().body("Server cannot save club owner due to problem " +
                    "with database connection");
        }

        return ResponseEntity.ok().body("User added");
    }

    private WebsiteUser getWebsiteUserFromRequest(WebsiteUserRequest websiteUserRequest) {
        return WebsiteUser.builder()
                .email(websiteUserRequest.getEmail())
                .firstname(websiteUserRequest.getFirstname())
                .lastname(websiteUserRequest.getLastname())
                .password(passwordEncoder.encode(websiteUserRequest.getPassword()))
                .userRole(websiteUserRequest.getUserRole())
                .build();
    }

    private boolean saveWebsiteUser(WebsiteUser websiteUser) {
        try {
            websiteUserRepository.save(websiteUser);

        } catch (DataAccessException ex){
            return false;
        }
        return true;
    }

    private boolean addClubOwner(WebsiteUser websiteUser, String clubName, String countryName) {
        Optional<Club> club = clubRepository.findByName(clubName);
        if (club.isEmpty()) {
            System.out.println(Club.builder().name(clubName).nationality(countryName).build());
            try {
                clubRepository.save(Club.builder().name(clubName).nationality(countryName).build());
            } catch (DataAccessException ex) {
                return false;
            }
        }
        Long clubId = Objects.requireNonNull(clubRepository.findByName(clubName).orElse(null)).getId();
        try {
            ownedClubsRepository.save(OwnedClub.builder().club_id(clubId).trainer_id(websiteUser.getId()).build());
        } catch (DataAccessException ex){
            return false;
        }
        return true;
    }
}
