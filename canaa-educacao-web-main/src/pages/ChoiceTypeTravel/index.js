import React from 'react';

import {
  Grid,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';

import {
  DirectionsRun,
} from '@material-ui/icons';

import {
  FaSchool
} from 'react-icons/fa';

import { styles } from './style';
import { useHistory } from 'react-router-dom';

export default function Travel(props) {

  const history = useHistory();
  const qrCode = props.location.state.qrCode;

  function handleChoice(direction) {
    history.push('/confirm-boarding', {
      qrCode,
      direction
    });
  }

  return (
    <Card style={styles.rootCard}>
      <CardContent >
        <Grid style={styles.gridContainer} container justifyContent='center' alignItems='center' spacing={5}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h5" align="center" style={styles.textTitle}>
              Qual operação você deseja realizar?
            </Typography>
          </Grid>

          <Grid item xs={12} sm={5} md={4} lg={3} xl={3} style={styles.gridItem}>
            <div style={styles.divInOut} onClick={() => handleChoice('ir')}>
              <FaSchool style={styles.largeIcon} />
              <DirectionsRun style={{ ...styles.mediumIcon, transform: 'scaleX(-1)' }} />

              <div style={styles.textInOut}>
                Indo à escola
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={5} md={4} lg={3} xl={3} style={styles.gridItem}>
            <div style={styles.divInOut} onClick={() => handleChoice('voltar')}>
              <FaSchool style={styles.largeIcon} />
              <DirectionsRun style={styles.mediumIcon} />

              <div style={styles.textInOut}>
                Voltando da escola
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>

    </Card>


  );



}