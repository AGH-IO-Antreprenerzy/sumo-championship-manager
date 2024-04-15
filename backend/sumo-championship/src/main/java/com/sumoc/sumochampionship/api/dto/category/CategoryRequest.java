package com.sumoc.sumochampionship.api.dto.category;

import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.season.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryRequest {
    String name;

    Integer minAge;
    Integer maxAge;

    Integer minWeight;
    Integer maxWeight;

    Gender gender;


    public static Category fromRequest(CategoryRequest categoryRequest){
        return Category.builder()
                .name(categoryRequest.getName())
                .minAge(categoryRequest.getMinAge())
                .maxAge(categoryRequest.getMaxAge())
                .minWeight(categoryRequest.minWeight)
                .maxWeight(categoryRequest.maxWeight)
                .gender(categoryRequest.gender)
                .build();
    }
}
