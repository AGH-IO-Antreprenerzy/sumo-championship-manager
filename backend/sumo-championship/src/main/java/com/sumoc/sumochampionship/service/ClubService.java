package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.club.ClubRequest;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.repository.ClubRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;

    public String addClub(ClubRequest clubRequest){
        Optional<Club> clubOptional = clubRepository.findByName(clubRequest.getName());
        if (clubOptional.isPresent()){
            return "Error! Club already exists";
        }

        Club club = clubRequest.mapToClub();
        clubRepository.save(club);
        return "Club added successfully";
    }
}
