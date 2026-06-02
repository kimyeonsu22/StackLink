package com.stacklink.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProjectCreateRequest {

    private String projectname;

    private String title;

    private String content;

    private Integer recruitCount;

    private LocalDateTime deadlineAt;
}