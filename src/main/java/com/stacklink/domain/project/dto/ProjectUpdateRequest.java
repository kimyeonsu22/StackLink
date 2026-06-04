package com.stacklink.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProjectUpdateRequest {

    private String projectname;

    private String content;

    private Integer recruitCount;

    private LocalDateTime deadlineAt;
}