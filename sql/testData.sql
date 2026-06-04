USE stacklink;

-- ===== tech (기술스택) =====
INSERT INTO tech (tech_name) VALUES
('JAVA'),
('Spring Boot'),
('Spring Security'),
('JPA'),
('QueryDSL'),
('SQL/RDBMS'),
('NoSQL'),
('C++'),
('C#'),
('Embedded'),
('HTML5'),
('CSS3'),
('JavaScript'),
('TypeScript'),
('React.js'),
('Vue.js'),
('Kotlin'),
('Swift'),
('Tailwind CSS');

-- ===== career (경력) =====
INSERT INTO career (career_detail) VALUES
('1년 미만'),
('1년 이상 ~ 3년 미만'),
('3년 이상 ~ 5년 미만'),
('5년 이상 ~ 7년 미만'),
('7년 이상 ~ 10년 미만'),
('10년 이상');

-- ===== subscribe (구독 플랜) =====
INSERT INTO subscribe (sub_name, sub_price_month) VALUES
('FREE', 0),
('PRO', 9900);

-- ===== users =====
-- 공통 비밀번호: Test1234!
INSERT INTO users (username, password, nickname, email, phone_number, role, position, created_at, updated_at, is_deleted) VALUES
('관리자', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '관리자', 'admin@stacklink.com', '010-0000-0000', 'ADMIN', '관리자', NOW(), NOW(), false),
('김민우', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '김민우', 'kimminwoo@stacklink.com', '010-1234-5678', 'APPLICANT', '백엔드', NOW(), NOW(), false),
('이수연', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '이수연', 'leesuyeon@stacklink.com', '010-2345-6789', 'APPLICANT', '프론트엔드', NOW(), NOW(), false),
('박지훈', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '박지훈', 'parkjihun@stacklink.com', '010-3456-7890', 'APPLICANT', '백엔드', NOW(), NOW(), false);

-- ===== tech_users (회원 기술스택) =====
-- 김민우(id=2): Spring Boot(2)-3년이상~5년미만(3), JAVA(1)-3년이상~5년미만(3), JPA(4)-1년이상~3년미만(2)
INSERT INTO tech_users (user_id, tech_id, career_id) VALUES
(2, 2, 3), (2, 1, 3), (2, 4, 2),
-- 이수연(id=3): React.js(15)-1년이상~3년미만(2), TypeScript(14)-1년미만(1), CSS3(12)-1년이상~3년미만(2)
(3, 15, 2), (3, 14, 1), (3, 12, 2),
-- 박지훈(id=4): Spring Boot(2)-5년이상~7년미만(4), JAVA(1)-5년이상~7년미만(4), NoSQL(7)-1년이상~3년미만(2)
(4, 2, 4), (4, 1, 4), (4, 7, 2);

-- ===== project =====
INSERT INTO project (user_id, projectname, content, recruit_count, is_closed, view_count, favorite_count, created_at, updated_at, deadline_at, is_deleted) VALUES
(2, 'AI 기반 학습 관리 플랫폼 개발', 'AI 기반으로 개인 맞춤형 학습 경로를 추천해주는 학습 관리 플랫폼을 개발하고 있습니다. 함께 성장할 팀원을 모집합니다.', 3, false, 142, 18, NOW(), NOW(), '2026-08-30 00:00:00', false),
(3, '쇼핑몰 리뉴얼 프로젝트', '기존 쇼핑몰 서비스를 React 기반으로 전면 리뉴얼하는 프로젝트입니다. UI/UX 개선에 관심 있는 분을 모집합니다.', 2, false, 89, 10, NOW(), NOW(), '2026-07-31 00:00:00', false),
(4, '실시간 협업 문서 편집 도구', '구글 독스와 같은 실시간 협업 문서 편집 도구를 직접 구현해보는 프로젝트입니다.', 4, false, 210, 25, NOW(), NOW(), '2026-09-15 00:00:00', false);

-- ===== project_tech =====
-- project 1: JAVA(1), Spring Boot(2), JPA(4), SQL/RDBMS(6)
INSERT INTO project_tech (tech_id, project_id) VALUES
(1, 1), (2, 1), (4, 1), (6, 1),
-- project 2: React.js(15), TypeScript(14), CSS3(12)
(15, 2), (14, 2), (12, 2),
-- project 3: JAVA(1), Spring Boot(2), NoSQL(7)
(1, 3), (2, 3), (7, 3);

-- ===== project_apply =====
-- 이수연(id=3)이 project 1에 지원
INSERT INTO project_apply (user_id, project_id, status, applied_at, content, position) VALUES
(3, 1, '수락 대기중', NOW(), '프론트엔드 개발 경험을 살려 열심히 기여하겠습니다!', '프론트엔드'),
-- 박지훈(id=4)이 project 1에 지원
(4, 1, '수락 대기중', NOW(), '백엔드 경험을 바탕으로 열심히 하겠습니다.', '백엔드');
