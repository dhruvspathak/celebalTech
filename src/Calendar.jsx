import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, IconButton } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Delete } from '@mui/icons-material'

const localizer = momentLocalizer(moment)

const getInitialEvents = () => {
  const storedEvents = localStorage.getItem('events')
  return storedEvents ? JSON.parse(storedEvents) : []
}

const MyCalendar = () => {
  const [events, setEvents] = useState(getInitialEvents)
  const [open, setOpen] = useState(false)
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: '',
    name: '',
    priority: '',
    date: null,
  })

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEventDetailsClose = () => {
    setEventDetailsOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }))
  }

  const handleDateChange = (date) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      date,
    }))
  }

  const handleAddEvent = () => {
    const newEventEntry = {
      id: Date.now(),
      title: newEvent.title,
      start: newEvent.date.toDate(),
      end: newEvent.date.toDate(),
      name: newEvent.name,
      priority: newEvent.priority,
    }
    setEvents((prevEvents) => [...prevEvents, newEventEntry])
    handleClose()
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setEventDetailsOpen(true)
  }

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id))
    handleEventDetailsClose()
  };

  return (
    <div style={{ height: 500 }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Priority"
            type="text"
            fullWidth
            select
            name="priority"
            value={newEvent.priority}
            onChange={handleInputChange}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date"
              value={newEvent.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={eventDetailsOpen} onClose={handleEventDetailsClose}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <p><strong>Title:</strong> {selectedEvent.title}</p>
              <p><strong>Name:</strong> {selectedEvent.name}</p>
              <p><strong>Priority:</strong> {selectedEvent.priority}</p>
              <p><strong>Date:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY')}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleDeleteEvent} color="secondary">
            <Delete />
          </IconButton>
          <Button onClick={handleEventDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', marginTop: '20px' }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  )
}

export default MyCalendar
