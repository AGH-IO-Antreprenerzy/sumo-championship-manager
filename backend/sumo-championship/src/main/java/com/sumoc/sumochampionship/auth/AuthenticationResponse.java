package com.sumoc.sumochampionship.auth;

import com.sumoc.sumochampionship.db.people.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private long id;
    private String email;
    private String firstname;
    private String lastname;

    private String token;
    private UserRole role;
}
