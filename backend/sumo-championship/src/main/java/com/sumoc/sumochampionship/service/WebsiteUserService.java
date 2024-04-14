package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.websiteuser.WebsiteUserRequest;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.UserRole;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.season.Country;
import com.sumoc.sumochampionship.repository.ClubRepository;
import com.sumoc.sumochampionship.repository.WebsiteUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;


@AllArgsConstructor
@Service
public class WebsiteUserService {
    private final WebsiteUserRepository websiteUserRepository;
    private final ClubRepository clubRepository;
    private PasswordEncoder passwordEncoder;


    public ResponseEntity<String> addWebsiteUser(WebsiteUserRequest websiteUserRequest) {
        WebsiteUser websiteUser = getWebsiteUserFromRequest(websiteUserRequest);
        String clubName = websiteUserRequest.getClub();
        Country country = websiteUserRequest.getCountry();

        if ((country == null || clubName == null) && websiteUser.getUserRole() != UserRole.ADMIN) {
            return ResponseEntity.badRequest().body("You need to provide club and country for trainer");
        }

        if (websiteUserRepository.findByEmail(websiteUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }

        if (!saveWebsiteUser(websiteUser)){
            return ResponseEntity.internalServerError().body("Server cannot save user due to problem " +
                    "with database connection");
        }

        if (websiteUser.getUserRole() != UserRole.ADMIN && !addClubOwner(websiteUser, clubName, country)){
            return ResponseEntity.internalServerError().body("Server cannot save club owner due to problem " +
                    "with database connection");
        }

        return ResponseEntity.ok().body("User added");
    }


    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return websiteUserRepository.findByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
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


    protected boolean addClubOwner(WebsiteUser websiteUser, String clubName, Country country) {
        Optional<Club> club = clubRepository.findByName(clubName);
        if (club.isEmpty()) {
            System.out.println(Club.builder().name(clubName).nationality(country).build());
            try {
                clubRepository.save(Club.builder().name(clubName).nationality(country).build());
            } catch (DataAccessException ex) {
                return false;
            }
        }
        Club ownedClub = Objects.requireNonNull(clubRepository.findByName(clubName).orElse(null));
        try {
            Set<Club> ownedClubs = websiteUser.getOwnedClubs();
            if (ownedClubs == null) {
                ownedClubs = new HashSet<>();
            }
            ownedClubs.add(ownedClub);
            websiteUser.setOwnedClubs(ownedClubs);
            websiteUserRepository.save(websiteUser);
        } catch (DataAccessException ex){
            return false;
        }
        return true;
    }
}
