package com.sumoc.sumochampionship.api.dto;

import com.sumoc.sumochampionship.db.season.Location;
import com.sumoc.sumochampionship.db.season.Season;
import com.sumoc.sumochampionship.db.season.Tournament;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TournamentDto {
    private String name;
    private LocationDto location;
    private SeasonDto season;
    private LocalDate contestStart;
    private LocalDate contestEnd;
    private LocalDate registerStart;
    private LocalDate registerEnd;

    public static TournamentDto mapToDto(Tournament tournament){
        return TournamentDto.builder()
                .name(tournament.getName())
                .location(LocationDto.mapToDto(tournament.getLocation()))
                .season(SeasonDto.mapToDto(tournament.getSeason()))
                .contestStart(tournament.getContestStart())
                .contestEnd(tournament.getContestEnd())
                .registerStart(tournament.getRegisterStart())
                .registerEnd(tournament.getRegisterEnd())
                .build();
    }
}
