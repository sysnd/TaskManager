import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core';

const SimpleDialog = (props: any) => {
    const { title, description, isOpen, onCancel, onContinue } = props;
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    },
    [isOpen]);

    return (
        <Dialog
            open={open}
            onClose={onCancel}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onContinue} >
                    Continue
                </Button>
                <Button onClick={onCancel} >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SimpleDialog;