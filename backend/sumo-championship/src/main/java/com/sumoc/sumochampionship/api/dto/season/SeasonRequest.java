package com.sumoc.sumochampionship.api.dto.season;


import com.sumoc.sumochampionship.api.dto.category.CategoryRequest;
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
    Set<CategoryRequest> categories;
}
