import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Task } from '../../../interfaces/Task';
import { TaskStatus } from '../../../enums/TaskStatus';
import { Select, MenuItem } from '@material-ui/core';

export default function FormDialog(props: any) {

  const
    {
      open,
      setOpen,
      saveTask,
      taskToUpdate,
      titleErrorProps,
      setTitleErrorProps,
      title
    } = props || {};

  const defaultTask = {
    id: '',
    userId: '',
    title: '',
    description: '',
    estimation: 0,
    status: TaskStatus.New
  };

  const [task, setTask] = useState<Task>(defaultTask)

  useEffect(() => {
    if (open === true) {
      if (taskToUpdate !== undefined) {
        setTask(taskToUpdate);
      }
    }
  }, [open, taskToUpdate])

  const handleClose = () => {
    setOpen(false);
    setTask(defaultTask);
  };

  const handleAdd = (task: Task) => {
    saveTask(task);
    setTask(defaultTask);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Title'
            type='text'
            variant='outlined'
            fullWidth
            required
            value={task.title || ''}
            onChange={(e: any) => {
              setTitleErrorProps({ error: false, helperText: '' });
              setTask({ ...task, title: e.target.value });
            }}
            error={titleErrorProps.error}
            helperText={titleErrorProps.helperText}
          />
          <TextField
            margin='dense'
            label='Description'
            type='text'
            variant='outlined'
            fullWidth
            value={task.description || ''}
            onChange={(e: any) => setTask({ ...task, description: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Estimation'
            type='number'
            variant='outlined'
            fullWidth
            value={task.estimation || ''}
            onChange={(e: any) => setTask({ ...task, estimation: e.target.value })}
          />
          <Select
            fullWidth
            value={task.status || 0}
            variant='outlined'
            onChange={(e: any) => setTask({ ...task, status: e.target.value })}
          >
            <MenuItem key={TaskStatus.New} value={TaskStatus.New}>New</MenuItem>
            <MenuItem key={TaskStatus.Active} value={TaskStatus.Active}>Active</MenuItem>
            <MenuItem key={TaskStatus.Closed} value={TaskStatus.Closed}>Closed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='outlined'>
            Cancel
          </Button>
          <Button onClick={() => handleAdd(task)} color='primary' variant='outlined'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
