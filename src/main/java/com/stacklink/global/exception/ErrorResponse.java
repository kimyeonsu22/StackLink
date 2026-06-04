package com.stacklink.global.exception;

import java.time.LocalDateTime;

/** 모든 에러 응답의 공통 형식 */
public record ErrorResponse(
        int status,
        String message,
        LocalDateTime timestamp
) {
    public static ErrorResponse of(int status, String message) {
        return new ErrorResponse(status, message, LocalDateTime.now());
    }
}