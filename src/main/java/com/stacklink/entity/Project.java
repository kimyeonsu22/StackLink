package com.stacklink.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String projectname;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer recruitCount;

    private Boolean isClosed;

    private Integer viewCount;

    private Integer favoriteCount;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime deadlineAt;

    private Boolean isDeleted;
}