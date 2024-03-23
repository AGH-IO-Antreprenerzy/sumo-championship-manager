package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Tournament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TournamentRepository {
    Tournament findByName(String name);
    Page<Tournament> findTournamentsByEndDateBefore(LocalDate end, Pageable pageable);
    Page<Tournament> findTournamentsByEndDateAfter(LocalDate end, Pageable pageable);
}
