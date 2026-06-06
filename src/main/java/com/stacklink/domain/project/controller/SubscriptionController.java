package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.SubScriptionRequest;
import com.stacklink.domain.project.dto.SubscriptionResponse;
import com.stacklink.domain.project.entity.Subscribe;
import com.stacklink.domain.project.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping
    public void subscribe(
            Authentication authentication,
            @RequestBody SubScriptionRequest req
            ) {
        Long userId = Long.valueOf(authentication.getName());
        Subscribe subscribe = subscriptionService.findBySubName(req.getSubName());
        subscriptionService.subscribe(userId, subscribe.getId());
    }

    @DeleteMapping
    public void cancel(
            Authentication authentication
    ) {
        Long userId = Long.valueOf(authentication.getName());
        subscriptionService.cancel(userId);
    }

    @GetMapping
    public SubscriptionResponse getSubscription(
            Authentication authentication
    ) {
        Long userId = Long.valueOf(authentication.getName());
        return subscriptionService.getSubscription(userId);
    }



}