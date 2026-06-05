package com.stacklink.domain.reply.service;

import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.entity.User;
import com.stacklink.domain.project.repository.ProjectRepository;
import com.stacklink.domain.project.repository.UserRepository;
import com.stacklink.domain.reply.dto.ReplyCreateRequest;
import com.stacklink.domain.reply.dto.ReplyResponse;
import com.stacklink.domain.reply.dto.ReplyUpdateRequest;
import com.stacklink.domain.reply.entity.Reply;
import com.stacklink.domain.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // 댓글 작성
    public void createReply(Long userId, Long projectId, ReplyCreateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new IllegalArgumentException("프로젝트 없음"));

        Reply parent = null;

        if(request.getParentId() != null) {
            parent = replyRepository.findById(request.getParentId()).orElseThrow(() -> new IllegalArgumentException("부모 댓글 없음"));
        }

        Reply reply = Reply.builder()
                .user(user)
                .project(project)
                .replyContent(request.getContent())
                .parent(parent)
                .build();

        replyRepository.save(reply);
    }

    // 댓글 수정
    public void updateReply(Long userId, Long replyId, ReplyUpdateRequest request) {
        Reply reply = replyRepository.findById(replyId).orElseThrow(() -> new IllegalArgumentException("댓글 없음"));

        if(!reply.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("작성자만 수정 가능");
        }

        reply.updateContent(request.getContent());
    }

    // 댓글 삭제
    public void deleteReply(Long userId, Long replyId) {
        Reply reply = replyRepository.findById(replyId).orElseThrow(() -> new IllegalArgumentException("댓글 없음"));

        if(!reply.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("작성자만 삭제 가능");
        }

        reply.delete();
    }

    // 댓글 조회
    @Transactional(readOnly = true)
    public List<ReplyResponse> getReplies(Long projectId){
        List<Reply> replies = replyRepository.findByProjectIdOrderByCreatedAtAsc(projectId);

        Map<Long, ReplyResponse> replyMap = new LinkedHashMap<>();

        for(Reply reply : replies) {
            ReplyResponse dto = ReplyResponse.builder()
                    .replyId(reply.getId())
                    .userId(reply.getUser().getId())
                    .username(reply.getUser().getUsername())
                    .content(Boolean.TRUE.equals(reply.getIsDeleted())?"삭제된 댓글입니다." : reply.getReplyContent())
                    .parentId(reply.getParent() == null ? null : reply.getParent().getId())
                    .likeCount(reply.getLikeCount())
                    .createdAt(reply.getCreatedAt())
                    .children(new ArrayList<>())
                    .build();
            replyMap.put(reply.getId(), dto);
        }

        List<ReplyResponse> result = new ArrayList<>();

        for(Reply reply : replies) {
            ReplyResponse current = replyMap.get(reply.getId());

            if(reply.getParent() == null){
                result.add(current);
            } else {
                ReplyResponse parent = replyMap.get(reply.getParent().getId());

                if(parent != null) {
                    parent.getChildren().add(current);
                }
            }
        }

        return result;
    }
}
