package com.stacklink.domain.reply.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReplyCreateRequest {
    private String content;
    private Long parentId;
}
