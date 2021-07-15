package com.pelosi.task.api.controller;



import com.pelosi.task.model.TaskRequest;
import com.pelosi.task.model.TaskResponse;
import com.pelosi.task.service.TaskService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tasks")
public class TaskController {

    private final @NonNull TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createNewTask(@RequestBody TaskRequest taskRequest){
        return ResponseEntity.ok(taskService.createTask(taskRequest));
    }


    @PutMapping(value = "/{id}")
    public ResponseEntity<TaskResponse> updateTask(@RequestBody TaskRequest taskRequest, @PathVariable Long id) {
        return taskService.updateTask(taskRequest,id)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<Page<TaskResponse>> getAllTasksFromUser(Pageable pageable){
        return ResponseEntity.ok(taskService.findAllTasksFromUser(pageable));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteTaskFromUserById(@PathVariable Long id){
        return taskService.deleteTaskFromUserById(id)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
