package com.sumoc.sumochampionship.db.season;

import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Location;
import com.sumoc.sumochampionship.db.season.Season;
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
public class Tournament {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    private LocalDateTime registerStart;
    private LocalDateTime registerEnd;

    private LocalDateTime contestStart;
    private LocalDateTime contestEnd;

    @OneToOne
    private Location location;

    @ManyToOne
    private Season season;

    @ManyToMany
    @JoinTable(name = "TournamentCategories",
            joinColumns = @JoinColumn(name = "tournament_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories;

    @OneToMany(mappedBy = "tournament")
    private Set<WrestlersEnrollment> enrollments;

}
