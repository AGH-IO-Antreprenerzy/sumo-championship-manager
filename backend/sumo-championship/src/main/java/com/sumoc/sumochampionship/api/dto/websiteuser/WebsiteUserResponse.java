package com.sumoc.sumochampionship.api.dto.websiteuser;

import com.sumoc.sumochampionship.db.people.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebsiteUserResponse {
    private long id;
    private String email;
    private String firstname;
    private String lastname;
    private UserRole userRole;

}
