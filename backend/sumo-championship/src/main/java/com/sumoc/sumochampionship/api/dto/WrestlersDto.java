package com.sumoc.sumochampionship.api.dto;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.UserRole;
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
    private String firstname;
    private String lastname;
    private Gender gender;
    private LocalDate birthday;
    private Club club;
}
