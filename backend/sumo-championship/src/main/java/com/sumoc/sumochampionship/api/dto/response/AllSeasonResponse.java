package com.sumoc.sumochampionship.api.dto.response;

import com.sumoc.sumochampionship.api.dto.SeasonDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllSeasonResponse {
    List<SeasonDto> seasonDtoList;
    private int pageNo;
    private int pageSize;
    private int totalPages;
    private long totalElements;
}
