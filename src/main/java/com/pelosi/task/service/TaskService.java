package com.pelosi.task.service;

import com.pelosi.task.model.TaskRequest;
import com.pelosi.task.model.TaskResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface TaskService {

    TaskResponse createTask(TaskRequest taskRequest);

    Optional<TaskResponse> updateTask(TaskRequest taskRequest, Long id);

    Page<TaskResponse> findAllTasksFromUser(Pageable pageable);

    Optional<Boolean> deleteTaskFromUserById (Long id);
}
