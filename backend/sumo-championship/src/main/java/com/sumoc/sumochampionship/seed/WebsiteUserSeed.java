package com.sumoc.sumochampionship.seed;

import com.sumoc.sumochampionship.api.dto.websiteuser.WebsiteUserResponse;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.UserRole;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.repository.ClubRepository;
import com.sumoc.sumochampionship.repository.WebsiteUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class WebsiteUserSeed implements CommandLineRunner {

    private final WebsiteUserRepository websiteUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClubRepository clubRepository;

    @Override
    public void run(String... args) throws Exception {
        loadUsers();
    }

    private void loadUsers(){
        List<Club> clubs = clubRepository.findAll();
        WebsiteUser admin = WebsiteUser.builder()
                .firstname("John")
                .lastname("Cena")
                .password(passwordEncoder.encode("sumo123"))
                .email("admin@gmail.com")
                .userRole(UserRole.ADMIN)
//                .ownedClubs(new HashSet<>(clubs))
                .build();

        if (websiteUserRepository.findByEmail("admin@gmail.com").isEmpty()) {
            websiteUserRepository.save(admin);
        }

    }
}
