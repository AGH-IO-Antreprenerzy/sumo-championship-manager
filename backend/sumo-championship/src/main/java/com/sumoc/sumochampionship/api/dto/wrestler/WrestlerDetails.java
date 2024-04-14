package com.sumoc.sumochampionship.api.dto.wrestler;

import com.sumoc.sumochampionship.api.dto.enrollment.EnrollDto;
import com.sumoc.sumochampionship.api.dto.tournament.TournamentDto;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    private List<EnrollDto> enrollments;

    public static WrestlerDetails mapToDto(Wrestler wrestler, List<WrestlersEnrollment> enrollments){
        HashMap<Tournament, List<Category>> categoriesToTournament = new HashMap<>();

        for (WrestlersEnrollment enrollment: enrollments){
            Tournament tournament = enrollment.getTournament();
            Category category = enrollment.getCategory();

            categoriesToTournament.computeIfAbsent(tournament, k -> new ArrayList<Category>());

            categoriesToTournament.get(tournament).add(category);
        }

        List<EnrollDto> enrollDtos = new ArrayList<>();
        for(Tournament tournament: categoriesToTournament.keySet()){
            enrollDtos.add(EnrollDto.mapToDto(tournament,categoriesToTournament.get(tournament)));
        }

        return WrestlerDetails.builder()
                .id(wrestler.getId())
                .firstname(wrestler.getFirstname())
                .lastname(wrestler.getLastname())
                .gender(wrestler.getGender())
                .birthday(wrestler.getBirthday())
                .clubId(wrestler.getClub().getId())
                .enrollments(enrollDtos)
                .build();
    }

}
