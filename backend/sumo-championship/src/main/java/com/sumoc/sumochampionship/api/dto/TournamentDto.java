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
    private LocalDateTime contestStartDate;
    private LocalDateTime contestEndDate;
    private LocalDateTime registrationStartDate;
    private LocalDateTime registrationEndDate;

    public static TournamentDto mapToDto(Tournament tournament){
        return TournamentDto.builder()
                .name(tournament.getName())
                .location(tournament.getLocation())
                .season(tournament.getSeason())
                .contestStartDate(tournament.getContestStart())
                .contestEndDate(tournament.getContestEnd())
                .registrationStartDate(tournament.getRegisterStart())
                .registrationEndDate(tournament.getRegisterEnd())
                .build();
    }
}
