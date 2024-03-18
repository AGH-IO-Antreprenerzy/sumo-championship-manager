package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.people.WebsiteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsiteUserRepository extends JpaRepository<WebsiteUser, Long> {
}
