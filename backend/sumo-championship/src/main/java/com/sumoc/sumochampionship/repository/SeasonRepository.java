package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {

}
