package com.sumoc.sumochampionship.api.dto.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriesResponse2 {
    List<CategoryDto2> categories;

    private int pageNo;
    private int pageSize;
    private int totalPages;
    private long totalElements;

}
