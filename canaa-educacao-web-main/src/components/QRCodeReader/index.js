import React, { useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { classes } from './styles';
import { Grid } from '@material-ui/core';

let qrScanner;

export default function QRCodeReader({ setQRCode, title, isRunning }) {
  useEffect(() => {
    if (!isRunning)
      qrScanner.stop();
  }, [isRunning]);

  useEffect(() => {
    qrScanner = new QrScanner(
      document.getElementById('video-qr-code-scan'),
      result => onRead(result),
    );

    function onRead(result) {
      setQRCode(result);
      qrScanner.stop();
    }

    qrScanner.start();
  }, [setQRCode]);

  return (
    <div >

      <div style={classes.title}>
        {title}
      </div>

      <Grid container justifyContent="center">
        <Grid container justifyContent="center" item xs={11}>
          <Grid item>
            <video
              id='video-qr-code-scan'
              style={classes.video}
            >
              O Leitor de QRCode não é suportado neste navegador
            </video>
          </Grid>
        </Grid>
      </Grid>

    </div>


  );
}