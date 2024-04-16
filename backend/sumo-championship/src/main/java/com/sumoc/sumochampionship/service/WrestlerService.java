package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.wrestler.WrestlerDetails;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersDto;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlerRequest;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersResponse;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import com.sumoc.sumochampionship.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
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
    private final WrestlerEnrollmentRepository wrestlerEnrollmentRepository;
    private final CategoryRepository categoryRepository;
    private final WebsiteUserRepository websiteUserRepository;

    /*
    Using Repository collect all Wrestlers belong to WebsiteUser(Trainer)
    Than convert the Page to WrestlersDto
     */
    public WrestlersResponse findAllInClubs(WebsiteUser user, Pageable pageable){
        if (user == null){
            Page<Wrestler> wrestlerPage =  wrestlerRepository.findAll(pageable);
            WrestlersDto.clubRepository = clubRepository;
            List<WrestlersDto> content = wrestlerPage.stream().map(WrestlersDto::mapToDto).toList();

            return WrestlersResponse.builder()
                    .wrestlersInfo(content)
                    .pageNo(wrestlerPage.getNumber())
                    .pageSize(wrestlerPage.getSize())
                    .totalElements(wrestlerPage.getTotalElements())
                    .totalPages(wrestlerPage.getTotalPages()).build();
        }

        Set<Club> ownedClubs = user.getOwnedClubs();
        Page<Wrestler> wrestlerPage = wrestlerRepository.findWrestlerByClubIn(ownedClubs, pageable);

        List<Wrestler> listOfWrestlers = wrestlerPage.getContent();
        WrestlersDto.clubRepository = clubRepository;
        List<WrestlersDto> content = listOfWrestlers.stream().map(WrestlersDto::mapToDto).toList();

        System.out.println("Content = " + content);
        WrestlersDto.clubRepository = clubRepository;

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

        List<WrestlersEnrollment> enrollments = wrestlerEnrollmentRepository
                .findAllByWrestlerAndTournament_ContestEndAfter(wrestler.get(), LocalDate.now());

        return WrestlerDetails.mapToDto(wrestler.get(), enrollments);
    }

    public String modifyWrestler(Long id, WrestlerRequest wrestlerRequest){
        Optional<Wrestler> wrestlerOptional = wrestlerRepository.findById(id);

        if (wrestlerOptional.isEmpty()){
            return "Error! Not find wrestler with id = " + id;
        }
        Wrestler wrestler = wrestlerOptional.get();

        if (!wrestler.getClub().getId().equals(wrestlerRequest.getClubId())){
            Optional<Club> clubOptional = clubRepository.findById(wrestlerRequest.getClubId());

            if (clubOptional.isEmpty()) return "Error! Club with id = " + wrestlerRequest.getClubId() +" does not exists";
            wrestler.setClub(clubOptional.get());
        }

        wrestler.setLastname(wrestlerRequest.getLastname());
        wrestler.setFirstname(wrestlerRequest.getFirstname());
        wrestler.setGender(wrestlerRequest.getGender());
        wrestler.setBirthday(wrestlerRequest.getBirthday());
        wrestlerRepository.save(wrestler);
        return "Success! Wrestler modified";
    }

    /*
    Get all Wrestler that may be accessed by Website User and that fit to Category
     */
    public List<WrestlersDto> filterWrestler(WebsiteUser user, Long categoryId){
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isEmpty()){
            throw new EntityNotFoundException("Category with id = " + categoryId + " not found in database");
        }

        Category category = categoryOptional.get();
        Set<Club> userClubs = user.getOwnedClubs();

        List<Wrestler> clubWrestlers = wrestlerRepository.findAllByClubIn(userClubs);

        WrestlersDto.clubRepository = clubRepository;
        // Filter
        List<WrestlersDto> availableWrestlers = clubWrestlers.stream()
                .filter(wrestler -> wrestler.availableForCategory(category.getMinAge(), category.getMaxAge()))
                .filter(wrestler -> wrestler.getGender() == category.getGender() || category.getGender() == Gender.ALL)
                .map(WrestlersDto::mapToDto)
                .toList();

        return availableWrestlers;
    }

    public List<WrestlersDto> getAllWrestlersToClub(Long clubId){
        Optional<Club> optionalClub = clubRepository.findById(clubId);

        if (optionalClub.isEmpty()){
            throw new EntityNotFoundException("Club with id = " + clubId + " not found in database");
        }


        List<Wrestler> wrestlers = wrestlerRepository.findAllByClubIn(Set.of(optionalClub.get()));
        WrestlersDto.clubRepository = clubRepository;

        System.out.println(wrestlers);

        return wrestlers.stream()
                .map(wrestler -> WrestlersDto.mapToDto_v2(wrestler, optionalClub.get().getName()))
                .toList();
    }

}
