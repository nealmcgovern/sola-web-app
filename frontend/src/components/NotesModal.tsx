import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';


const NotesModal = () => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        minWidth: 400,
        maxWidth: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button 
            onClick={handleOpen}
            variant="outlined"
            size='large'
            color='primary'>
            Notes
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <h2 id="child-modal-title">Log Notes</h2>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button variant="outlined" size='small'>Code generation successful.</Button>
                <Button variant="outlined" size='small'>Code generation unsuccessful, return call tomorrow.</Button>
                <Button variant="outlined" size='small'>Other issue, return call tomorrow.</Button>
            </ButtonGroup>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }


export default NotesModal
