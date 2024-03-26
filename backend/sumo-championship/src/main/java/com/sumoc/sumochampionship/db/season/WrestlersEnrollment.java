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
    @ManyToOne
    private Wrestler wrestler;

    @Id
    @ManyToOne
    private Tournament tournament;

    @Id
    @ManyToOne
    private Category category;


}
