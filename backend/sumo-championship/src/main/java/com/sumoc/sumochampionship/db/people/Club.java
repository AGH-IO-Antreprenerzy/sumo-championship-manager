package com.sumoc.sumochampionship.db.people;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Model for collecting data about club, theirs wrestlers and trainers.
 * Assumed, that one club can have many club trainers and one national trainer can have many clubs
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Club {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String name;

    private String nationality;

    @ManyToMany(mappedBy = "ownedClubs")
    private Set<WebsiteUser> trainers;

    @OneToMany(mappedBy = "club")
    private Set<Wrestler> wrestlers;

}
