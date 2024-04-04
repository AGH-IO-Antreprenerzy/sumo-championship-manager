package com.sumoc.sumochampionship.db.season;

import com.sumoc.sumochampionship.db.people.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

import static java.util.Objects.hash;

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

    // Added maxAge - TODO: Discuss
    private Integer minAge;
    private Integer maxAge;

    // Added minWeight - TODO: Discuss
    private Integer minWeight;
    private Integer maxWeight;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    private Season season;

    // Categories for a given tournament
    // Changed from ManyToMany to ManyToOne
    @ManyToMany
    private List<Tournament> tournament;

    // Category for an enrolled Wrestler
    @OneToMany(mappedBy = "category")
    private Set<WrestlersEnrollment> enrollments;

    @Override
    public int hashCode(){
        return hash(id);
    }
}
