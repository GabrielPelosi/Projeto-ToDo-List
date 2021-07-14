package com.pelosi.task.domain;

import com.pelosi.task.config.auditing.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_task")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task extends Auditable<User> {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    private Long id;

    @NotNull
    @NotBlank
    @NotEmpty
    @Column(nullable = false)
    private String title;

    @NotNull
    @NotBlank
    @NotEmpty
    @Column(nullable = false)
    private String description;



}
