package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.wrestler.WrestlerDetails;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersDto;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlerRequest;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersResponse;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.repository.ClubRepository;
import com.sumoc.sumochampionship.repository.WrestlerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Service responsible for main logic for manipulating data from Wrestlers Table
 */
@Service
@AllArgsConstructor
public class WrestlerService {
    private final WrestlerRepository wrestlerRepository;
    private final ClubRepository clubRepository;

    /*
    Using Repository collect all Wrestlers belong to WebsiteUser(Trainer)
    Than convert the Page to WrestlersDto
     */
    public WrestlersResponse findAllInClubs(WebsiteUser user, Pageable pageable){
        if (user == null){
            // TODO: Refactor this to sth that make more sense
            return WrestlersResponse.builder().build();
        }
        Set<Club> ownedClubs = user.getOwnedClubs();
        Page<Wrestler> wrestlerPage = wrestlerRepository.findWrestlerByClubIn(ownedClubs, pageable);

        List<Wrestler> listOfPokemon = wrestlerPage.getContent();
        List<WrestlersDto> content = listOfPokemon.stream().map(WrestlersDto::mapToDto).toList();

        return WrestlersResponse.builder()
                .wrestlersInfo(content)
                .pageNo(wrestlerPage.getNumber())
                .pageSize(wrestlerPage.getSize())
                .totalElements(wrestlerPage.getTotalElements())
                .totalPages(wrestlerPage.getTotalPages()).build();

    }

    /*
    Add Wrestler to system. Assume, that in the system there may be two wrestlers with the same names
    Birthday of wrestler has to be in the past
    Check only if the wrestler club exists
     */
    public String addWrestler(WrestlerRequest wrestlerRequest){
        // Check if birthday is in the past
        if (wrestlerRequest.getBirthday().isAfter(LocalDate.now())){
            return "Error!  Birthday of wrestler has to be in the past";
        }

        // Check if club with provided id exists
        Optional<Club> club = clubRepository.findById(wrestlerRequest.getClubId());
        if (club.isEmpty()){
            return "Error! Club with " + wrestlerRequest.getClubId() + " id does not exists";
        }

        Wrestler wrestler = wrestlerRequest.mapToWrestler(club.get());

        wrestlerRepository.save(wrestler);

        return "Wrestler saved";
    }

    /*
    Delete Wrestler from the system by his id
     */
    public String deleteWrestler(Long id){
        if (!wrestlerRepository.existsById(id)){
            return "Error! Wrestler with id = " + id + " does not exists in the system";
        }
        wrestlerRepository.deleteById(id);
        return "Wrestler deleted";
    }

    public WrestlerDetails getWrestlerDetails(Long id){
        Optional<Wrestler> wrestler = wrestlerRepository.findById(id);

        if (wrestler.isEmpty()){
            throw  new EntityNotFoundException("Wrestler with id = " + id + " is not found");
        }

        return WrestlerDetails.mapToDto(wrestler.get());
    }

}
