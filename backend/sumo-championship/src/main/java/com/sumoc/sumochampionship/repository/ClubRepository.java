package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    Optional<Club> findById(Long id);
}
