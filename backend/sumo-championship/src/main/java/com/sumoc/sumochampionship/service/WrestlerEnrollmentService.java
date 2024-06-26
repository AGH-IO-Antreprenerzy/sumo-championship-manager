package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.enrollment.WrestlerEnrollmentDto;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersDto;
import com.sumoc.sumochampionship.api.dto.wrestlerenrollment.WrestlerEnrollmentDto2;
import com.sumoc.sumochampionship.api.dto.wrestlerenrollment.WrestlerEnrollmentRequest;
import com.sumoc.sumochampionship.api.dto.wrestlerenrollment.WrestlerEnrollmentResponse;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import com.sumoc.sumochampionship.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class WrestlerEnrollmentService {
    private final WrestlerEnrollmentRepository wrestlerEnrollmentRepository;
    private final TournamentRepository tournamentRepository;
    private final WrestlerRepository wrestlerRepository;
    private final CategoryRepository categoryRepository;
    private final ClubRepository clubRepository;

    public List<WrestlerEnrollmentDto> getWrestlerEnrollments(Long tournamentId) throws EntityNotFoundException {
        List<WrestlersEnrollment> wrestlerEnrollments = wrestlerEnrollmentRepository.findAllByTournament_Id(tournamentId);
        return wrestlerEnrollments.stream()
                .map(WrestlerEnrollmentDto::toDto)
                .toList();
    }


    public String enrollWrestlers(List<WrestlerEnrollmentRequest> request) {

        // Check if all wrestlers has got authority to enroll
        for (WrestlerEnrollmentRequest wr : request) {
            if (!mayWrestlerEnroll(wr)) {
                return "Error! Provided wrong enrollment";
            }
            Tournament tournament = tournamentRepository.findById(wr.getTournamentId()).get();

            Wrestler wrestler = wrestlerRepository.findById(wr.getWrestlerId()).get();

            for (Long categoryId : wr.getCategoriesId()) {
                Category category = categoryRepository.findById(categoryId).get();

                wrestlerEnrollmentRepository.save(WrestlersEnrollment.builder()
                                                    .wrestler(wrestler)
                                                    .category(category)
                                                    .tournament(tournament)
                                                    .build());

            }
        }
        return "Wrestlers enrolled";
    }

    public WrestlerEnrollmentResponse getWrestlerToTrainerAndTournament(WebsiteUser trainer, Long tournamentId){
        Optional<Tournament> tournamentOptional = tournamentRepository.findById(tournamentId);

        if (tournamentOptional.isEmpty())
            throw new EntityNotFoundException("Tournament with id = " + tournamentId + " not found");

        List<WrestlersEnrollment> we = wrestlerEnrollmentRepository.findAllByTournament_Id(tournamentId);
        List<WrestlerEnrollmentDto2> wrestlers = we.stream()
                .map(enroll -> {
                    return WrestlerEnrollmentDto2.mapToDto(enroll.getWrestler(), enroll.getCategory());
                })
                .toList();

        Set<Club> trainersClubs = trainer.getOwnedClubs();
        Set<Long> clubIds = trainersClubs.stream().map(Club::getId).collect(Collectors.toSet());

        List<WrestlerEnrollmentDto2> trainersWrestlers = wrestlers.stream()
                .filter(we2 -> {return clubIds.contains(we2.getWrestler().getClubId());})
                .toList();

        return WrestlerEnrollmentResponse.builder()
                .enrollments(trainersWrestlers)
                .build();
    }

    public WrestlerEnrollmentResponse getAllWrestlersToTournament(Long tournamentId){
        Optional<Tournament> tournamentOptional = tournamentRepository.findById(tournamentId);

        if (tournamentOptional.isEmpty())
            throw new EntityNotFoundException("Tournament with id = " + tournamentId + " not found");

        List<WrestlersEnrollment> we = wrestlerEnrollmentRepository.findAllByTournament_Id(tournamentId);

        WrestlersDto.clubRepository = clubRepository;
        List<WrestlerEnrollmentDto2> wrestlers = we.stream()
                .map(enroll -> {
                    return WrestlerEnrollmentDto2.mapToDto(enroll.getWrestler(), enroll.getCategory());
                })
                .toList();

        return WrestlerEnrollmentResponse.builder()
                .enrollments(wrestlers)
                .build();

    }

    private boolean mayWrestlerEnroll(WrestlerEnrollmentRequest request){
        Optional<Tournament> tournamentOptional = tournamentRepository.findById(request.getTournamentId());

        System.out.println("Wrestler_id " + request.getWrestlerId());
        System.out.println("Tournament_id " + request.getTournamentId());
        System.out.println("Category_id " + request.getCategoriesId());
        if (tournamentOptional.isEmpty())
            return false;

        Tournament tournament = tournamentOptional.get();

        Optional<Wrestler> wrestlerOptional = wrestlerRepository.findById(request.getWrestlerId());

        if (wrestlerOptional.isEmpty())
            return false;


        Wrestler wrestler = wrestlerOptional.get();

        for(Long categoryId: request.getCategoriesId()){
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

            if(categoryOptional.isEmpty())
                return false;
            Category category = categoryOptional.get();

            // Check age

            if(!wrestler.availableForTournamentCategory(category.getMinAge(), category.getMaxAge(),
                    tournament.getContestStart()))
                return false;

        }

        return true;
    }
}
