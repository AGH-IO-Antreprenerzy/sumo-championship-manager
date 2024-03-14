package com.sumoc.sumochampionship.db.season;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Location of the tournament
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    @Id
    @GeneratedValue
    private Long id;
    private String country;
    private String city;
    private String street;
    private Integer nr;

    @OneToOne(mappedBy = "location")
    private Tournament tournament;

}
