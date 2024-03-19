package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.WrestlersDto;
import com.sumoc.sumochampionship.api.dto.response.WrestlersResponse;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.repository.WrestlerRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Service responsible for main logic for manipulating data from Wrestlers Table
 */
@Service
@AllArgsConstructor
public class WrestlerService {
    private final WrestlerRepository wrestlerRepository;

    /*
    Using Repository collect all Wrestlers belong to WebsiteUser(Trainer)
    Than convert the Page to WrestlersDto
     */
    public WrestlersResponse findAllInClubs(WebsiteUser user, Pageable pageable){
        Set<Club> ownedClubs = user.getOwnedClubs();
        Page<Wrestler> wrestlerPage = wrestlerRepository.findWrestlerByClubIn(ownedClubs, pageable);

        List<Wrestler> listOfPokemon = wrestlerPage.getContent();
        List<WrestlersDto> content = listOfPokemon.stream().map(this::mapToDto).toList();

        return WrestlersResponse.builder()
                .wrestlersInfo(content)
                .pageNo(wrestlerPage.getNumber())
                .pageSize(wrestlerPage.getSize())
                .totalElements(wrestlerPage.getTotalElements())
                .totalPages(wrestlerPage.getTotalPages()).build();

    }

    private WrestlersDto mapToDto(Wrestler wrestler){
        return WrestlersDto.builder()
                .firstname(wrestler.getFirstname())
                .club(wrestler.getClub())
                .lastname(wrestler.getLastname())
                .birthday(wrestler.getBirthday())
                .gender(wrestler.getGender()).build();

    }

}
