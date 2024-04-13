package com.sumoc.sumochampionship.api.dto.websiteuser;

import com.sumoc.sumochampionship.db.people.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WebsiteUserRequest {
    String email;
    String firstname;
    String lastname;
    String password;
    UserRole userRole;
}
