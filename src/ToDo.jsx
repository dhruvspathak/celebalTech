import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const ToDo= ()=>{

    const [tasks, setTasks]= useState(()=>{
        const savedTasks= localStorage.getItem('tasks')
        return savedTasks ? JSON.parse(savedTasks) : []
    })
    const [newTask, setNewTask]= useState('')
    const [sortOrder, setSortOrder]= useState('asc')
    const [filter, setFilter]= useState('all')

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])

    const handleInput= ()=>{
        if(newTask.trim()){
            setTasks([...tasks, {text: newTask, completed: false}])
            setNewTask('')
            console.log(tasks)
        }
    }

    const handleRemoval= (toBeRemoved)=>{
        setTasks(tasks.filter((task)=> task!==toBeRemoved))  
    }

    const handleCompletion= (toBeToggled)=>{
        const updatedTasks= tasks.map((task)=>{
            if(task===toBeToggled){
                return{...task, completed: !task.completed}
            }
            return task
        })
        setTasks(updatedTasks)
    }

    const sortFunction= (tasks)=>{
        return tasks.sort((a,b)=>{
            if(sortOrder==='asc'){
                return a.text.localeCompare(b.text)
            }
            else{
                return b.text.localeCompare(a.text)
            }
        })
    }

    const filterFunction= (tasks)=>{
        if(filter==='completed'){
            return tasks.filter(task=> task.completed)
        }
        else if(filter==='incomplete'){
            return tasks.filter(task=> !task.completed)
        }
        return tasks
    }

    let displayedTasks = sortFunction(filterFunction([...tasks]))

    const takeToHome= (e)=>{
        e.preventDefault()
        navigate('/')
    }

    return(
        <>
        <div>
            <input
            placeholder="enter task"
            value={newTask}
            onChange={(e)=>setNewTask(e.target.value)}/>
            <button onClick={handleInput}>ADD</button>
        </div>
        <div>
            <label>Sort By:</label>
            <select onChange={(e)=>setSortOrder(e.target.value)} value={sortOrder}>
                <option value='asc'>ASCENDING</option>
                <option value='desc'>DECENDING</option>
            </select>
            <label>Filter By:</label>
            <select onChange={(e)=>setFilter(e.target.value)} value={filter}>
                <option value='all'>ALL</option>
                <option value='completed'>FINISHED</option>
                <option value='incomplete'>UNFINISHED</option>
            </select>
        </div>
        <ul>
            {displayedTasks.map((task, index)=>(
                <li key={index}>
                {task.text}
                <input
                type="checkbox"
                checked={task.completed}
                onChange={()=>handleCompletion(task)}
                />
                <button onClick={()=>handleRemoval(task)}>Remove</button>
                </li>
            ))}
        </ul>
        <nav>
            <button type='button' onClick={takeToHome}>BACK</button>
        </nav>
        </>
    )
}

export default ToDo
