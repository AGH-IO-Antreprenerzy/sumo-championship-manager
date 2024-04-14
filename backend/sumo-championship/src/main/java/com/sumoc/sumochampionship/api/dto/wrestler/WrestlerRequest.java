package com.sumoc.sumochampionship.api.dto.wrestler;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.Wrestler;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WrestlerRequest {

    String firstname;
    String lastname;
    Gender gender;
    LocalDate birthday;

    Long clubId;


    public Wrestler mapToWrestler(Club club){
        return Wrestler.builder()
                .firstname(firstname)
                .lastname(lastname)
                .gender(gender)
                .birthday(birthday)
                .club(club)
                .build();
    }
}
