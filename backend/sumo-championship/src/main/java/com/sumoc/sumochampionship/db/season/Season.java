package com.sumoc.sumochampionship.db.season;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Model representing season.
 * Each season has got list of tournaments and categories
 * Tournaments may be organized with ONLY categories specified here
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Season {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    // Change to LocalDate from LocalDateTime (I think the Date does not have to be that precise)
    // TODO: Discuss it with frontend
    private LocalDate start;
    private LocalDate end;

    @OneToMany(mappedBy = "season")
    private Set<Tournament> tournaments;

    @OneToMany(mappedBy = "season")
    private Set<Category> categories;
}
