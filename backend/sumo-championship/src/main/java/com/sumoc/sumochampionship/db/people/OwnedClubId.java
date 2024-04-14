package com.sumoc.sumochampionship.db.people;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnedClubId implements Serializable {
    private Long trainer_id;
    private Long club_id;
}