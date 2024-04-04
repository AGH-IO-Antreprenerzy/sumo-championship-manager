package com.sumoc.sumochampionship.api.dto.category;

import com.sumoc.sumochampionship.api.dto.category.helpers.WeightDetailsRequest;
import com.sumoc.sumochampionship.db.season.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDto2 {

    /*
      DTO made for implementing new categories logics after meeting with clients
     */
    private Long id;
    private String ageName;
    private Integer minAge;
    private Integer maxAge;
    private List<WeightDetailsRequest> weightsAndGender;

    public CategoryDto2(String ageName, Integer minAge, Integer maxAge, List<WeightDetailsRequest> weightsAndGender) {
        this.id = null;
        this.ageName = ageName;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.weightsAndGender = weightsAndGender;
    }

//    public List<CategoryDto2> mapListToDto(List<Category> categories){
//
//    }
}
