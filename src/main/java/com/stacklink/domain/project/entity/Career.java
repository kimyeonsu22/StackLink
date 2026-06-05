package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "career")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "career_detail", nullable = false, length = 20)
    private String careerDetail;
}
