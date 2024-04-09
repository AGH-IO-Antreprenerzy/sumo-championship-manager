package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.club.ClubDto;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.repository.ClubRepository;
import com.sumoc.sumochampionship.repository.WrestlerRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ClubServiceTest {

    @Mock
    private ClubRepository clubRepository;

    @Mock
    private WrestlerRepository wrestlerRepository;

    @InjectMocks
    private ClubService clubService;


    @Test
    public void getClubsToUser(){
        // Arrange
        int clubNo = 5;
        Set<Club> clubSet = new HashSet<>();
        for(int i = 0; i < clubNo; i++){
            clubSet.add(Club.builder().id((long) i).build());
        }

        WebsiteUser user = WebsiteUser.builder()
                .ownedClubs(clubSet)
                .build();

        // Act
        List<ClubDto> clubs = clubService.getAllClubsToUser(user);

        // Assert
        Assertions.assertEquals(clubNo, clubs.size());
    }
}
