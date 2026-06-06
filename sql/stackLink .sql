DROP DATABASE IF EXISTS stacklink;
CREATE DATABASE stacklink;
USE stacklink;

/*
users, project 테이블에서 특정 레코드의 is_deleted 컬럼 값이 true 가 되었을 경우
연관관계로 참조되고 있는 자식 테이블의 데이터들을 삭제하는 트리거 작성할 것
일단 users, project 테이블을 참조하고 있다면 관련된것들 모두 트리거 만들것
*/
-- 기술 테이블
CREATE TABLE tech (
                      id	BIGINT				NOT NULL PRIMARY KEY AUTO_INCREMENT,
                      tech_name	varchar(20)	NOT NULL
);

-- 구독모델 테이블
CREATE TABLE subscribe (
                           id	BIGINT				NOT NULL PRIMARY KEY AUTO_INCREMENT,
                           sub_name	varchar(10)	NOT NULL,
                           sub_price_month	integer	NOT NULL	DEFAULT 0
);

-- 회원 테이블
CREATE TABLE users (
                       id	BIGINT					NOT NULL PRIMARY KEY AUTO_INCREMENT,
                       username	VARCHAR(20)		NOT NULL,
                       password	VARCHAR(256)	NOT NULL,
                       nickname	VARCHAR(20)		NOT NULL UNIQUE,
                       email	VARCHAR(50)			NOT NULL UNIQUE,
                       phone_number	varchar(20)	NOT NULL UNIQUE,
                       role	ENUM('APPLICANT', 'ADMIN')	NOT NULL,
                       position VARCHAR(20) 		NOT NULL,
                       created_at	DATETIME		NOT NULL,
                       updated_at	DATETIME		NOT NULL,
                       is_deleted	boolean			NOT NULL DEFAULT false
);
/*
로그인 시 users 테이블에서 데이터를 확인할 때 is_deleted 컬럼이 true 라면 거부되어야 한다.
회원 탈퇴 후 회원가입을 한다고 가정할 때 회원 탈퇴 과정에서 사용자 정보를 물리적으로 삭제하지 않고
is_deleted 컬럼으로만 소프트하게 관리하고 있기 때문에 회원 테이블과 참조관계에 있는 자식 테이블들의 데이터가 지워지지 않는다.
따라서 회원가입 시 동일한 계정으로 회원가입 하려고 한다면
1. is_deleted 컬럼 상태와 상관없이 동일한 계정에 대한 무조건적인 회원가입 거부
2. is_deleted 컬럼 상태가 false 인 경우 이미 동일한 계정이 있다는 판단하에 거부, true 인 경우 계정복구 확인
이와 같은 두 가지 방식 중 하나로 결정해야 할 듯?
*/

CREATE TABLE career (
                        id				BIGINT 		NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        career_detail	varchar(20)	NOT NULL
);

-- 기술-회원 중간 매핑 테이블
CREATE TABLE tech_users (
                            user_id		BIGINT	NOT NULL	COMMENT '부모키 상속',
                            tech_id		BIGINT	NOT NULL	COMMENT '부모키 상속',
                            career_id	BIGINT	NOT NULL,

                            PRIMARY KEY(user_id, tech_id), -- 부모키 상속
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT, -- 부모 테이블 delete 쿼리 방지
                            FOREIGN KEY(tech_id) REFERENCES tech(id) ON DELETE RESTRICT,
                            FOREIGN KEY(career_id) REFERENCES career(id) ON DELETE CASCADE
);

-- 회원별 구독 상태 테이블
-- user_id 인덱싱
CREATE TABLE sub_state (
                           id	BIGINT				NOT NULL PRIMARY KEY AUTO_INCREMENT,
                           user_id	BIGINT			NOT NULL UNIQUE, -- 유니크 제약조건, 인덱스 자동 생성
                           sub_id	BIGINT			NOT NULL,
                           start_date	DATETIME	NOT NULL,
                           finish_date	DATETIME	NOT NULL,
                           sub_state	boolean		NOT NULL DEFAULT false,

                           FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT,
    -- 특정 모델을 구독중인 회원이 있을 경우 부모 데이터 삭제 거부
                           FOREIGN KEY(sub_id) REFERENCES subscribe(id) ON DELETE RESTRICT
);

CREATE TABLE project (
                         id	BIGINT	NOT NULL PRIMARY KEY AUTO_INCREMENT,
                         user_id	BIGINT NOT NULL UNIQUE, -- 프로젝트 공고는 한명당 하나씩, unique 제약조건
                         projectname	varchar(30)	NOT NULL,
                         content	TEXT	NOT NULL,
                         project_category	varchar(10)	NOT NULL, -- 프로젝트 카테고리 컬럼 추가
                         project_type	varchar(20)	NOT NULL, -- 프로젝트 유형 컬럼 추가
                         recruit_count	integer	NOT NULL,
                         is_closed	BOOLEAN	NOT NULL	DEFAULT false,
                         view_count	integer	NOT NULL	DEFAULT 0,
                         favorite_count	integer	NOT NULL	DEFAULT 0,
                         created_at	DATETIME	NOT NULL,
                         updated_at	DATETIME	NULL,
                         deadline_at	DATETIME	NOT NULL,
                         project_start	DATETIME	NOT NULL, -- 프로젝트 시작 예정일 컬럼 추가
                         project_end	DATETIME	NOT NULL, -- 프로젝트 종료 예정일 컬럼 추가

                         is_deleted	boolean	NOT NULL	DEFAULT false,

    -- 공고 등록 회원 데이터가 삭제되면 함께 삭제
                         FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 프로젝트 지원 테이블
CREATE TABLE project_apply (
                               user_id	BIGINT	NOT NULL		COMMENT '부모키 상속',
                               project_id	BIGINT	NOT NULL	COMMENT '부모키 상속',
                               status	ENUM('APPLIED', 'ACCEPTED', 'REJECTED')	NOT NULL,
                               applied_at	DATETIME	NOT NULL,
                               content		TEXT		NOT NULL,
                               position	varchar(20) NOT NULL,

                               PRIMARY KEY(user_id, project_id), -- 부모키 상속
                               FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT, -- 부모 테이블 delete 쿼리 방지
                               FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE RESTRICT
);

-- 프로젝트 참여 지원 수락 테이블
CREATE TABLE apply_aggrement (
                                 user_id	BIGINT	NOT NULL,
                                 project_id	BIGINT	NOT NULL,

                                 PRIMARY KEY(user_id, project_id), -- 부모키 상속
                                 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT, -- 부모 테이블 delete 쿼리 방지
                                 FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE RESTRICT
);

-- 프로젝트 기술 스택
CREATE TABLE project_tech (
                              tech_id	BIGINT	NOT NULL 		COMMENT '부모키 상속',
                              project_id	BIGINT	NOT NULL 	COMMENT '부모키 상속',
                              career_detail VARCHAR(20) not null, -- 공고 작성 시 기술 스택 + 경력까지 함께 작성가능

                              PRIMARY KEY(tech_id, project_id), -- 부모키 상속
                              FOREIGN KEY(tech_id) REFERENCES tech(id) ON DELETE RESTRICT, -- 부모 테이블 delete 쿼리 방지
                              FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE RESTRICT
);

-- 소셜 로그인 정보 테이블
CREATE TABLE social (
                        id	BIGINT	NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        user_id	BIGINT	NOT NULL UNIQUE,
                        platform	varchar(10)	NOT NULL,
                        platform_id	varchar(100)	NOT NULL,
                        connected_at	DATETIME	NOT NULL,

                        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT,
                        CONSTRAINT uk_social UNIQUE(platform, platform_id) -- 복합 UNIQUE 설정
);

-- 댓글 테이블
CREATE TABLE reply (
                       id	BIGINT	NOT NULL PRIMARY KEY AUTO_INCREMENT,
                       project_id	BIGINT	NOT NULL,
                       user_id	BIGINT NOT NULL,
                       reply_content	varchar(200)	NOT NULL,
                       parent_id	BIGINT	NULL	DEFAULT null	COMMENT '부모 댓글id 셀프 조인',
                       like_count	integer	NOT NULL	DEFAULT 0,
                       is_deleted  boolean not null DEFAULT false,
                       created_at	DATETIME	NOT NULL, -- 댓글 생성일자 추가
                       updated_at	DATETIME	NULL, -- 댓글 수정일자 추가

                       FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE RESTRICT,
    -- 사용자 정보 삭제 시 트리거와 is_deleted 컬럼으로 소프트 삭제
                       FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 프로젝트 즐겨찾기 매핑 테이블
CREATE TABLE project_favorite (
                                  user_id	BIGINT	NOT NULL	COMMENT '부모키 상속',
                                  project_id	BIGINT	NOT NULL	COMMENT '부모키 상속',

                                  PRIMARY KEY(user_id, project_id),
                                  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT,
                                  FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE RESTRICT
);

CREATE TABLE follow (
                        follow_id	BIGINT	NOT NULL, -- 팔로우 당하는 사람의 id 값
                        user_id	BIGINT	NOT NULL	COMMENT '부모키 상속', -- 팔로우 하는 사람의 id 값
                        created_at	DATETIME	NOT NULL,

                        PRIMARY KEY(follow_id, user_id),
                        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT
);