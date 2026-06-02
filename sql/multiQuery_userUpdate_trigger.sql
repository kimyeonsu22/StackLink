CREATE DEFINER=`root`@`localhost` TRIGGER `multiQuery_userUpdate_trigger` AFTER UPDATE ON `users` FOR EACH ROW BEGIN
	-- users 테이블의 is_deleted 컬럼값이 true 가 되었을 경우
	IF NEW.is_deleted = true AND OLD.is_deleted = false THEN
		DELETE FROM tech_users
        WHERE tech_users.user_id = NEW.id;
        
        DELETE FROM sub_state
        where sub_state.user_id = NEW.id;
        
        UPDATE project
        SET is_deleted = true
        WHERE project.user_id = NEW.id;
        
        DELETE FROM project_apply
        where project_apply.user_id = NEW.id;
        
        DELETE FROM social
        where social.user_id = NEW.id;
        
        UPDATE reply
        SET is_deleted = true
        WHERE reply.user_id = NEW.id;
        
        DELETE FROM project_favorite
        where project_favorite.user_id = NEW.id;
        
        DELETE FROM follow
        where follow.user_id = NEW.id;
	END IF;
END