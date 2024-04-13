package com.sumoc.sumochampionship.api.dto.wrestlerenrollment;

import com.sumoc.sumochampionship.db.season.WrestlersEnrollment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WrestlerEnrollmentResponse {
    List<WrestlerEnrollmentDto2> enrollments;
}
