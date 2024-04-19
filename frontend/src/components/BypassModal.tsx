import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const BypassModal = () => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        minWidth: 200,
        maxWidth: 275,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        //call bypass api here
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
            Get Bypass Code
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }} alignItems={'center'}>
            <h2 id="child-modal-title">Bypass Code</h2>
            <p id="child-modal-description">
              102347609
            </p>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }


export default BypassModal
