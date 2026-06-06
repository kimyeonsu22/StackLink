package com.stacklink.domain.project.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SubscriptionResponse {

    private Long userId;
    private Long subId;
    private String subName;
    private LocalDateTime startDate;
    private LocalDateTime finishDate;
    private boolean subState;
}