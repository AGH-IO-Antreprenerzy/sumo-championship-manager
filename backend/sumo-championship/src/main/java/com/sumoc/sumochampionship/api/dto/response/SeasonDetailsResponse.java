package com.sumoc.sumochampionship.api.dto.response;

import com.sumoc.sumochampionship.api.dto.CategoryDto;
import com.sumoc.sumochampionship.api.dto.TournamentDto;
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
