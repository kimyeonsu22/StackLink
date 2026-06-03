-- 테스트용 sql 파일

use stacklink;

-- 기본 정보 적재
-- 경력 정보 테이블
INSERT INTO career(career_detail) values ("1년 미만");
INSERT INTO career(career_detail) values ("1년 이상 ~ 3년 미만");
INSERT INTO career(career_detail) values ("3년 이상 ~ 5년 미만");
INSERT INTO career(career_detail) values ("5년 이상 ~ 7년 미만");
INSERT INTO career(career_detail) values ("7년 이상 ~ 10년 미만");
INSERT INTO career(career_detail) values ("10년 이상");

SELECT * FROM career;

-- 기술 테이블
INSERT INTO tech(tech_name) values ("JAVA");
INSERT INTO tech(tech_name) values ("Spring Boot");
INSERT INTO tech(tech_name) values ("Spring Security");
INSERT INTO tech(tech_name) values ("JPA");
INSERT INTO tech(tech_name) values ("QueryDSL");
INSERT INTO tech(tech_name) values ("SQL/RDBMS");
INSERT INTO tech(tech_name) values ("NoSQL");
INSERT INTO tech(tech_name) values ("C++");
INSERT INTO tech(tech_name) values ("C#");
INSERT INTO tech(tech_name) values ("Embedded");
INSERT INTO tech(tech_name) values ("HTML5");
INSERT INTO tech(tech_name) values ("CSS3");
INSERT INTO tech(tech_name) values ("JavaScript");
INSERT INTO tech(tech_name) values ("TypeScript");
INSERT INTO tech(tech_name) values ("React.js");
INSERT INTO tech(tech_name) values ("Vue.js");
INSERT INTO tech(tech_name) values ("Kotlin");
INSERT INTO tech(tech_name) values ("Swift");

select * from tech;

-- 구독 테이블
INSERT INTO subscribe(sub_name, sub_price_month) values ("Premium", 10000);

select * from subscribe;

-- 회원 테이블
INSERT INTO users(username, password, nickname, email, phone_number, role, created_at, updated_at) 
values ("ghwns6659", sha2("your-password", 256), "yourname", "youremail@youremail.com", "your-phone-number", "USER", now(), now());
INSERT INTO users(username, password, nickname, email, phone_number, role, created_at, updated_at) 
values ("ghwns6659", sha2("your-password", 256), "uniquename", "uniquename@uniquename.com", "your-unique-number", "USER", now(), now());

select * from users;

-- 프로젝트 테이블
INSERT INTO project(user_id, projectname, content, recruit_count, created_at, updated_at, deadline_at)
values(1, "테스트용 프로젝트 데이터", "테스트용 프로젝트 데이터 입니다.", 6, now(), now(), now()+3000000);

select * from project; 

-- 댓글 테이블
INSERT INTO reply(project_id, user_id, reply_content, created_at)
values(1, 2, "테스트용 댓글입니다.", now());

select * from reply;

-- 회원-구독 상태 매핑
-- 구독 모델이 없는 데이터에 대해 매핑하려고 할 경우 -> 쿼리 실패해야함
select * from subscribe;

INSERT INTO sub_state(user_id, sub_id, start_date, finish_date, sub_state)
values(1, 1, now(), now()+30000, true); -- 데이터 삽입 성공
INSERT INTO sub_state(user_id, sub_id, start_date, finish_date, sub_state)
values(2, 1, now(), now()+30000, true); -- 데이터 삽입 성공
INSERT INTO sub_state(user_id, sub_id, start_date, finish_date, sub_state)
values(1, 2, now(), now()+30000, true); -- sub_id 값이 2인 구독 모델은 없다, 데이터 삽입 실패
INSERT INTO sub_state(user_id, sub_id, start_date, finish_date, sub_state)
values(3, 1, now(), now()+30000, true); -- user_id 값이 4인 회원은 없다, 데이터 삽입 실패



-- 회원, 구독상태, 구독 모델 테이블 조인 확인
select subscribe;
select * from sub_state;
select * from users;

select u.nickname as "사용자 닉네임", sub.sub_name as "구독모델 이름", sub.sub_price_month as "월 구독료", 
	state.start_date as "시작 일", state.finish_date as "종료 일", state.sub_state as "구독 상태"
from users u join sub_state state on u.id = state.user_id
			join subscribe sub on state.sub_id = sub.id;
            
-- 회원-기술 스택, 경력 매핑 확인
select * from tech;
select * from career;

INSERT INTO tech_users (user_id, tech_id, career_id)
values(2, 1, 1);
INSERT INTO tech_users (user_id, tech_id, career_id)
values(2, 2, 1);
INSERT INTO tech_users (user_id, tech_id, career_id)
values(2, 3, 1);
INSERT INTO tech_users (user_id, tech_id, career_id)
values(2, 4, 1);
INSERT INTO tech_users (user_id, tech_id, career_id)
values(2, 5, 1);

select * from tech_users;

select u.nickname as "사용자 닉네임", t.tech_name as "기술스택 명", tu.tech_id as "기술스택 id값", c.career_detail as "경력 정보"
from users u join tech_users tu on u.id = tu.user_id
			join tech t on tu.tech_id = t.id
            join career c on tu.career_id = c.id;
            
-- 팔로우 테이블 참조 확인
INSERT INTO follow(follow_id, user_id, created_at)
values(1, 2, now());

select * from follow;
select * from users;

-- user_id 값이 2인 사람이 팔로우 하고 있는 사람의 닉네임 조회
select u.nickname as "팔로우 하고 있는 사람"
from users u join follow f on u.id = f.follow_id
where f.user_id = 2;

-- 프로젝트, 프로젝트_기술 매핑, 기술 테이블 조인 확인
select * from project;
select * from tech;

INSERT INTO project_tech (tech_id, project_id)
values(1, 1);
INSERT INTO project_tech (tech_id, project_id)
values(2, 1);
INSERT INTO project_tech (tech_id, project_id)
values(3, 1);
INSERT INTO project_tech (tech_id, project_id)
values(4, 1);
INSERT INTO project_tech (tech_id, project_id)
values(5, 1);

select * from project_tech;

select p.projectname as "프로젝트 명", p.content as "프로젝트 상세내용", p.recruit_count as "프로젝트 모집인원 수",
		t.tech_name "기술스택 명", pt.project_id as "프로젝트 id", pt.tech_id as "기술스택 id"
from project p join project_tech pt on pt.project_id = p.id
				join tech t on pt.tech_id = t.id;
                
-- 프로젝트, 프로젝트 지원, 회원 테이블 조인 확인
-- 회원 데이터 추가 적재
INSERT INTO users(username, password, nickname, email, phone_number, role, created_at, updated_at) 
values ("ghwns6659", sha2("your-password", 256), "applyUser1", "applyUser@applyUser1.com", "your-apply-user1", "USER", now(), now());
INSERT INTO users(username, password, nickname, email, phone_number, role, created_at, updated_at) 
values ("ghwns6659", sha2("your-password", 256), "applyUser2", "applyUser@applyUser2.com", "your-apply-user2", "USER", now(), now());
INSERT INTO users(username, password, nickname, email, phone_number, role, created_at, updated_at) 
values ("ghwns6659", sha2("your-password", 256), "applyUser3", "applyUser@applyUser3.com", "your-apply-user3", "USER", now(), now());

select * from users;
select * from project;

INSERT INTO project_apply(user_id, project_id, status, applied_at, content, position)
values(2, 1, "수락 대기중", now(), "열심히 하겠습니다!", "백엔드 개발");

-- 제가 테스트 할 때 중간에 어째서인지 users 테이블에서 id값 3이 누락되어 있었습니다. 
-- 필요하다면 각자의 테스트 환경에 맞게 값을 변경하셔야 할 것 같아요  
INSERT INTO project_apply(user_id, project_id, status, applied_at, content, position)
values(3, 1, "수락 대기중", now(), "열심히 하겠습니다!", "프론트엔드 개발");
INSERT INTO project_apply(user_id, project_id, status, applied_at, content, position)
values(4, 1, "수락 대기중", now(), "열심히 하겠습니다!", "DB");
INSERT INTO project_apply(user_id, project_id, status, applied_at, content, position)
values(5, 1, "수락 대기중", now(), "열심히 하겠습니다!", "PM");

select * from project_apply;

select p.projectname as "프로젝트 명", p.content as "프로젝트 상세내용", 
	ap.applied_at as "지원 일시", ap.content as "지원 내용", ap.position as "포지션",
    u.nickname as "지원자 닉네임" 
from project p join project_apply ap on p.id = ap.project_id
				join users u on ap.user_id = u.id;

######### 프로젝트, 프로젝트 즐겨찾기, 회원 테이블 조인 확인 #########
INSERT INTO project_favorite(user_id, project_id)
VALUES(2, 1);
INSERT INTO project_favorite(user_id, project_id)
VALUES(3, 1);
INSERT INTO project_favorite(user_id, project_id)
VALUES(4, 1);
INSERT INTO project_favorite(user_id, project_id)
VALUES(5, 1);

UPDATE project set favorite_count = 4
where id = 1;

select * from project_favorite;

select u.nickname as "즐겨찾기한 사용자 닉네임", p.projectname "즐겨찾기 한 프로젝트 명"
from project p join project_favorite pf on p.id = pf.project_id
				join users u on pf.user_id = u.id;
                
######### 프로젝트, 댓글, 회원 조인 확인 #########
select * from reply;

select u.nickname as "댓글 작성자", p.projectname as "프로젝트 명", r.reply_content as "댓글 내용"
from project p join reply r on p.id = r.project_id
				join users u on r.user_id = u.id;
                

######### users 테이블 트리거 테스트 #########
select * from users;

update users
set is_deleted = true
where id = 2; -- users 테이블 트리거 동작 확인

-- tech_users 테이블 확인
select * from tech_users;

-- sub_state 테이블 확인
select * from sub_state;

-- project_apply 테이블 확인
select * from project_apply;

-- reply 테이블 확인
select * from reply;

-- project_favorite 확인
select * from project_favorite;

-- follow 테이블 확인
select * from follow;

######### project 테이블 트리거 테스트 #########

select * from project;

update project
set is_deleted = true
where id = 1; -- project 트리거 동작 확인

select * from project_apply;

select * from project_tech;

select * from reply;

select * from project_favorite;

