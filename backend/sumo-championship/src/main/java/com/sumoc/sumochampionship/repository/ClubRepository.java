package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    Optional<Club> findById(Long id);
    Optional<Club> findByName(String clubName);
    List<Club> findByNationality(String nationality);
}
