package com.sumoc.sumochampionship.db.season;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private LocalDateTime start;
    private LocalDateTime end;

    @OneToMany(mappedBy = "season")
    private Set<Tournament> tournaments;

    @ManyToMany(mappedBy = "season")
    private Set<Category> categories;

}
