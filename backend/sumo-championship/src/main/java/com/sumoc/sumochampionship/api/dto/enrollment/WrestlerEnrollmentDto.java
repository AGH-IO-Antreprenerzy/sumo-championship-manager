package com.sumoc.sumochampionship.api.dto.enrollment;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlerEnrollmentDto {
    String name;
    String surname;
    Gender gender;
    Integer minWeight;
    Integer maxWeight;
    Integer maxAge;
    Integer minAge;
    String categoryName;
    String clubName;

    public static WrestlerEnrollmentDto toDto(WrestlersEnrollment wrestlersEnrollment) {
        Wrestler wrestler = wrestlersEnrollment.getWrestler();
        Category category = wrestlersEnrollment.getCategory();
        return WrestlerEnrollmentDto.builder()
                .name(wrestler.getFirstname())
                .surname(wrestler.getLastname())
                .gender(category.getGender())
                .minAge(category.getMinAge())
                .maxAge(category.getMaxAge())
                .minWeight(category.getMinWeight())
                .maxWeight(category.getMaxWeight())
                .categoryName(category.getName())
                .clubName(wrestler.getClub().getName())
                .build();
    }
}
