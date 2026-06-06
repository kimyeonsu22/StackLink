package com.stacklink.domain.project.entity;

import com.stacklink.domain.project.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 작성자(채용 회원)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User author;

    @Column(name = "projectname", nullable = false, length = 30)
    private String projectName;

    //    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "project_category", nullable = false)
    private String projectCategory;

    @Column(name = "project_type", nullable = false)
    private String projectType;

    @Column(name = "recruit_count", nullable = false)
    private int recruitCount;

    @Column(name = "is_closed", nullable = false)
    private boolean isClosed;

    @Column(name = "view_count", nullable = false)
    private int viewCount;

    @Column(name = "favorite_count", nullable = false)
    private int favoriteCount;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deadline_at", nullable = false)
    private LocalDateTime deadlineAt;

    @Column(name = "project_start", nullable = false)
    private LocalDateTime projectStartDate;

    @Column(name = "project_end", nullable = false)
    private LocalDateTime projectEndDate;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @Transient
    private Integer hotScore;

    @OneToMany(mappedBy = "project")
    private List<ProjectApply> applies = new ArrayList<>();
}