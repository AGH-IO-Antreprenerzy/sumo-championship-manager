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
    private Location location;
    private Season season;
    private LocalDateTime contestStart;
    private LocalDateTime contestEnd;
    private LocalDateTime registerStart;
    private LocalDateTime registerEnd;

    public static TournamentDto mapToDto(Tournament tournament){
        return TournamentDto.builder()
                .name(tournament.getName())
                .location(tournament.getLocation())
                .season(tournament.getSeason())
                .contestStart(tournament.getContestStart())
                .contestEnd(tournament.getContestEnd())
                .registerStart(tournament.getRegisterStart())
                .registerEnd(tournament.getRegisterEnd())
                .build();
    }
}
