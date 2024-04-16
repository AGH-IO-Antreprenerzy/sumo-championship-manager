package com.sumoc.sumochampionship.api.dto.category.helpers;

import com.sumoc.sumochampionship.db.people.Gender;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeightDetailsRequest {
    private Long categoryId;
    private Integer maxWeight;
    private Gender gender;
}
