package com.sumoc.sumochampionship.api.dto.wrestler;

import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.Wrestler;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Object that contains all data that is needed in frontend view
 * TODO: Confirm that info with frontend
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlersDto {
    private Long id;
    private String firstname;
    private String lastname;
    private Gender gender;
    private LocalDate birthday;
    private Long clubId;

    public static WrestlersDto mapToDto(Wrestler wrestler){
        return WrestlersDto.builder()
                .id(wrestler.getId())
                .firstname(wrestler.getFirstname())
                .clubId(wrestler.getClub().getId())
                .lastname(wrestler.getLastname())
                .birthday(wrestler.getBirthday())
                .gender(wrestler.getGender()).build();

    }

}
