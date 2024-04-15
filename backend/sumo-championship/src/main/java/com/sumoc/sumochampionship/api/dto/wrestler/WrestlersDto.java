package com.sumoc.sumochampionship.api.dto.wrestler;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.repository.ClubRepository;
import lombok.*;

import java.time.LocalDate;
import java.util.Optional;

/**
 * Object that contains all data that is needed in frontend view
 * TODO: Confirm that info with frontend
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlersDto {
    // It should not be here - it is implemented in that way due to lack of time !!!
    public static ClubRepository clubRepository;

    private Long id;
    private String firstname;
    private String lastname;
    private Gender gender;
    private LocalDate birthday;
    private Long clubId;

    private String clubName;

    public static WrestlersDto mapToDto(Wrestler wrestler){
        Optional<Club> clubOptional = clubRepository.findById(wrestler.getClub().getId());
        String name = clubOptional.get().getName();

        return WrestlersDto.builder()
                .id(wrestler.getId())
                .firstname(wrestler.getFirstname())
                .clubId(wrestler.getClub().getId())
                .lastname(wrestler.getLastname())
                .birthday(wrestler.getBirthday())
                .clubName(name)
                .gender(wrestler.getGender()).build();

    }

}
