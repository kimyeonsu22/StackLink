package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByIsDeletedFalse();

    List<Project> findByAuthor_IdAndIsDeletedFalse(Long authorId);

    Optional<Project> findByIdAndIsDeletedFalse(Long id);

    // AI 매칭용 - 삭제 안됐고 마감 안된 공고만 조회
    List<Project> findByIsDeletedFalseAndIsClosedFalse();

    @Query("""
    SELECT p FROM Project p
    LEFT JOIN p.author u
    WHERE (:keyword IS NULL OR p.projectName LIKE %:keyword%
           OR u.nickname LIKE %:keyword%)
    AND   (:isDeleted IS NULL OR p.isDeleted = :isDeleted)
    AND   (:isClosed  IS NULL OR p.isClosed  = :isClosed)
    ORDER BY p.createdAt DESC
""")
    Page<Project> searchProjects(
            @Param("keyword")   String keyword,
            @Param("isDeleted") Boolean isDeleted,
            @Param("isClosed")  Boolean isClosed,
            Pageable pageable
    );

    @Modifying
    @Query("UPDATE Project p SET p.isDeleted = true, p.updatedAt = CURRENT_TIMESTAMP WHERE p.id = :id")
    void softDeleteById(@Param("id") Long id);

    long countByIsDeleted(boolean isDeleted);
    long countByIsClosed(boolean isClosed);

    @Query("""
        SELECT p
        FROM Project p
        LEFT JOIN p.applies pa
        WHERE p.isDeleted = false AND p.isClosed = false
        GROUP BY p
        ORDER BY (p.favoriteCount * 2 + COUNT(pa) * 8) DESC
""")
    Page<Project> findHotProjects(Pageable pageable);
}