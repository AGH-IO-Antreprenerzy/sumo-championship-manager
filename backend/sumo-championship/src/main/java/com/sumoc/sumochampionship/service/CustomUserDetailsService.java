package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.websiteuser.WebsiteUserResponse;
import com.sumoc.sumochampionship.repository.WebsiteUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final WebsiteUserRepository userRepository;

    public CustomUserDetailsService(WebsiteUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public WebsiteUserResponse getWebsiteUser(String email) {
        Optional<WebsiteUser> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            WebsiteUser user = userOptional.get();
            return new WebsiteUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getUserRole()
            );
        } else {
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        WebsiteUser user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username (email): " + email));

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                user.getAuthorities());
    }
}