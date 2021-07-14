package com.pelosi.task.repository;

import com.pelosi.task.domain.Task;
import com.pelosi.task.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    Page<Task> findAllByCreatedBy(User owner, Pageable pageable);
}
