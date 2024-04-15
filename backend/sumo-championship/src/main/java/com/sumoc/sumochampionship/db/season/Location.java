package com.sumoc.sumochampionship.db.season;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static java.util.Objects.hash;

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

    @OneToOne(mappedBy = "location", fetch = FetchType.LAZY)
    private Tournament tournament;


    @Override
    public int hashCode(){
        return hash(id);
    }
}
