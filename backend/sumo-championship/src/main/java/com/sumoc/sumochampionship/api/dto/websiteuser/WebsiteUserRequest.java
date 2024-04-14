package com.sumoc.sumochampionship.api.dto.websiteuser;

import com.sumoc.sumochampionship.db.people.UserRole;
import com.sumoc.sumochampionship.db.season.Country;
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
    String club; // Optional field for club; string because it can be used to add club
    Country country; // Optional field for country
}
