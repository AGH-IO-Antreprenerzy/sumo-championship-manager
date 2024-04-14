package com.sumoc.sumochampionship.db.season;

import com.sumoc.sumochampionship.db.people.Wrestler;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WrestlersEnrollment {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Wrestler wrestler;


    @ManyToOne
    private Tournament tournament;


    @ManyToOne
    private Category category;


}
