package com.sumoc.sumochampionship.db.people;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;


/**
 * Model for users. Implements UserDetails.
 * We will be using UserDetails when implementing User Authorisation and Authentications.
 * To authenticate the user will provide email and password (that's why email is set to be unique)
 * Additionally there is UserRole which may be {ADMIN, NATIONAL_TRAINER, CLUB_TRAINER, UNREGISTERED}.
 * All of theirs authorities we can find in out User Stories
 * ownedClubs attribute stands for Clubs where User can modify parameters (like adding Wrestlers etc...)
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebsiteUser implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;

    private String firstname;
    private String lastname;

    @Column(unique = true)
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @ManyToMany
    @JoinTable(name = "owned_clubs",
            joinColumns = @JoinColumn(name = "trainer_id"),
            inverseJoinColumns = @JoinColumn(name = "club_id"))
    private Set<Club> ownedClubs;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());

        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
