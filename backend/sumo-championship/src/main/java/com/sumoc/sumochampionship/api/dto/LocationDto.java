package com.sumoc.sumochampionship.api.dto;

import com.sumoc.sumochampionship.db.season.Location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationDto {
    private String country;
    private String city;
    private String street;
    private Integer nr;


    public static Location fromDto(LocationDto locationDto){
        return Location.builder()
                .city(locationDto.city)
                .nr(locationDto.nr)
                .country(locationDto.country)
                .street(locationDto.street)
                .build();
    }

    public static LocationDto mapToDto(Location location){
        return LocationDto.builder()
                .city(location.getCity())
                .nr(location.getNr())
                .country(location.getCountry())
                .street(location.getStreet())
                .build();
    }

}
