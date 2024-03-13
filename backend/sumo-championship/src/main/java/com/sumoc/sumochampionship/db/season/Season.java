package com.sumoc.sumochampionship.db.season;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

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

    @OneToMany(mappedBy = "season")
    private Set<Category> categories;


}
