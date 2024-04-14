package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.tournament.LocationDto;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentDto;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentRequest;
import com.sumoc.sumochampionship.db.season.Location;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.repository.CategoryRepository;
import com.sumoc.sumochampionship.repository.LocationRepository;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private TournamentService tournamentService;


    @Test
    void saveTournament() {
//        when(tournamentRepository.save(Mockito.any(Tournament.class))).thenReturn(Tournament.builder().build());
//        when(seasonRepository.findById(Mockito.eq(1))).thenReturn(Season.builder().build());
//        when(locationRepository.findById(Mockito.eq(1))).thenReturn(Location.builder().build());

        List<Long> categoryId = new ArrayList<>();
        Location location = new Location();

        TournamentRequest goodRequest = TournamentRequest.builder()
                .name("Tournament 01")
                .contestStart(LocalDate.now())
                .contestEnd(LocalDate.now().plusDays(1))
                .registerStart(LocalDate.now().minusDays(1))
                .registerEnd(LocalDate.now())
                .location(LocationDto.mapToDto(location))
                .build();

        TournamentRequest wrongRegisterDate = TournamentRequest.builder()
                .name("Tournament 02")
                .contestStart(LocalDate.now().plusDays(1))
                .contestEnd(LocalDate.now())
                .registerStart(LocalDate.now().minusDays(1))
                .registerEnd(LocalDate.now())
                .categoryIds(categoryId)
                .location(LocationDto.mapToDto(location))
                .build();

        TournamentRequest wrongContestDate = TournamentRequest.builder()
                .name("Tournament 03")
                .contestStart(LocalDate.now())
                .contestEnd(LocalDate.now().minusDays(1))
                .registerStart(LocalDate.now().minusDays(1))
                .registerEnd(LocalDate.now())
                .categoryIds(categoryId)
                .location(LocationDto.mapToDto(location))
                .build();

        TournamentRequest wrongLocation = TournamentRequest.builder()
                .name("Tournament 04")
                .contestStart(LocalDate.now())
                .contestEnd(LocalDate.now().plusDays(1))
                .registerStart(LocalDate.now().minusDays(1))
                .registerEnd(LocalDate.now())
                .categoryIds(categoryId)
                .location(LocationDto.mapToDto(location))
                .build();

        TournamentRequest wrongSeason = TournamentRequest.builder()
                .name("Tournament 05")
                .contestStart(LocalDate.now())
                .contestEnd(LocalDate.now().plusDays(1))
                .registerStart(LocalDate.now().minusDays(1))
                .registerEnd(LocalDate.now())
                .categoryIds(categoryId)
                .location(LocationDto.mapToDto(location))
                .build();

        ResponseEntity<?> response;

        response = tournamentService.saveTournament(wrongRegisterDate);
        assertEquals(HttpStatusCode.valueOf(400), response.getStatusCode());
        response = tournamentService.saveTournament(wrongContestDate);
        assertEquals(HttpStatusCode.valueOf(400), response.getStatusCode());
        response = tournamentService.saveTournament(wrongLocation);
        assertEquals(HttpStatusCode.valueOf(400), response.getStatusCode());
        response = tournamentService.saveTournament(wrongSeason);
        assertEquals(HttpStatusCode.valueOf(400), response.getStatusCode());
    }

    @Test
    void getTournament() {
        Tournament tournament = Tournament.builder()
                .name("Tournament 01")
                .location(Location.builder().build())
                .season(Season.builder().build())
                .contestStart(LocalDate.now())
                .contestEnd(LocalDate.now().plusDays(1))
                .registerStart(LocalDate.now().minusDays(1))
                .registerEnd(LocalDate.now())
                .build();

        when(tournamentRepository.findById(Mockito.eq(1))).thenReturn(tournament);

        TournamentDto tournamentDto = tournamentService.getTournament(1);
        assertEquals("Tournament 01", tournamentDto.getName());
    }

    @Test
    public void checkDateTest(){
        // Arrange
        Tournament tournament = Tournament.builder()
                .registerStart(LocalDate.of(2024, 4, 11))
                .registerEnd(LocalDate.of(2024, 4, 12))
                .contestStart(LocalDate.of(2024, 4, 20))
                .contestEnd(LocalDate.of(2024, 4, 22))
                .build();

        // Act
        boolean good = tournamentService.checkDate(tournament, LocalDate.of(2024, 3, 10),
                LocalDate.of(2024, 10, 24));

        boolean bad1 = tournamentService.checkDate(tournament, LocalDate.of(2024, 5, 10),
                LocalDate.of(2024, 10, 24));

        boolean bad2 = tournamentService.checkDate(tournament, LocalDate.of(2024, 3, 10),
                LocalDate.of(2024, 4, 8));

        // Assert
        Assertions.assertTrue(good);
        Assertions.assertFalse(bad1);
        Assertions.assertFalse(bad2);
    }

}