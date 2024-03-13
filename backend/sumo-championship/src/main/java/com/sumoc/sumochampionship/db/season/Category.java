package com.sumoc.sumochampionship.db.season;

import com.sumoc.sumochampionship.db.people.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Model that represent categories in which wrestlers can compete in.
 * Example: Junior (from 16 years old) max_weight = 80kg, Only man
 * One category may be added to many season. One season contain many categories
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Integer minAge;
    private Integer maxWeight;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToMany
    @JoinTable(name = "SeasonCategory",
            joinColumns = @JoinColumn(name = "category"),
            inverseJoinColumns = @JoinColumn(name = "season"))
    private Set<Season> season;

    // Categories for a given tournament
    @ManyToMany(mappedBy = "categories")
    private Set<Tournament> tournaments;

    // Category for an enrolled Wrestler
    @OneToMany(mappedBy = "category")
    private Set<WrestlersEnrollment> enrollments;
}
