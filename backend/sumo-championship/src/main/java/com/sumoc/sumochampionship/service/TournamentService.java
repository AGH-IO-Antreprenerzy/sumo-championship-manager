package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.SeasonDto;
import com.sumoc.sumochampionship.api.dto.request.TournamentRequest;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.repository.SeasonRepository;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final SeasonRepository seasonRepository;

    public ResponseEntity<String> saveTournament(TournamentRequest tournamentRequest){
        return ResponseEntity.ok().body("Tournament saved and added into season");
    }
}
