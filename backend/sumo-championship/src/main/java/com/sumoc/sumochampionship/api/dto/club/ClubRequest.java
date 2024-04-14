package com.sumoc.sumochampionship.api.dto.club;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.season.Country;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClubRequest {
    String name;
    Country nationality;

    public Club mapToClub() {
        return Club.builder()
                .name(name)
                .nationality(nationality)
                .trainers(Set.of())
                .wrestlers(Set.of())
                .build();
    }
}
