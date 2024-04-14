package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Season;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
    Season findByName(String name);
    Season findById(Integer id);
    Page<Season> findSeasonsByEndDateBefore(LocalDate end, Pageable pageable);
    Page<Season> findSeasonsByEndDateAfter(LocalDate end, Pageable pageable);
}
