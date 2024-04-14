package com.sumoc.sumochampionship.api.dto.wrestler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlersResponseNoPag {
    private List<WrestlersDto> wrestlersInfo;
}
