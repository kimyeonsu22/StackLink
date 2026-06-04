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
('Swift');

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
('김민우', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '김민우', 'kimminwoo@stacklink.com', '010-1234-5678', 'APPLICANT', '백엔드', NOW(), NOW(), false),
('이수연', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '이수연', 'leesuyeon@stacklink.com', '010-2345-6789', 'RECRUITER', '프론트엔드', NOW(), NOW(), false),
('박지훈', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '박지훈', 'parkjihun@stacklink.com', '010-3456-7890', 'RECRUITER', '백엔드', NOW(), NOW(), false),
('최예린', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '최예린', 'choiyerin@stacklink.com', '010-4567-8901', 'APPLICANT', '프론트엔드', NOW(), NOW(), false),
('정수연', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '정수연', 'jungsuyeon@stacklink.com', '010-5678-9012', 'APPLICANT', '디자인', NOW(), NOW(), false),
('한동훈', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '한동훈', 'handonghun@stacklink.com', '010-6789-0123', 'RECRUITER', '백엔드', NOW(), NOW(), false),
('오지은', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '오지은', 'ojieun@stacklink.com', '010-7890-1234', 'RECRUITER', 'PM', NOW(), NOW(), false),
('강태양', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '강태양', 'kangtaeyang@stacklink.com', '010-8901-2345', 'APPLICANT', '프론트엔드', NOW(), NOW(), false),
('윤서진', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '윤서진', 'yoonseojin@stacklink.com', '010-9012-3456', 'RECRUITER', 'DB', NOW(), NOW(), false),
('임재현', '$2b$10$VFJNF62xTiMFblHZw0OpguSCUuyKDSntCEdhEpzIY9gGAGPP0i80e', '임재현', 'limjaehyun@stacklink.com', '010-0123-4567', 'APPLICANT', '프론트엔드', NOW(), NOW(), false);

-- ===== project =====
INSERT INTO project (user_id, projectname, content, recruit_count, is_closed, view_count, favorite_count, created_at, updated_at, deadline_at, is_deleted) VALUES
(1, 'AI 기반 학습 관리 플랫폼 개발', 'AI 기반으로 개인 맞춤형 학습 경로를 추천해주는 학습 관리 플랫폼을 개발하고 있습니다. 함께 성장할 팀원을 모집합니다.', 3, false, 142, 18, NOW(), NOW(), '2026-08-30 00:00:00', false),
(2, '쇼핑몰 리뉴얼 프로젝트', '기존 쇼핑몰 서비스를 React 기반으로 전면 리뉴얼하는 프로젝트입니다. UI/UX 개선에 관심 있는 분을 모집합니다.', 2, false, 89, 10, NOW(), NOW(), '2026-07-31 00:00:00', false),
(3, '실시간 협업 문서 편집 도구', '구글 독스와 같은 실시간 협업 문서 편집 도구를 직접 구현해보는 프로젝트입니다.', 4, false, 210, 25, NOW(), NOW(), '2026-09-15 00:00:00', false),
(4, '모바일 헬스케어 앱 개발', '운동 기록 및 식단 관리 기능을 제공하는 헬스케어 앱을 개발합니다.', 3, false, 67, 8, NOW(), NOW(), '2026-07-20 00:00:00', false),
(5, '오픈소스 코드 에디터 개발', 'VS Code처럼 확장 가능한 오픈소스 코드 에디터를 개발하는 프로젝트입니다.', 5, false, 315, 40, NOW(), NOW(), '2026-10-01 00:00:00', false),
(6, '블록체인 기반 투표 시스템', '블록체인 기술을 활용해 투명하고 신뢰할 수 있는 온라인 투표 시스템을 만드는 프로젝트입니다.', 3, false, 55, 6, NOW(), NOW(), '2026-08-15 00:00:00', false),
(7, 'AR 기반 실내 네비게이션 앱', '증강현실 기술을 활용해 실내 길 안내 서비스를 제공하는 앱을 개발합니다.', 4, false, 178, 22, NOW(), NOW(), '2026-09-30 00:00:00', false),
(9, '실시간 데이터 파이프라인 구축', '대용량 실시간 데이터를 수집, 처리, 시각화하는 파이프라인을 구축하는 프로젝트입니다.', 2, false, 93, 12, NOW(), NOW(), '2026-08-01 00:00:00', false);

-- ===== project_tech =====
-- project 1: JAVA(1), Spring Boot(2), JPA(4), SQL/RDBMS(6)
INSERT INTO project_tech (tech_id, project_id) VALUES
(1, 1), (2, 1), (4, 1), (6, 1),
-- project 2: React.js(15), TypeScript(14), CSS3(12)
(15, 2), (14, 2), (12, 2),
-- project 3: JavaScript(13), TypeScript(14), React.js(15), NoSQL(7)
(13, 3), (14, 3), (15, 3), (7, 3),
-- project 4: Kotlin(17), Swift(18), NoSQL(7)
(17, 4), (18, 4), (7, 4),
-- project 5: C++(8), JavaScript(13), HTML5(11), CSS3(12)
(8, 5), (13, 5), (11, 5), (12, 5),
-- project 6: JAVA(1), Spring Boot(2), SQL/RDBMS(6)
(1, 6), (2, 6), (6, 6),
-- project 7: Kotlin(17), Swift(18), JavaScript(13)
(17, 7), (18, 7), (13, 7),
-- project 8: SQL/RDBMS(6), NoSQL(7), QueryDSL(5)
(6, 8), (7, 8), (5, 8);
