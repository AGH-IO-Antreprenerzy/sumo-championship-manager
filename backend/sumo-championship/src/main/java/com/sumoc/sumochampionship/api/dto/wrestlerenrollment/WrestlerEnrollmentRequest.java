package com.sumoc.sumochampionship.api.dto.wrestlerenrollment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WrestlerEnrollmentRequest {

    private Long tournamentId;
    private Long wrestlerId;
    private List<Long> categoriesId;

}
