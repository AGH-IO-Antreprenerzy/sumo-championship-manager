package com.sumoc.sumochampionship.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentRequest {
    String name;
    Integer locationId;
    Integer seasonId;
    LocalDateTime contestStart;
    LocalDateTime contestEnd;
    LocalDateTime registerStart;
    LocalDateTime registerEnd;
}
