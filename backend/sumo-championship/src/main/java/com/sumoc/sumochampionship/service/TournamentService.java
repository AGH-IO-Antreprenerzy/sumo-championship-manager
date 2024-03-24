package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.SeasonDto;
import com.sumoc.sumochampionship.api.dto.TournamentDto;
import com.sumoc.sumochampionship.api.dto.request.TournamentRequest;
import com.sumoc.sumochampionship.db.season.Location;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.repository.LocationRepository;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final SeasonRepository seasonRepository;
    private final LocationRepository locationRepository;

    public ResponseEntity<String> saveTournament(TournamentRequest tournamentRequest) {
        Tournament tournament;
        try {
            tournament = getTournamentFromRequest(tournamentRequest);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        if (!notNullCheck(tournament)) {
            return ResponseEntity.badRequest().body("Invalid data. All parameters can not be null");
        }
        if (!checkDate(tournament)) {
            return ResponseEntity.badRequest().body("Invalid data provided. Start of the contest should be " +
                    "before the end of the contest and start of the registration should be before the contest start");
        }
        if (!saveTournament(tournament)) {
            return ResponseEntity.badRequest().body("Invalid data. Tournament with this name has already been created");
        }

        return ResponseEntity.ok().body("Tournament saved and added into season");
    }

    public TournamentDto getTournament(Integer id)throws EntityNotFoundException {
        Tournament tournament = tournamentRepository.findById(id);
        if (tournament == null) {
            throw new EntityNotFoundException("Tournament with id: " + id + " not found");
        }
        return TournamentDto.builder()
                .name(tournament.getName())
                .location(tournament.getLocation())
                .season(tournament.getSeason())
                .contestStart(tournament.getContestStart())
                .contestEnd(tournament.getContestEnd())
                .registerStart(tournament.getRegisterStart())
                .registerEnd(tournament.getRegisterEnd())
                .build();
    }

    private boolean saveTournament(Tournament tournament){
        try{
            tournamentRepository.save(tournament);
            return true;
        } catch (DataAccessException e) {
            return false;
        }
    }

    private boolean notNullCheck(Tournament tournament){
        return tournament.getName() != null && tournament.getLocation() != null && tournament.getSeason() != null &&
                tournament.getContestStart() != null && tournament.getContestEnd() != null &&
                tournament.getRegisterStart() != null && tournament.getRegisterEnd() != null;
    }

    private boolean checkDate(Tournament tournament){
        return tournament.getContestStart().isBefore(tournament.getContestEnd()) &&
                tournament.getRegisterStart().isBefore(tournament.getRegisterEnd()) &&
                tournament.getRegisterStart().isBefore(tournament.getContestStart());
    }

    private Tournament getTournamentFromRequest(TournamentRequest tournamentRequest) throws EntityNotFoundException {
        Location location = locationRepository.findById(tournamentRequest.getLocationId());
        if (location == null) {
            throw new EntityNotFoundException("Location with id: " + tournamentRequest.getLocationId() + " not found");
        }
        Season season = seasonRepository.findById(tournamentRequest.getSeasonId());
        if (season == null) {
            throw new EntityNotFoundException("Season with id: " + tournamentRequest.getSeasonId() + " not found");
        }
        return Tournament.builder()
                .name(tournamentRequest.getName())
                .season(season)
                .location(location)
                .contestStart(tournamentRequest.getContestStart())
                .contestEnd(tournamentRequest.getContestEnd())
                .registerStart(tournamentRequest.getRegisterStart())
                .registerEnd(tournamentRequest.getRegisterEnd())
                .build();
    }
}
