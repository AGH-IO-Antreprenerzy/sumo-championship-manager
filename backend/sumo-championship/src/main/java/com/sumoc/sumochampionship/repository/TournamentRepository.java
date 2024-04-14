package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {
    Tournament findById(Integer id);
    List<Tournament> findAllBySeason(Season season);
    List<Tournament> findAllBySeasonName(String seasonName);

    Page<Tournament> findAllByContestEndAfter(LocalDate date, Pageable pageable);
}
