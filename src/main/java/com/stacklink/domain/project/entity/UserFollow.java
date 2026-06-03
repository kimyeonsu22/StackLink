package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "follow")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserFollow {
    @EmbeddedId
    private UserFollowId id;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "user_id")
    private User follower;

    @ManyToOne
    @MapsId("followingId")
    @JoinColumn(name = "follow_id")
    private User following;

    private LocalDateTime createdAt;

    public UserFollow(User follower, User following) {
        this.id = new UserFollowId(follower.getId(), following.getId());
        this.follower = follower;
        this.following = following;
        this.createdAt = LocalDateTime.now();
    }

}
