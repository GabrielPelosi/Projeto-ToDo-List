package com.pelosi.task.model;


import com.pelosi.task.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {


    private Long id;

    private String title;

    private String description;

    private String createdBy;

    private Date createdDate;

    private Date lastUpdatedDate;


}
