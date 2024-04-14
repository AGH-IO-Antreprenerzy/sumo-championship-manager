package com.sumoc.sumochampionship.db.people;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(OwnedClubId.class)
@Table(name = "owned_clubs")
public class OwnedClub {
    @Id
    private Long trainer_id;

    @Id
    private Long club_id;
}
