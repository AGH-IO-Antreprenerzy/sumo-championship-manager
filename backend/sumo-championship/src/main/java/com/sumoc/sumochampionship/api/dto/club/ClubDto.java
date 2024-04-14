package com.sumoc.sumochampionship.api.dto.club;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.season.Country;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClubDto {

    private Long id;
    private String name;
    private Country nationality;



    public static ClubDto mapToDto(Club club){
        return ClubDto.builder()
                .id(club.getId())
                .name(club.getName())
                .nationality(club.getNationality())
                .build();
    }
}
