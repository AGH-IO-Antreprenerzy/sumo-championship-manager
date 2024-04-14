package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.websiteuser.WebsiteUserRequest;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.repository.WebsiteUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class WebsiteUserService {
    private final WebsiteUserRepository websiteUserRepository;
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<String> addWebsiteUser(WebsiteUserRequest websiteUserRequest) {
        WebsiteUser websiteUser = getWebsiteUserFromRequest(websiteUserRequest);

        if (websiteUserRepository.findByEmail(websiteUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }

        if(!saveWebsiteUser(websiteUser)){
            return ResponseEntity.internalServerError().body("Server cannot save season due to problem " +
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
}
