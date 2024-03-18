package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.*;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class WrestlerRepositoryTest {

    @Autowired
    private WrestlerRepository wrestlerRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private WebsiteUserRepository websiteUserRepository;
    private final int CLUB1_MEMBERS = 3;

    /*
    Create few clubs and few wrestlers
    Admin have access to all Wrestlers in the all Clubs.
    Therefore the findWrestlerByClubIn method must returns all Wrestlers
    Test check only if the number of returned Wrestlers is OK
     */
    @Test
    public void Admin_findWrestlerByClubIn() {
        // Arrange
        WebsiteUser admin = contextAdmin();
        Pageable pageable = PageRequest.of(0, CLUB1_MEMBERS * 3 + 1);

        // Act
        List<Wrestler> wrestlers = wrestlerRepository.findWrestlerByClubIn(admin.getOwnedClubs(), pageable).getContent();

        // Assert
        Assertions.assertEquals(wrestlers.size(), CLUB1_MEMBERS * 3);

    }

    @Test
    public void National_findWrestlerByClubIn(){
        // Arrange

        WebsiteUser admin = contextNational();
        Pageable pageable = PageRequest.of(0, CLUB1_MEMBERS * 3 + 1);

        // Act
        List<Wrestler> wrestlers = wrestlerRepository.findWrestlerByClubIn(admin.getOwnedClubs(), pageable).getContent();

        // Assert
        Assertions.assertEquals( CLUB1_MEMBERS * 2, wrestlers.size());

    }

    @Test
    public void Regional_findWrestlerByClubIn(){
        // Arrange

        WebsiteUser admin = contextRegional();
        Pageable pageable = PageRequest.of(0, CLUB1_MEMBERS * 3 + 1);

        // Act
        List<Wrestler> wrestlers = wrestlerRepository.findWrestlerByClubIn(admin.getOwnedClubs(), pageable).getContent();

        // Assert
        Assertions.assertEquals(CLUB1_MEMBERS, wrestlers.size());

    }

    /*
     Test if pagination works well
     */
    @Test
    public void Pagination_findWrestlerByCluIn(){
        // Arrange
        int pageableNumber = 1;
        WebsiteUser admin = contextAdmin();
        Pageable pageable = PageRequest.of(0, pageableNumber);

        // Act
        // There are 9 Wrestlers but due to 'pageable' this method returns only one
        List<Wrestler> wrestlers = wrestlerRepository.findWrestlerByClubIn(admin.getOwnedClubs(), pageable).getContent();

        // Assert
        Assertions.assertEquals(pageableNumber, wrestlers.size());


    }

    private WebsiteUser contextRegional(){
        List<Club> clubs = new ArrayList<>(contextClubs());
        Set<Club> clubSet = Set.of(clubs.get(0));

        WebsiteUser user = contextUser();
        user.setOwnedClubs(clubSet);
        user.setUserRole(UserRole.CLUB_TRAINER);
        websiteUserRepository.save(user);

        return user;
    }

    private WebsiteUser contextNational(){
        List<Club> clubs = new ArrayList<>(contextClubs());
        Set<Club> clubSet = Set.of(clubs.get(0), clubs.get(1));

        WebsiteUser user = contextUser();
        user.setOwnedClubs(clubSet);
        user.setUserRole(UserRole.NATIONAL_TRAINER);
        websiteUserRepository.save(user);

        return user;
    }
    private WebsiteUser contextAdmin(){
        List<Club> clubs = contextClubs();
        Set<Club> clubSet = new HashSet<>(clubs);

        WebsiteUser user = contextUser();
        user.setOwnedClubs(clubSet);
        user.setUserRole(UserRole.ADMIN);
        websiteUserRepository.save(user);
        return user;
    }

    private WebsiteUser contextUser(){

        return WebsiteUser.builder()
                .firstname("A")
                .email("a@gmail.com")
                .lastname("A")
                .password("admin")
                .build();
    }

    private List<Club> contextClubs(){
        Club club1 = Club.builder()
                .name("club1")
                .nationality("Poland")
                .build();

        Club club2 = Club.builder()
                .name("club2")
                .nationality("Poland")
                .build();

        Club club3 = Club.builder()
                .name("club3")
                .nationality("England")
                .build();

        List<Club> clubs = List.of(club1, club2, club3);
        for(Club club :clubs){
            clubRepository.save(club);
            for (int i = 0; i < CLUB1_MEMBERS; i++) {
                Wrestler wrestler = Wrestler.builder()
                        .club(club)
                        .firstname("A")
                        .lastname("A")
                        .birthday(LocalDate.of(2002, Month.DECEMBER, 27))
                        .gender(Gender.FEMALE)
                        .build();
                wrestlerRepository.save(wrestler);
            }
        }
        return clubs;
    }
}