package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.CategoryDto;
import com.sumoc.sumochampionship.api.dto.LocationDto;
import com.sumoc.sumochampionship.api.dto.SeasonDto;
import com.sumoc.sumochampionship.api.dto.TournamentDto;
import com.sumoc.sumochampionship.api.dto.request.TournamentRequest;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Location;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.repository.CategoryRepository;
import com.sumoc.sumochampionship.repository.LocationRepository;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final SeasonRepository seasonRepository;
    private final LocationRepository locationRepository;
    private final CategoryRepository categoryRepository;

    public ResponseEntity<String> saveTournament(TournamentRequest tournamentRequest) {
        System.out.println("Start service");
        Tournament tournament;
        Set<Category> categories = getCategoriesFromRequest(tournamentRequest);
        System.out.println("Got categories");
        try {
            tournament = getTournamentFromRequest(tournamentRequest);
            System.out.println("Tournament got");
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

        tournament.setCategories(categories);

        if (!saveTournament(tournament)) {
            return ResponseEntity.badRequest().body("Invalid data.");
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
                .location(LocationDto.mapToDto(tournament.getLocation()))
                .season(SeasonDto.mapToDto(tournament.getSeason()))
                .contestStart(tournament.getContestStart())
                .contestEnd(tournament.getContestEnd())
                .registerStart(tournament.getRegisterStart())
                .registerEnd(tournament.getRegisterEnd())
                .build();
    }

    public List<TournamentDto> getAllTournamentsToSeason(String seasonName) throws EntityNotFoundException{
        if (seasonRepository.findByName(seasonName) == null){
            throw new EntityNotFoundException("Season " + seasonName + " not found in database");
        }

        List<Tournament> tournaments = tournamentRepository.findAllBySeasonName(seasonName);
        return tournaments.stream().map(TournamentDto::mapToDto).toList();
    }

    private boolean saveTournament(Tournament tournament){
        try{
            // Save location
            locationRepository.save(tournament.getLocation());

            // Not need to save categories because they are already saved

            // Save Tournament
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
        LocationDto locationDto = tournamentRequest.getLocation();
        Location location = LocationDto.fromDto(locationDto);

        Season season = seasonRepository.findByName(tournamentRequest.getSeasonName());
        if (season == null) {
            throw new EntityNotFoundException("Season with id: " + tournamentRequest.getSeasonName() + " not found");
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

    private Set<Category> getCategoriesFromRequest(TournamentRequest tournamentRequest) {
        List<Long> categoriesId = tournamentRequest.getCategoryIds();

        return categoryRepository.findAllByIdIn(categoriesId);

    }

    private Category getCategoryFromDto(CategoryDto dto) {
        return Category.builder()
                .name(dto.getName())
                .minAge(dto.getMinAge())
                .maxAge(dto.getMaxAge())
                .minWeight(dto.getMinWeight())
                .maxWeight(dto.getMaxWeight())
                .gender(dto.getGender())
                .build();
    }
}
