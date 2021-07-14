package com.pelosi.task.service.serviceImpl;

import com.pelosi.task.domain.Task;
import com.pelosi.task.domain.User;
import com.pelosi.task.model.TaskRequest;
import com.pelosi.task.model.TaskResponse;
import com.pelosi.task.repository.TaskRepository;
import com.pelosi.task.service.TaskService;
import com.pelosi.task.validation.TaskUserValidator;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final @NonNull TaskRepository taskRepository;
    private final @NonNull TaskUserValidator taskUserValidator;


    @Override
    public TaskResponse createTask(TaskRequest taskRequest) {
        Task task = Task.builder().title(taskRequest.getTitle())
                .description(taskRequest.getDescription()).build();
        Task savedTask = taskRepository.save(task);

        return TaskResponse.builder().id(savedTask.getId())
                .title(savedTask.getTitle()).description(savedTask.getDescription())
                .createdBy(savedTask.getCreatedBy().getEmail())
                .createdDate(savedTask.getCreatedDateTime())
                .lastUpdatedDate(savedTask.getLastUpdatedDateTime())
                .build();
    }

    @Override
    public Optional<TaskResponse> updateTask(TaskRequest taskRequest, Long id) {
        Optional<Task> op = taskRepository.findById(id);
        op.ifPresent(task -> taskUserValidator.validateTaskUser(task));

        Task taskReceived = Task.builder().title(taskRequest.getTitle())
                    .description(taskRequest.getDescription()).build();

        return op.map(task -> taskReceived).map(taskRepository::save)
                    .map(task -> TaskResponse.builder().id(task.getId())
                    .title(task.getTitle())
                    .description(task.getDescription())
                    .createdBy(task.getCreatedBy().getEmail())
                    .lastUpdatedDate(task.getLastUpdatedDateTime())
                    .createdDate(task.getCreatedDateTime()).build());

    }

    @Override
    public Page<TaskResponse> findAllTasksFromUser(Pageable pageable) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return taskRepository.findAllByCreatedBy(user,pageable)
                .map(task -> TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .createdBy(task.getCreatedBy().getEmail())
                .lastUpdatedDate(task.getLastUpdatedDateTime())
                .createdDate(task.getCreatedDateTime()).build());
    }

    @Override
    public Optional<Boolean> deleteTaskFromUserById(Long id) {
        return taskRepository.findById(id).map(task -> {
                taskUserValidator.validateTaskUser(task);
                taskRepository.delete(task);
                return true;

        });
    }

}
