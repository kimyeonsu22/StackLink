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
(2, 'AI 기반 학습 관리 플랫폼 개발', 'AI 기반으로 개인 맞춤형 학습 경로를 추천해주는 학습 관리 플랫폼을 개발하고 있습니다. 함께 성장할 팀원을 모집합니다.', 3, false, 0, 0, NOW(), NOW(), '2026-08-30 00:00:00', false),
(3, '쇼핑몰 리뉴얼 프로젝트', '기존 쇼핑몰 서비스를 React 기반으로 전면 리뉴얼하는 프로젝트입니다. UI/UX 개선에 관심 있는 분을 모집합니다.', 2, false, 0, 0, NOW(), NOW(), '2026-07-31 00:00:00', false),
(4, '실시간 협업 문서 편집 도구', '구글 독스와 같은 실시간 협업 문서 편집 도구를 직접 구현해보는 프로젝트입니다.', 4, false, 0, 0, NOW(), NOW(), '2026-09-15 00:00:00', false);

-- ===== project_tech =====
-- project 1: JAVA(1), Spring Boot(2), JPA(4), SQL/RDBMS(6)
INSERT INTO project_tech (tech_id, project_id) VALUES
(1, 1), (2, 1), (4, 1), (6, 1),
-- project 2: React.js(15), TypeScript(14), CSS3(12)
(15, 2), (14, 2), (12, 2),
-- project 3: JAVA(1), Spring Boot(2), NoSQL(7)
(1, 3), (2, 3), (7, 3);

-- project_apply, project_favorite 초기 상태 (데이터 없음)

-- ===== sub_state (구독 상태) =====
-- subscribe: FREE(1), PRO(2)
-- 김민우(2), 이수연(3), 박지훈(4) 모두 PRO 구독 중
INSERT INTO sub_state (user_id, sub_id, start_date, finish_date, sub_state) VALUES
(2, 2, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), true),
(3, 2, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), true),
(4, 2, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), true);

-- ===== 추가 유저 (id=5~10) =====
-- 공통 비밀번호: Test1234!
INSERT INTO users (username, password, nickname, email, phone_number, role, position, created_at, updated_at, is_deleted) VALUES
('최준혁', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '최준혁', 'choijunhyuk@stacklink.com', '010-4567-1234', 'APPLICANT', '백엔드', NOW(), NOW(), false),
('윤서아', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '윤서아', 'yunseoah@stacklink.com', '010-5678-2345', 'APPLICANT', '프론트엔드', NOW(), NOW(), false),
('정민준', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '정민준', 'jungminjun@stacklink.com', '010-6789-3456', 'APPLICANT', '백엔드', NOW(), NOW(), false),
('한지은', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '한지은', 'hanjieun@stacklink.com', '010-7890-4567', 'APPLICANT', 'PM', NOW(), NOW(), false),
('송태양', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '송태양', 'songtaeyang@stacklink.com', '010-8901-5678', 'APPLICANT', '프론트엔드', NOW(), NOW(), false),
('오다은', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '오다은', 'odaeun@stacklink.com', '010-9012-6789', 'APPLICANT', 'DB', NOW(), NOW(), false);

-- ===== 추가 유저 기술스택 =====
-- 최준혁(5): Kotlin(17)-1년이상~3년미만(2), Spring Boot(2)-1년이상~3년미만(2), JPA(4)-1년미만(1)
-- 윤서아(6): Vue.js(16)-3년이상~5년미만(3), JavaScript(13)-3년이상~5년미만(3), TypeScript(14)-1년이상~3년미만(2)
-- 정민준(7): JAVA(1)-1년이상~3년미만(2), React.js(15)-1년이상~3년미만(2), Spring Boot(2)-1년미만(1)
-- 한지은(8): SQL/RDBMS(6)-1년이상~3년미만(2), JavaScript(13)-1년미만(1)
-- 송태양(9): React.js(15)-3년이상~5년미만(3), TypeScript(14)-3년이상~5년미만(3), Tailwind CSS(19)-1년이상~3년미만(2)
-- 오다은(10): SQL/RDBMS(6)-5년이상~7년미만(4), NoSQL(7)-3년이상~5년미만(3), QueryDSL(5)-1년이상~3년미만(2)
INSERT INTO tech_users (user_id, tech_id, career_id) VALUES
(5, 17, 2), (5, 2, 2), (5, 4, 1),
(6, 16, 3), (6, 13, 3), (6, 14, 2),
(7, 1, 2), (7, 15, 2), (7, 2, 1),
(8, 6, 2), (8, 13, 1),
(9, 15, 3), (9, 14, 3), (9, 19, 2),
(10, 6, 4), (10, 7, 3), (10, 5, 2);

-- ===== 추가 공고 (id=4~9) =====
INSERT INTO project (user_id, projectname, content, recruit_count, is_closed, view_count, favorite_count, created_at, updated_at, deadline_at, is_deleted) VALUES
(5, 'Kotlin 기반 Android 쇼핑 앱', 'Kotlin과 Spring Boot를 활용한 안드로이드 쇼핑 앱을 개발합니다. 모바일 개발에 관심 있는 분을 모집합니다.', 3, false, 0, 0, NOW(), NOW(), '2026-09-01 00:00:00', false),
(6, '개발자 포트폴리오 공유 플랫폼', 'Vue.js로 개발자들이 포트폴리오를 공유하고 피드백을 주고받는 플랫폼을 만듭니다.', 2, false, 0, 0, NOW(), NOW(), '2026-08-15 00:00:00', false),
(7, '헬스케어 예약 관리 시스템', '병원, 헬스장 등 헬스케어 시설의 예약을 통합 관리하는 시스템을 개발합니다.', 4, false, 0, 0, NOW(), NOW(), '2026-10-01 00:00:00', false),
(8, '팀 일정 관리 협업 툴', '슬랙과 구글 캘린더를 결합한 형태의 팀 일정 관리 툴을 기획하고 개발합니다.', 3, false, 0, 0, NOW(), NOW(), '2026-08-31 00:00:00', false),
(9, '음악 스트리밍 소셜 플랫폼', '음악을 듣고 취향을 공유하는 소셜 기능을 갖춘 스트리밍 플랫폼을 개발합니다.', 3, false, 0, 0, NOW(), NOW(), '2026-09-30 00:00:00', false),
(10, '실시간 주식 데이터 대시보드', '실시간 주식 데이터를 수집하고 시각화하는 분석 대시보드를 개발합니다.', 2, false, 0, 0, NOW(), NOW(), '2026-09-20 00:00:00', false);

-- ===== 추가 공고 기술스택 =====
-- project 4: Kotlin(17), Spring Boot(2), JPA(4)
-- project 5: Vue.js(16), JavaScript(13), CSS3(12)
-- project 6: JAVA(1), Spring Boot(2), React.js(15), TypeScript(14)
-- project 7: SQL/RDBMS(6), JavaScript(13), Spring Boot(2)
-- project 8: React.js(15), TypeScript(14), Tailwind CSS(19), Spring Boot(2)
-- project 9: SQL/RDBMS(6), NoSQL(7), QueryDSL(5)
INSERT INTO project_tech (tech_id, project_id) VALUES
(17, 4), (2, 4), (4, 4),
(16, 5), (13, 5), (12, 5),
(1, 6), (2, 6), (15, 6), (14, 6),
(6, 7), (13, 7), (2, 7),
(15, 8), (14, 8), (19, 8), (2, 8),
(6, 9), (7, 9), (5, 9);

-- follow 초기 상태 (데이터 없음)
