package com.stacklink.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subscribe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 구독 모델 이름 (예: FREE, PREMIUM)
    private String subName;

    // 월 구독 가격
    private Integer subPriceMonth;
}