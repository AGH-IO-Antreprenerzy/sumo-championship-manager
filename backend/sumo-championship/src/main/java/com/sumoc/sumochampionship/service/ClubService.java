package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.club.ClubDto;

import com.sumoc.sumochampionship.api.dto.club.ClubRequest;

import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Country;
import com.sumoc.sumochampionship.repository.ClubRepository;
import com.sumoc.sumochampionship.repository.WrestlerRepository;
import jakarta.persistence.EntityNotFoundException;

import lombok.AllArgsConstructor;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;
    private final WrestlerRepository wrestlerRepository;

    public String addClub(ClubRequest clubRequest) {
        Optional<Club> clubOptional = clubRepository.findByName(clubRequest.getName());

        if (!Country.exists(clubRequest.getNationality())){
            return "Error! Nationality " + clubRequest.getNationality() + " not supported by our system";
        }

        if (clubOptional.isPresent()) {
            return "Error! Club already exists";
        }

        Club club = clubRequest.mapToClub();
        clubRepository.save(club);
        return "Club added successfully";
    }

    public List<ClubDto> getAllClubsToUser(WebsiteUser user) {
        return user.getOwnedClubs().stream().map(ClubDto::mapToDto).toList();
    }

    public ClubDto getClubToWrestler(Long wrestlerId) {
        Optional<Wrestler> wrestlerOptional = wrestlerRepository.findById(wrestlerId);

        if (wrestlerOptional.isEmpty()) {
            throw new EntityNotFoundException("Model not found");
        }

        Wrestler wrestler = wrestlerOptional.get();

        return ClubDto.mapToDto(wrestler.getClub());
    }

    public List<ClubDto> getAllClubsToCountry(String countryName) {
        return clubRepository.findByNationality(countryName).stream().map(ClubDto::mapToDto).toList();
    }
}