package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findById(Integer id);
}
