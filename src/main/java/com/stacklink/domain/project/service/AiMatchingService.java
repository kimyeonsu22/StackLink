package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.AiMatchingResponse;
import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.entity.SubState;
import com.stacklink.domain.project.repository.ProjectRepository;
import com.stacklink.domain.project.repository.SubStateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AiMatchingService {

    private final ProjectRepository projectRepository;
    private final SubStateRepository subStateRepository;
    private final RestTemplate restTemplate;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Value("${openai.api.url}")
    private String openaiApiUrl;

    @Value("${openai.api.model}")
    private String openaiModel;

    // 구독 여부 확인
    public boolean isSubscribed(Long userId) {
        return subStateRepository.findByUserId(userId)
                .map(SubState::getSubState)
                .orElse(false);
    }

    // AI 매칭 추천
    public List<AiMatchingResponse> getAiMatching(Long userId, String userTechStack) {

        List<Project> projects = projectRepository.findByIsDeletedFalseAndIsClosedFalse();

        if (projects.isEmpty()) {
            return Collections.emptyList();
        }

        String prompt = buildPrompt(userTechStack, projects);
        String aiResponse = callOpenAi(prompt);
        return parseAiResponse(aiResponse, projects);
    }

    private String buildPrompt(String userTechStack, List<Project> projects) {
        StringBuilder sb = new StringBuilder();
        sb.append("사용자의 기술스택: ").append(userTechStack).append("\n\n");
        sb.append("현재 모집 중인 프로젝트 목록:\n");
        for (Project p : projects) {
            sb.append("- ID: ").append(p.getId())
                    .append(", 프로젝트명: ").append(p.getProjectName())
                    .append(", 내용: ").append(p.getContent()).append("\n");
        }
        sb.append("\n위 사용자에게 가장 적합한 프로젝트 3개를 추천해줘. ");
        sb.append("반드시 아래 JSON 배열 형식으로만 응답해줘. 다른 텍스트는 절대 포함하지 마:\n");
        sb.append("[{\"projectId\": 1, \"reason\": \"추천이유\", \"score\": 0.95}]");
        return sb.toString();
    }

    private String callOpenAi(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", openaiModel);
        requestBody.put("messages", List.of(message));
        requestBody.put("max_tokens", 1000);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                openaiApiUrl,
                HttpMethod.POST,
                entity,
                String.class
        );

        return response.getBody();
    }

    @SuppressWarnings("unchecked")
    private List<AiMatchingResponse> parseAiResponse(String aiResponse, List<Project> projects) {
        try {
            RestTemplate rt = new RestTemplate();
            Map<String, Object> responseMap = rt.getForObject("data:application/json," + aiResponse, Map.class);

            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> messageMap = (Map<String, Object>) choices.get(0).get("message");
            String content = (String) messageMap.get("content");

            List<Map<String, Object>> recommendations = rt.getForObject("data:application/json," + content, List.class);

            List<AiMatchingResponse> result = new ArrayList<>();

            for (Map<String, Object> rec : recommendations) {
                Long projectId = Long.valueOf(rec.get("projectId").toString());
                String reason = (String) rec.get("reason");
                Double score = Double.valueOf(rec.get("score").toString());

                projects.stream()
                        .filter(p -> p.getId().equals(projectId))
                        .findFirst()
                        .ifPresent(p -> result.add(AiMatchingResponse.builder()
                                .projectId(p.getId())
                                .projectName(p.getProjectName())
                                .content(p.getContent())
                                .reason(reason)
                                .score(score)
                                .build()));
            }
            return result;

        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}