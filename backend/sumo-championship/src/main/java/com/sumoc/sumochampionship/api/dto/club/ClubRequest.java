package com.sumoc.sumochampionship.api.dto.club;

import com.sumoc.sumochampionship.db.people.Club;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClubRequest {
    String name;
    String nationality;
    Optional<List<Long>> trainerIds;

    public Club mapToClub() {
        return Club.builder()
                .name(name)
                .nationality(nationality)
                .trainers(Set.of())
                .wrestlers(Set.of())
                .build();
    }
}
