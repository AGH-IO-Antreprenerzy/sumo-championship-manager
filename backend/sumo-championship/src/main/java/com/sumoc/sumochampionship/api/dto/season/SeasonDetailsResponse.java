package com.sumoc.sumochampionship.api.dto.season;

import com.sumoc.sumochampionship.api.dto.category.CategoryDto;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeasonDetailsResponse {
    private String name;
    private LocalDate start;
    private LocalDate end;

    private List<CategoryDto> categories;

    private List<TournamentDto> tournaments;

}
