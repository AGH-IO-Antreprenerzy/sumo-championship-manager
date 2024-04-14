package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.OwnedClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OwnedClubsRepository extends JpaRepository<OwnedClub, Long> {

}
