import React from 'react'
import TaskForm from '../taskForm'

const updateTask = () => {
    console.log("TEste")
}

const UpdateTask = () => {
    return (
        <div>
            <TaskForm onClickButtonForm={updateTask}/>
        </div>
    )
}

export default UpdateTask
