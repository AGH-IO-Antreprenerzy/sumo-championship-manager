package com.sumoc.sumochampionship.db.season;

import com.sumoc.sumochampionship.db.people.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

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

    @ManyToOne
    private Season season;

    @ManyToMany(mappedBy = "categories")
    private Set<Tournament> tournaments;

    @OneToMany(mappedBy = "category")
    private Set<WrestlersEnrollment> enrollments;


}
