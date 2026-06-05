package com.stacklink.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProjectCreateRequest {

    private String projectname;

    private String content;

    private Integer recruitCount;

    private LocalDateTime deadlineAt;

    // !!! 필요한 기술 스택 담아야 함 !!!!
    private List<String> techNames;
}