package com.sumoc.sumochampionship.api.dto;

import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.season.Category;
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

    public static CategoryDto toDto(Category category){
        return CategoryDto.builder()
                .name(category.getName())
                .minAge(category.getMinAge())
                .maxAge(category.getMaxAge())
                .minWeight(category.getMinWeight())
                .maxWeight(category.getMaxWeight())
                .gender(category.getGender())
                .build();
    }
}
