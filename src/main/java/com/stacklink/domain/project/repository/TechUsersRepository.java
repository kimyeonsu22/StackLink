package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.TechUsers;
import com.stacklink.domain.project.entity.TechUsersId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechUsersRepository extends JpaRepository<TechUsers, TechUsersId> {

    List<TechUsers> findByUser_Id(Long userId);

    void deleteByUser_Id(Long userId);
}
