package com.sumoc.sumochampionship.api.dto.tournament;

import com.sumoc.sumochampionship.api.dto.tournament.TournamentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllTournamentsResponse {
    List<TournamentDto> tournamentDtoList;
    private int pageNo;
    private int pageSize;
    private int totalPages;
    private long totalElements;
}
