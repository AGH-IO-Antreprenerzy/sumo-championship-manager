package com.sumoc.sumochampionship.db.people;

import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

/**
 * Model for wrestlers
 * Include foreign key to Club Table. Wrestler can be in one club at the same time
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wrestler {

    @Id
    @GeneratedValue
    private Long id;

    private String firstname;
    private String lastname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birthday;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @OneToMany(mappedBy = "wrestler")
    private Set<WrestlersEnrollment> enrollments;


}
