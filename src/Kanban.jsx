import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import { Button, TextField, Card, CardContent, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme()

const initialData = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do:',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Happening Now',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done!',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

const KanbanBoard = () => {
  const [data, setData] = useState(initialData)
  const [taskContent, setTaskContent] = useState('')

  useEffect(() => {
    const savedData = localStorage.getItem('kanbanData')
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kanbanData', JSON.stringify(data))
  }, [data])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startColumn = data.columns[source.droppableId]
    const endColumn = data.columns[destination.droppableId]

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      }

      setData(newState)
    } else {
      const startTaskIds = Array.from(startColumn.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      }

      const endTaskIds = Array.from(endColumn.taskIds)
      endTaskIds.splice(destination.index, 0, draggableId)
      const newEndColumn = {
        ...endColumn,
        taskIds: endTaskIds,
      }

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      }

      setData(newState)
    }
  }

  const addTask = () => {
    if (!taskContent.trim()) return

    const newTaskId = uuidv4()
    const newTask = {
      id: newTaskId,
      content: taskContent,
    };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        'column-1': {
          ...data.columns['column-1'],
          taskIds: [...data.columns['column-1'].taskIds, newTaskId],
        },
      },
    }

    setData(newState)
    setTaskContent('')
  }

  const deleteTask = (taskId) => {
    const newTasks = { ...data.tasks }
    delete newTasks[taskId]

    const newColumns = {}
    for (const columnId in data.columns) {
      newColumns[columnId] = {
        ...data.columns[columnId],
        taskIds: data.columns[columnId].taskIds.filter((id) => id !== taskId),
      }
    }

    const newState = {
      ...data,
      tasks: newTasks,
      columns: newColumns,
    }

    setData(newState)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '16px' }}>
        <TextField
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="Enter task content"
          variant="outlined"
          size="small"
          style={{ marginRight: '8px' }}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      margin: '8px',
                      border: '1px solid lightgrey',
                      borderRadius: '2px',
                      padding: '8px',
                      width: '300px',
                      backgroundColor: '#f4f4f4',
                    }}
                  >
                    <Typography variant="h6" component="h3">
                      {column.title}
                    </Typography>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              marginBottom: '8px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <CardContent
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Typography>{task.content}</Typography>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => deleteTask(task.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          })}
        </div>
      </DragDropContext>
    </ThemeProvider>
  )
}

export default KanbanBoard
