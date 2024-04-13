package com.sumoc.sumochampionship.api.dto.wrestlerenrollment;

import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersDto;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlerEnrollmentDto2 {

    private WrestlersDto wrestler;
    private Long categoryId;

    public static WrestlerEnrollmentDto2 mapToDto(Wrestler wrestler, Category category){
        return WrestlerEnrollmentDto2.builder()
                .wrestler(WrestlersDto.mapToDto(wrestler))
                .categoryId(category.getId())
                .build();
    }
}
