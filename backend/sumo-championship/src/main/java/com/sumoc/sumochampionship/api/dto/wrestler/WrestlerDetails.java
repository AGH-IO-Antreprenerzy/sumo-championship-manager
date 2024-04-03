package com.sumoc.sumochampionship.api.dto.wrestler;

import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlerDetails {
    private Long id;
    private String firstname;
    private String lastname;
    private Gender gender;
    private LocalDate birthday;
    private Long clubId;
    private List<Long> tournamentIds;

    public static WrestlerDetails mapToDto(Wrestler wrestler){
        Set<WrestlersEnrollment> enrollments = wrestler.getEnrollments();
        List<Tournament> tournaments =  enrollments.stream().map(WrestlersEnrollment::getTournament).toList();
        List<Long> tournamentsIds = tournaments.stream().map(Tournament::getId).toList();

        return WrestlerDetails.builder()
                .id(wrestler.getId())
                .firstname(wrestler.getFirstname())
                .lastname(wrestler.getLastname())
                .gender(wrestler.getGender())
                .birthday(wrestler.getBirthday())
                .clubId(wrestler.getClub().getId())
                .tournamentIds(tournamentsIds)
                .build();
    }

}
