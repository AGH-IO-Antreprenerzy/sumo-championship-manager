package com.sumoc.sumochampionship.repository;

import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // * Method added to test functionality of adding new Season with categories
    List<Category> findCategoriesBySeason(Set<Season> season);
}
