package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findCategoriesBySeason(Season season);
    Page<Category> findCategoriesBySeasonName(String name, Pageable pageable);
    Set<Category> findAllByIdIn(List<Long> ids);
}
