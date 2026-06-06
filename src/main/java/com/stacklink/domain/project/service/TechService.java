package com.stacklink.domain.project.service;

import com.stacklink.domain.project.entity.Tech;
import com.stacklink.domain.project.repository.TechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TechService {

    private final TechRepository techRepository;

    public Optional<Tech> findByTechName(String name) {
        return techRepository.findByTechName(name);
    }

}
