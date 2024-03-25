package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.TournamentDto;
import com.sumoc.sumochampionship.api.dto.request.TournamentRequest;
import com.sumoc.sumochampionship.db.season.Location;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.repository.LocationRepository;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)

class TournamentServiceTest {

    @Mock
    private TournamentRepository tournamentRepository;

    @Mock
    private SeasonRepository seasonRepository;

    @Mock
    private LocationRepository locationRepository;

    @InjectMocks
    private TournamentService tournamentService;


    @Test
    void saveTournament() {
        when(tournamentRepository.save(Mockito.any(Tournament.class))).thenReturn(Tournament.builder().build());
        when(seasonRepository.findById(Mockito.eq(1))).thenReturn(Season.builder().build());
        when(locationRepository.findById(Mockito.eq(1))).thenReturn(Location.builder().build());


        TournamentRequest goodRequest = TournamentRequest.builder()
                .name("Tournament 01")
                .contestStart(LocalDateTime.now())
                .contestEnd(LocalDateTime.now().plusDays(1))
                .registerStart(LocalDateTime.now().minusDays(1))
                .registerEnd(LocalDateTime.now())
                .build();

        TournamentRequest wrongRegisterDate = TournamentRequest.builder()
                .name("Tournament 02")
                .contestStart(LocalDateTime.now().plusDays(1))
                .contestEnd(LocalDateTime.now())
                .registerStart(LocalDateTime.now().minusDays(1))
                .registerEnd(LocalDateTime.now())
                .build();

        TournamentRequest wrongContestDate = TournamentRequest.builder()
                .name("Tournament 03")
                .contestStart(LocalDateTime.now())
                .contestEnd(LocalDateTime.now().minusDays(1))
                .registerStart(LocalDateTime.now().minusDays(1))
                .registerEnd(LocalDateTime.now())
                .build();

        TournamentRequest wrongLocation = TournamentRequest.builder()
                .name("Tournament 04")
                .contestStart(LocalDateTime.now())
                .contestEnd(LocalDateTime.now().plusDays(1))
                .registerStart(LocalDateTime.now().minusDays(1))
                .registerEnd(LocalDateTime.now())
                .build();

        TournamentRequest wrongSeason = TournamentRequest.builder()
                .name("Tournament 05")
                .contestStart(LocalDateTime.now())
                .contestEnd(LocalDateTime.now().plusDays(1))
                .registerStart(LocalDateTime.now().minusDays(1))
                .registerEnd(LocalDateTime.now())
                .build();

        ResponseEntity<?> response = tournamentService.saveTournament(goodRequest);
        assertEquals(ResponseEntity.ok().body("Tournament saved and added into season"), response);

        response = tournamentService.saveTournament(wrongRegisterDate);
        assertEquals(ResponseEntity.badRequest().body("Invalid data provided. Start of the contest should be before the end of the contest and start of the registration should be before the contest start"), response);

        response = tournamentService.saveTournament(wrongContestDate);
        assertEquals(ResponseEntity.badRequest().body("Invalid data provided. Start of the contest should be before the end of the contest and start of the registration should be before the contest start"), response);

        response = tournamentService.saveTournament(wrongLocation);
        assertEquals(ResponseEntity.badRequest().body("Location with id: 2 not found"), response);

        response = tournamentService.saveTournament(wrongSeason);
        assertEquals(ResponseEntity.badRequest().body("Season with id: 2 not found"), response);
    }

    @Test
    void getTournament() {
        Tournament tournament = Tournament.builder()
                .name("Tournament 01")
                .location(Location.builder().build())
                .season(Season.builder().build())
                .contestStart(LocalDateTime.now())
                .contestEnd(LocalDateTime.now().plusDays(1))
                .registerStart(LocalDateTime.now().minusDays(1))
                .registerEnd(LocalDateTime.now())
                .build();

        when(tournamentRepository.findById(Mockito.eq(1))).thenReturn(tournament);

        TournamentDto tournamentDto = tournamentService.getTournament(1);
        assertEquals("Tournament 01", tournamentDto.getName());
    }
}