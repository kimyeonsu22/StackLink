CREATE DEFINER=`root`@`localhost` TRIGGER `multiQuery_projectUpdate_trigger` AFTER UPDATE ON `project` FOR EACH ROW BEGIN
	IF NEW.is_deleted = true AND OLD.is_deleted = false THEN
		DELETE FROM project_apply
		WHERE project_apply.project_id = NEW.id;
    
		DELETE FROM project_tech
		WHERE project_tech.project_id = NEW.id;
        
        DELETE FROM reply
		WHERE reply.project_id = NEW.id;
        
        DELETE FROM project_favorite
		WHERE project_favorite.project_id = NEW.id;
    END IF;
    
    IF NEW.is_closed = true AND OLD.is_closed = false THEN
		DELETE FROM project_apply
        WHERE project_apply.project_id = NEW.id;
	END IF;
END