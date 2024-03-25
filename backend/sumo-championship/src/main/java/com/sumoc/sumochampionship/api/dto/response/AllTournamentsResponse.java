package com.sumoc.sumochampionship.api.dto.response;

import com.sumoc.sumochampionship.api.dto.TournamentDto;

import java.util.List;

public class AllTournamentsResponse {
    List<TournamentDto> tournamentDtoList;
    private int pageNo;
    private int pageSize;
    private int totalPages;
    private long totalElements;
}
