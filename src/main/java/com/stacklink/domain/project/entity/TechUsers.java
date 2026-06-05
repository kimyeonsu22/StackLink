package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tech_users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechUsers {

    @EmbeddedId
    private TechUsersId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @MapsId("techId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tech_id")
    private Tech tech;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id")
    private Career career;

    public TechUsers(User user, Tech tech, Career career) {
        this.id = new TechUsersId(user.getId(), tech.getId());
        this.user = user;
        this.tech = tech;
        this.career = career;
    }
}
