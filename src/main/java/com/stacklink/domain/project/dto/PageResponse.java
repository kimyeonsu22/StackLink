package com.stacklink.domain.project.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;
import java.util.List;

@Getter
public class PageResponse<T> {

    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;

    public static <T> PageResponse<T> of(Page<T> page) {
        PageResponse<T> res = new PageResponse<>();
        res.content       = page.getContent();
        res.page          = page.getNumber();
        res.size          = page.getSize();
        res.totalElements = page.getTotalElements();
        res.totalPages    = page.getTotalPages();
        res.last          = page.isLast();
        return res;
    }
}