package com.sumoc.sumochampionship.api.dto;

import com.sumoc.sumochampionship.db.season.Season;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeasonDto {
    private String name;
    private LocalDate start;
    private LocalDate end;


    static public SeasonDto mapToDto(Season season){
        return SeasonDto.builder()
                .name(season.getName())
                .start(season.getStartDate())
                .end(season.getEndDate())
                .build();
    }

}
