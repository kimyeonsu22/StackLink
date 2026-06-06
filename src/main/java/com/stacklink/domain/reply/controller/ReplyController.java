package com.stacklink.domain.reply.controller;

import com.stacklink.domain.reply.dto.ReplyCreateRequest;
import com.stacklink.domain.reply.dto.ReplyResponse;
import com.stacklink.domain.reply.dto.ReplyUpdateRequest;
import com.stacklink.domain.reply.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects/{projectId}/replies")
public class ReplyController {
    private final ReplyService replyService;

    // 댓글 작성
    @PostMapping
    public ResponseEntity<String> createReply(Authentication authentication,
                                              @PathVariable Long projectId,
                                              @RequestBody ReplyCreateRequest reply) {
        Long userId = Long.valueOf(authentication.getName());

        replyService.createReply(userId, projectId, reply);

        return ResponseEntity.ok("댓글 작성 완료");
    }

    // 댓글 수정
    @PatchMapping("/{replyId}")
    public ResponseEntity<String> updateReply(Authentication authentication,
                                              @PathVariable Long projectId,
                                              @PathVariable Long replyId,
                                              @RequestBody ReplyUpdateRequest reply) {
        Long userId = Long.valueOf(authentication.getName());

        replyService.updateReply(userId, replyId, reply);

        return ResponseEntity.ok("댓글 수정 완료");
    }

    // 댓글 삭제
    @DeleteMapping("/{replyId}")
    public ResponseEntity<String> deleteReply(Authentication authentication,
                                              @PathVariable Long projectId,
                                              @PathVariable Long replyId) {
        Long userId = Long.valueOf(authentication.getName());

        replyService.deleteReply(userId, replyId);

        return ResponseEntity.ok("댓글 삭제 완료");
    }

    // 댓글 조회
    @GetMapping
    public ResponseEntity<List<ReplyResponse>> getReplies(@PathVariable Long projectId){
        return ResponseEntity.ok(replyService.getReplies(projectId));
    }
}
