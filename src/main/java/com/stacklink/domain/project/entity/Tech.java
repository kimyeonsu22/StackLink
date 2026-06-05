package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tech")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Tech {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tech_name", nullable = false, length = 20)
    private String techName;
}
