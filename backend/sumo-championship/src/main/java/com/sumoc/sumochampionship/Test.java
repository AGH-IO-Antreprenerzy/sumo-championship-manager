package com.sumoc.sumochampionship;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="springTest")
public class Test {
    @Id
    Integer id;
}
