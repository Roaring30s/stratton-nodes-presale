
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'bg-presale-purple',
  border: '1px solid white',
  boxShadow: 24,
  p: 4,
  color: 'white',
  textAlign: 'center'
};

export default function SuccessAlerBox(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box 
            sx={style}
            
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.message}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}