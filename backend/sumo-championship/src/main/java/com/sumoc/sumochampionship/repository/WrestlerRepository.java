package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Wrestler;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Repository responsible for manipulating data from database
 * It supports pagination
 */

@Repository
public interface WrestlerRepository extends JpaRepository<Wrestler, Long> {

    /* Returns Wrestlers that are connected to requesting WebsiteUser
        For example: Polish National Trainer request for all Wrestlers -> Receive all Wrestlers that
        belongs to polish club's
     */
    Page<Wrestler> findWrestlerByClubIn(Collection<Club> club, Pageable pageable);
    List<Wrestler> findAllByClubIn(Set<Club> clubs);

}
