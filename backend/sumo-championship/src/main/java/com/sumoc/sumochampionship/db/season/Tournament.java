package com.sumoc.sumochampionship.db.season;

import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Location;
import com.sumoc.sumochampionship.db.season.Season;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Model representing Tournaments.
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    private LocalDate registerStart;
    private LocalDate registerEnd;

    private LocalDate contestStart;
    private LocalDate contestEnd;

    @OneToOne
    private Location location;

    @ManyToOne
    private Season season;

    @ManyToMany
    private Set<Category> categories;

    @OneToMany(mappedBy = "tournament")
    private Set<WrestlersEnrollment> enrollments;

}
