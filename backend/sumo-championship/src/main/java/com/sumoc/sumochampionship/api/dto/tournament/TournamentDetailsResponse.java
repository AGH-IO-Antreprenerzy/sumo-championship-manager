package com.sumoc.sumochampionship.api.dto.tournament;

import com.sumoc.sumochampionship.api.dto.category.CategoryDto2;
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
public class TournamentDetailsResponse {
    private Long id;
    private String name;

    private String seasonName;

    private LocalDate registerStart;
    private LocalDate registerEnd;

    private LocalDate contestStart;
    private LocalDate contestEnd;

    private LocationDto location;

    private List<CategoryDto2> ageCategories;
}
