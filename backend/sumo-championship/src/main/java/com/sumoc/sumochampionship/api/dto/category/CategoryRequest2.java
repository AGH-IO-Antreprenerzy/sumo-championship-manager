package com.sumoc.sumochampionship.api.dto.category;

import com.sumoc.sumochampionship.api.dto.category.helpers.WeightDetailsRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryRequest2 {

    /*
      DTO made for implementing new categories logics after meeting with clients
     */
    private String ageName;
    private Integer minAge;
    private Integer maxAge;
    private WeightDetailsRequest weightsAndGender;
}
