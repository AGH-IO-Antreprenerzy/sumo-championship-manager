package com.sumoc.sumochampionship.api.dto.request;


import com.sumoc.sumochampionship.api.dto.CategoryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SeasonRequest {
    String name;
    LocalDate startDate;
    LocalDate endDate;
    Set<CategoryDto> categories;
}
