package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.SubscriptionResponse;
import com.stacklink.domain.project.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/{subscribeId}")
    public void subscribe(
            @RequestParam Long userId,
            @PathVariable Long subscribeId
    ) {
        subscriptionService.subscribe(userId, subscribeId);
    }

    @DeleteMapping
    public void cancel(
            @RequestParam Long userId
    ) {
        subscriptionService.cancel(userId);
    }

    @GetMapping
    public SubscriptionResponse getSubscription(
            @RequestParam Long userId
    ) {
        return subscriptionService.getSubscription(userId);
    }



}