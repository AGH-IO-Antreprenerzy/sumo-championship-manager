package com.sumoc.sumochampionship.api.dto.request;

import com.sumoc.sumochampionship.api.dto.CategoryDto;
import com.sumoc.sumochampionship.api.dto.LocationDto;
import com.sumoc.sumochampionship.db.season.Location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentRequest {
    String name;

    LocationDto location;

    String seasonName;
    LocalDate contestStart;
    LocalDate contestEnd;
    LocalDate registerStart;
    LocalDate registerEnd;
    List<Long> categoryIds;
}
