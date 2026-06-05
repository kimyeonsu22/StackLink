package com.stacklink.domain.project.service;
import com.stacklink.domain.project.dto.SubscriptionResponse;
import com.stacklink.domain.project.entity.SubState;
import com.stacklink.domain.project.entity.Subscribe;
import com.stacklink.domain.project.repository.SubStateRepository;
import com.stacklink.domain.project.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class SubscriptionService {

    private final SubStateRepository subStateRepository;

    private final SubscribeRepository subscribeRepository;

    public void subscribe(Long userId, Long subscribeId) {

        if (subStateRepository.existsByUserId(userId)) {
            throw new RuntimeException("이미 구독중인 사용자입니다.");
        }

        Subscribe subscribe = subscribeRepository.findById(subscribeId)
                .orElseThrow(() -> new RuntimeException("구독 상품 없음"));

        SubState subState = SubState.builder()
                .userId(userId)
                .subId(subscribe.getId())
                .startDate(LocalDateTime.now())
                .finishDate(LocalDateTime.now().plusMonths(1))
                .subState(true)
                .build();

        subStateRepository.save(subState);
    }

    public void cancel(Long userId) {

        SubState subState = subStateRepository.findByUserId(userId)

                .orElseThrow(() -> new RuntimeException("구독 정보 없음"));

        subState.setSubState(false);

        subStateRepository.save(subState);

    }

    @Transactional(readOnly = true)
    public SubscriptionResponse getSubscription(Long userId) {

        SubState subState = subStateRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("구독 정보 없음"));

        Subscribe subscribe = subscribeRepository.findById(subState.getSubId())
                .orElseThrow(() -> new RuntimeException("구독 상품 없음"));

        return SubscriptionResponse.builder()
                .userId(subState.getUserId())
                .subId(subState.getSubId())
                .subName(subscribe.getSubName())
                .startDate(subState.getStartDate())
                .finishDate(subState.getFinishDate())
                .subState(subState.getSubState())
                .build();
    }

}