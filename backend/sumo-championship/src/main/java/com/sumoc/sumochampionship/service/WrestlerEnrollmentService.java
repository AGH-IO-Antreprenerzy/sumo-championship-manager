package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.enrollment.WrestlerEnrollmentDto;
import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import com.sumoc.sumochampionship.repository.WrestlerEnrollmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class WrestlerEnrollmentService {
    private final WrestlerEnrollmentRepository wrestlerEnrollmentRepository;

    public List<WrestlerEnrollmentDto> getWrestlerEnrollments(Long tournamentId) throws EntityNotFoundException {
        List<WrestlersEnrollment> wrestlerEnrollments = wrestlerEnrollmentRepository.findAllByTournament_Id(tournamentId);
        return wrestlerEnrollments.stream()
                .map(WrestlerEnrollmentDto::toDto)
                .toList();
    }
}
