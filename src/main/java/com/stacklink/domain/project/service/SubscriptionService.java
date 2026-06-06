package com.stacklink.domain.project.service;
import com.stacklink.domain.project.dto.SubscriptionResponse;
import com.stacklink.domain.project.entity.SubState;
import com.stacklink.domain.project.entity.Subscribe;
import com.stacklink.domain.project.repository.SubStateRepository;
import com.stacklink.domain.project.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SubscriptionService {

    private final SubStateRepository subStateRepository;

    private final SubscribeRepository subscribeRepository;

    @Transactional(readOnly = true)
    public Subscribe findBySubName(String subName) {
        return subscribeRepository.findBySubName(subName).orElseThrow(() -> new NoSuchElementException("구독 상품이 없습니다."));
    }

    @Transactional
    public void subscribe(Long userId, Long subscribeId) {

        if (subStateRepository.existsByUserId(userId)) {
            SubState subState = subStateRepository.findByUserId(userId).get();
            if (subState.getSubState() == true) {
                throw new RuntimeException("이미 구독중인 사용자입니다.");
            } else {

                // 이미 존재하는 데이터에 대한 업데이트 : Dirty Checking
                subState.setSubState(true);
                subState.setStartDate(LocalDateTime.now());
                subState.setFinishDate(LocalDateTime.now().minusMonths(1));
            }
        } else {
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
    }

    @Transactional
    public void cancel(Long userId) {

        SubState subState = subStateRepository.findByUserId(userId)

                .orElseThrow(() -> new RuntimeException("구독 정보 없음"));

        // 이미 존재하는 데이터에 대한 업데이트 : Dirty Checking
        subState.setSubState(false);
    }

    // loing(외부) -> getSubscription(내부) : 내부 메서드에서 익셉션 발생 시 외부 메서드와는 독립적인 트랜잭션으로 예외처리 수행
    @Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = true)
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