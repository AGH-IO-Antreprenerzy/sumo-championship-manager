package com.sumoc.sumochampionship.api.dto.enrollment;

import com.sumoc.sumochampionship.api.dto.category.CategoryDto;
import com.sumoc.sumochampionship.api.dto.tournament.LocationDto;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollDto {
    // Tournament Info
    Long tournamentId;
    String name;
    LocationDto location;
    LocalDate contestStart;
    LocalDate contestEnd;

    // Category Info
    List<CategoryDto> categories;


    public static EnrollDto mapToDto(Tournament tournament, List<Category> categories){
        List<CategoryDto> categoryDtos = categories.stream().map(CategoryDto::toDto).toList();
        return EnrollDto.builder()
                .tournamentId(tournament.getId())
                .name(tournament.getName())
                .location(LocationDto.mapToDto(tournament.getLocation()))
                .contestStart(tournament.getContestStart())
                .contestEnd(tournament.getContestEnd())
                .categories(categoryDtos)
                .build();
    }

}
