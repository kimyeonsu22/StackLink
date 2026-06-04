package com.stacklink.service;

import com.stacklink.dto.AiMatchingResponse;
import com.stacklink.entity.Project;
import com.stacklink.entity.SubState;
import com.stacklink.repository.ProjectRepository;
import com.stacklink.repository.SubStateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;

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

        // 모집 중인 공고 전체 조회
        List<Project> projects = projectRepository.findByIsDeletedFalseAndIsClosedFalse();

        if (projects.isEmpty()) {
            return Collections.emptyList();
        }

        // OpenAI에 넘길 프롬프트 구성
        String prompt = buildPrompt(userTechStack, projects);

        // OpenAI API 호출
        String aiResponse = callOpenAi(prompt);

        // 결과 파싱 후 반환
        return parseAiResponse(aiResponse, projects);
    }

    // 프롬프트 구성
    private String buildPrompt(String userTechStack, List<Project> projects) {
        StringBuilder sb = new StringBuilder();
        sb.append("사용자의 기술스택: ").append(userTechStack).append("\n\n");
        sb.append("현재 모집 중인 프로젝트 목록:\n");
        for (Project p : projects) {
            sb.append("- ID: ").append(p.getId())
                    .append(", 제목: ").append(p.getTitle())
                    .append(", 내용: ").append(p.getContent()).append("\n");
        }
        sb.append("\n위 사용자에게 가장 적합한 프로젝트 3개를 추천해줘. ");
        sb.append("반드시 아래 JSON 배열 형식으로만 응답해줘. 다른 텍스트는 절대 포함하지 마:\n");
        sb.append("[{\"projectId\": 1, \"reason\": \"추천이유\", \"score\": 0.95}]");
        return sb.toString();
    }

    // OpenAI API 호출
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

    // AI 응답 파싱 (Map 방식으로 변경)
    @SuppressWarnings("unchecked")
    private List<AiMatchingResponse> parseAiResponse(String aiResponse, List<Project> projects) {
        try {
            // RestTemplate 기본 내장 변환 사용
            Map<String, Object> responseMap = new RestTemplate()
                    .getForObject("data:application/json," + aiResponse, Map.class);

            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> messageMap = (Map<String, Object>) choices.get(0).get("message");
            String content = (String) messageMap.get("content");

            // content 파싱
            List<Map<String, Object>> recommendations = new RestTemplate()
                    .getForObject("data:application/json," + content, List.class);

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
                                .projectName(p.getProjectname())
                                .title(p.getTitle())
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