package com.sumoc.sumochampionship.api.dto;

import com.sumoc.sumochampionship.db.people.Gender;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    String name;

    Integer minAge;
    Integer maxAge;

    Integer minWeight;
    Integer maxWeight;

    Gender gender;
}
