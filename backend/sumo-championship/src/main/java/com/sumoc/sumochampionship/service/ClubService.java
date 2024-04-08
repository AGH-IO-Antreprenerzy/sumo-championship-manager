package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.club.ClubDto;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.repository.ClubRepository;
import com.sumoc.sumochampionship.repository.WrestlerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ClubService {

    private final WrestlerRepository wrestlerRepository;

    /*
    Get all Clubs that should be accessed by users
     */
    public List<ClubDto> getAllClubsToUser(WebsiteUser user){
        return user.getOwnedClubs().stream().map(ClubDto::mapToDto).toList();
    }

    /*
    Get Club to Wrestler
     */
    public ClubDto getClubToWrestler(Long wrestlerId){
        Optional<Wrestler> wrestlerOptional = wrestlerRepository.findById(wrestlerId);

        if (wrestlerOptional.isEmpty()){
            throw new EntityNotFoundException("Model not found");
        }

        Wrestler wrestler = wrestlerOptional.get();

        return ClubDto.mapToDto(wrestler.getClub());
    }


}
