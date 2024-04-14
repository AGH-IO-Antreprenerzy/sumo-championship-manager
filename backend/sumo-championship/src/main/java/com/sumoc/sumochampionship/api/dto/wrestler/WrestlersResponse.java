package com.sumoc.sumochampionship.api.dto.wrestler;

import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response for {/api/v1/wrestler/all} request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlersResponse {
    private List<WrestlersDto> wrestlersInfo;
    private int pageNo;
    private int pageSize;
    private int totalPages;
    private long totalElements;
}
