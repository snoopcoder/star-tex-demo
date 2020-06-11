import React from 'react';
import socketIOClient from 'socket.io-client';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ENDPOINT = 'http://127.0.0.1:7000';

// eslint-disable-next-line react/prop-types
function App({ token }) {
  const [message, setMessage] = React.useState(null);
  React.useEffect(() => {
    if (token) {
      const socket = socketIOClient(ENDPOINT);
      socket.on('init', () => {
        socket.emit('init', token);
      });
      socket.on('message', (data) => {
        setMessage(data);
      });
    }
  }, [token]);

  function handleClose() {
    setMessage(null);
  }

  return (
    <>
      <Dialog
        open={!!message}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message || ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
