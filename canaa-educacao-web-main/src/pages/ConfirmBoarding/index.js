import React, { useEffect, useState } from 'react';

import {
  Grid,
  Typography,
  Card,
  Button,
  TextField,
  CardContent
} from '@material-ui/core';

import {
  ArrowBackIos,
  Check,
  HighlightOff
} from '@material-ui/icons';

import { styles } from './styles';
import { getStudentFromRegistrationNumber } from './utils.js';
import { getRegistrationNumberFromQRCode } from '../../utils/qrCode';
import ConfirmDialog from '../../components/Notification/ConfirmDialog';
import Notification from '../../components/Notification/Notification';
import { useHistory } from 'react-router-dom';
import { useStudent } from '../../contexts/studentsContext';
import api from '../../services/api';

const NOTIFY_INITIAL_STATE = {
  type: '',
  message: '',
  title: '',
  isOpen: false
};

const SCHOOL_INFO_INITIAL_STATE = {
  name: 'Sem escola cadastrada',
  neighborhood: ''
};

const CONFIRM_DIALOG_INITIAL_STATE = {
  title: '',
  subTitle: '',
  isOpen: false
};

export default function ConfirmBoarding(props) {

  const {
    fullName,
    setFullName,
    birthday,
    setBirthday,
    shift,
    setShift,
    clearAll
  } = useStudent();

  const [schoolInfo, setSchoolInfo] = useState(SCHOOL_INFO_INITIAL_STATE);
  const [userPicture, setUserPicture] = useState('');
  const [notify, setNotify] = useState(NOTIFY_INITIAL_STATE);
  const [confirmDialog, setConfirmDialog] = useState(CONFIRM_DIALOG_INITIAL_STATE);

  const history = useHistory();
  const qrCode = props.location.state.qrCode;
  const direction = props.location.state.direction;
  const matriculationNumber = getRegistrationNumberFromQRCode(qrCode);

  function boarding() {
    //Comunicação com a API para informar que o estudante embarcou
    const data = {
      matriculationNumber: String(matriculationNumber),
      direction,
      place: schoolInfo.name
    };

    api.post(`shipments/ship`, data)
      .then(response => {
        history.push('/travel', {
          studentBoarded: fullName
        });
      })
      .catch(error => {
        setNotify({
          type: 'error',
          message: error.response.data.error.message,
          title: 'Erro ao embarcar estudante',
          isOpen: true
        });
      })

    clearAll();
  }

  function confirm() {
    setConfirmDialog({
      title: 'Você confirma os dados de estudante?',
      subTitle: 'Caso discorde, cancele a operação.',
      onConfirm: boarding,
      isOpen: true
    });
  }

  useEffect(() => {
    getStudentFromRegistrationNumber(
      matriculationNumber,
      setFullName,
      setBirthday,
      setShift,
      setSchoolInfo,
      setUserPicture,
      callbackOnError
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function callbackOnError(errorMessage) {
    const notify = {
      type: 'error',
      message: errorMessage,
      title: 'Erro ao embarcar estudante',
      isOpen: true
    };

    history.push('/travel', { notify });
  }




  return (
    <Card style={styles.cardRoot}>
      <CardContent>
        <Typography variant='h5' style={styles.textTitle} align='center'>
          Embarcar Estudante
        </Typography>

        <Typography align='center' style={styles.subtitle}>
          Confirme os dados abaixo correspondem aos dados do estudante a ser embarcado
        </Typography>

        <Grid container spacing={2} justifyContent='center'>

          <Grid container item justifyContent='center' xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid item>
              <img style={styles.imgFaceUser} src={userPicture} alt="Foto de usuário" />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <TextField
              disabled
              variant='outlined'
              style={styles.field}
              size='small'
              value={matriculationNumber}
              fullWidth
              label='Número de Matrícula'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <TextField
              disabled
              style={styles.fi}
              variant='outlined'
              size='small'
              fullWidth
              value={fullName}
              label='Nome'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <TextField
              disabled
              style={styles.fi}
              variant='outlined'
              size='small'
              fullWidth
              value={schoolInfo.name}
              label='Escola'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <TextField
              disabled
              style={styles.fi}
              variant='outlined'
              size='small'
              value={schoolInfo.neighborhood}
              fullWidth
              label='Bairro da escola'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <TextField
              disabled
              style={styles.fi}
              variant='outlined'
              size='small'
              value={birthday}
              fullWidth
              label='Data de Nascimento'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <TextField
              disabled
              style={styles.fi}
              variant='outlined'
              size='small'
              fullWidth
              value={shift}
              label='Turno'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <TextField
              disabled
              style={styles.fi}
              variant='outlined'
              size='small'
              fullWidth
              value={direction === 'ir' ? 'Indo à escola' : 'Voltando da escola'}
              label='Tipo de viagem'
            />
          </Grid>

          <Grid container spacing={2} justifyContent='center' style={{ margin: 0, marginTop: 30 }}>
            <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
              <Button
                fullWidth
                onClick={() => history.goBack()}
                variant='outlined'
                style={styles.secondColor}
              >
                <ArrowBackIos />
                Voltar
              </Button>
            </Grid>

            <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
              <Button
                fullWidth
                onClick={() => history.push('/travel')}
                variant='outlined'
                style={styles.secondColor}
              >
                <HighlightOff />
                Cancelar
              </Button>
            </Grid>

            <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
              <Button
                onClick={() => confirm()}
                fullWidth
                variant='outlined'
                style={styles.primaryColor}
              >
                <Check />
                Confirmar
              </Button>
            </Grid>
          </Grid>

        </Grid>

      </CardContent>

      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <Notification notify={notify} setNotify={setNotify} />
    </Card>




  )
}