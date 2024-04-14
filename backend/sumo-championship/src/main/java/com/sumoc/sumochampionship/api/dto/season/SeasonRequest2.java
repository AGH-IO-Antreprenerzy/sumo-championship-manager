package com.sumoc.sumochampionship.api.dto.season;

import com.sumoc.sumochampionship.api.dto.category.CategoryDto2;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SeasonRequest2 {
    /*
    One of the class made after meeting with the client. If this works, it should replace SeasonRequest2
     */
    String name;
    LocalDate startDate;
    LocalDate endDate;
    List<CategoryDto2> ageCategories;

}
