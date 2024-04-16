package com.sumoc.sumochampionship.api.dto.tournament;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentRequest {
    String name;

    LocationDto location;

    String seasonName;
    LocalDate contestStart;
    LocalDate contestEnd;
    LocalDate registerStart;
    LocalDate registerEnd;
    List<Long> categoryIds;
}
