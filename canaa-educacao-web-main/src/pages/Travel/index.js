import React, { useEffect } from 'react';

import {
  Grid,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';

import {
  DirectionsBus,
  DirectionsRun,
} from '@material-ui/icons';

import { styles } from './style';
import { useHistory } from 'react-router-dom';
import ModalBoarding from './ModalBoarding';
import Notification from '../../components/Notification/Notification';

export default function Travel(props) {

  const history = useHistory();

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: '',
    type: '',
    title: ''
  });

  const [openModalBoarding, setOpenModalBoarding] = React.useState(false);

  const handleOpenModalBoarding = () => setOpenModalBoarding(true);
  const handleCloseModalBoarding = () => setOpenModalBoarding(false);

  useEffect(() => {
    if (props.location?.state?.studentBoarded !== undefined) {
      setNotify({
        isOpen: true,
        message: `O estudante ${props.location.state.studentBoarded} embarcou no ônibus`,
        type: 'success',
        title: 'Usuário embarcado'
      })
    }


  }, [props.location?.state?.studentBoarded]);

  useEffect(() => {
    const notify = props.location.state?.notify;
    if (notify !== undefined) {
      setNotify(notify);
    }
  }, [props.location]);

  const onReadQRCode = (qrCode) => {
    if (!!qrCode) {
      history.push('/choice-type-travel', {
        qrCode
      });
    }
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
            <div style={styles.divInOut} onClick={handleOpenModalBoarding}>
              <DirectionsBus style={styles.largeIcon} />
              <DirectionsRun style={{ ...styles.mediumIcon, transform: 'scaleX(-1)' }} />

              <div style={styles.textInOut}>
                Embarcar estudante
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={5} md={4} lg={3} xl={3} style={styles.gridItem}>
            <div style={styles.divInOut} onClick={() => history.push('/unboarding')}>
              <DirectionsBus style={styles.largeIcon} />
              <DirectionsRun style={styles.mediumIcon} />

              <div style={styles.textInOut}>
                Desembarcar estudante
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <ModalBoarding
        openModalBoarding={openModalBoarding}
        handleCloseModalBoarding={handleCloseModalBoarding}
        setQRCode={onReadQRCode}
      />

      <Notification
        notify={notify}
        setNotify={setNotify}
      />

    </Card>


  );



}