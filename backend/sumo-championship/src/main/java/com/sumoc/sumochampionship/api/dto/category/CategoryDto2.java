package com.sumoc.sumochampionship.api.dto.category;

import com.sumoc.sumochampionship.api.dto.category.helpers.WeightDetailsRequest;
import com.sumoc.sumochampionship.db.season.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.antlr.v4.runtime.misc.Triple;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDto2 {

    /*
      DTO made for implementing new categories logics after meeting with clients
     */
    private String ageName;
    private Integer minAge;
    private Integer maxAge;
    private List<WeightDetailsRequest> weightsAndGender;


    public static List<CategoryDto2> mapListToDto(List<Category> categories){
        HashMap<String, List<WeightDetailsRequest>> ageCategoryToWeights = new HashMap<>();
        HashMap<String, Pair<Integer, Integer>> categoryNameToAges = new HashMap<>();


        for(Category category: categories){
            ageCategoryToWeights.computeIfAbsent(category.getName(), k -> new ArrayList<>());


            ageCategoryToWeights.get(category.getName()).add(WeightDetailsRequest
                                                            .builder()
                                                            .categoryId(category.getId())
                                                            .gender(category.getGender())
                                                            .maxWeight(category.getMaxWeight())
                                                            .build());



            categoryNameToAges.put(category.getName(),
                    new Pair<Integer, Integer>(category.getMinAge(), category.getMaxAge()));
        }

        List<CategoryDto2> categoriesToReturn = new ArrayList<>();

        for(String name: ageCategoryToWeights.keySet()){
            categoriesToReturn.add(CategoryDto2.builder()
                                                .ageName(name)
                                                .minAge(categoryNameToAges.get(name).a)
                                                .maxAge(categoryNameToAges.get(name).b)
                                                .weightsAndGender(ageCategoryToWeights.get(name))
                                                .build());
        }

        return categoriesToReturn;
    }
}
