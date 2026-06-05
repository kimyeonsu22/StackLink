package com.stacklink.domain.reply.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class ReplyResponse {
    private Long replyId;
    private Long userId;
    private String username;

    private String content;
    private Long parentId;
    private Integer likeCount;

    private LocalDateTime createdAt;

    @Builder.Default
    private List<ReplyResponse> children = new ArrayList<>();
}
