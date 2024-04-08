package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.enrollment.WrestlerEnrollmentDto;
import com.sumoc.sumochampionship.api.dto.wrestlerenrollment.WrestlerEnrollmentRequest;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.db.season.Tournament;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import com.sumoc.sumochampionship.repository.CategoryRepository;
import com.sumoc.sumochampionship.repository.TournamentRepository;
import com.sumoc.sumochampionship.repository.WrestlerEnrollmentRepository;
import com.sumoc.sumochampionship.repository.WrestlerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class WrestlerEnrollmentService {
    private final WrestlerEnrollmentRepository wrestlerEnrollmentRepository;
    private final TournamentRepository tournamentRepository;
    private final WrestlerRepository wrestlerRepository;
    private final CategoryRepository categoryRepository;

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


    private boolean mayWrestlerEnroll(WrestlerEnrollmentRequest request){
        Optional<Tournament> tournamentOptional = tournamentRepository.findById(request.getTournamentId());

        if (tournamentOptional.isEmpty()) return false;

        Optional<Wrestler> wrestlerOptional = wrestlerRepository.findById(request.getWrestlerId());

        if (wrestlerOptional.isEmpty()) return false;
        Wrestler wrestler = wrestlerOptional.get();

        for(Long categoryId: request.getCategoriesId()){
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

            if(categoryOptional.isEmpty()) return false;
            Category category = categoryOptional.get();

            // Check age
            long age = ChronoUnit.YEARS.between(LocalDate.now(), wrestler.getBirthday());
            if(!(age >= category.getMinAge() && age <= category.getMaxAge())) return false;
        }

        return true;
    }
}
