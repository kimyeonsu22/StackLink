package com.stacklink.controller;

import com.stacklink.service.ProjectFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favorites")
public class ProjectFavoriteController {
    private final ProjectFavoriteService projectFavoriteService;

    @PostMapping("/{projectId}")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long projectId){
        Long userId = 1L;

        boolean liked = projectFavoriteService.toggleFavorite(userId, projectId);

        return ResponseEntity.ok(Map.of("liked", liked));
    }

}
