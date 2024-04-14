package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WrestlerEnrollmentRepository extends JpaRepository<WrestlersEnrollment, Long> {

    List<WrestlersEnrollment> findAllByWrestlerAndTournament_ContestEndAfter(Wrestler wrestler, LocalDate date);

    List<WrestlersEnrollment> findAllByTournament_Id(Long tournamentId);
}
