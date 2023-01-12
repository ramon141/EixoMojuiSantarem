import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Grid,
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  Fade,
  FormControl,
  InputLabel,
  Select as SelectMUI,
  MenuItem
} from '@material-ui/core';

import MaskInput from '../../components/MaskInput';

import Select from 'react-select';

import {
  FaQrcode
} from 'react-icons/fa'

import { ArrowBackIos } from '@material-ui/icons';
import defaultUserImg from '../../assets/default-user.png';
import takePictureImg from '../../assets/takePicture.png';
import ModalPicture from './ModalPicture';
import './styles.css';
import { useStudent } from '../../contexts/studentsContext';
import QRCodeReader from '../../components/QRCodeReader';
import { getRegistrationNumberFromQRCode } from '../../utils/qrCode';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: '10px'
  },

  root: {
    display: 'flex',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '78%',
    height: '78%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '17px',
    boxShadow: 24,
    p: 4,
    backgroundColor: 'white',
    padding: 20,
  },
  /* Estilização do conteúdo dentro do container */
  paper: {
    padding: theme.spacing(2),
    display: 'inline-block',
    width: '100%',
    overflow: 'auto',
    flexDirection: 'row',
    minWidth: 'calc(100%)',
    [theme.breakpoints.up("sm")]: {
      minWidth: 400
    },
    marginRigth: '20px',
  },

  /* Estilização do títutlo */
  textTitle: {
    margin: theme.spacing(1),
    color: '#41414d',
    fontWeight: 600,
  },

  textDescription: {
    margin: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.54)',
  },

  buttonImage: {
    color: '#009155',
    padding: 0
  }
}));

const styleMultiSelect = {
  control: (base) => ({
    ...base,
    position: 'relative',
    minHeight: 40,
    width: '100%',
    minWidth: 35,
    marginTop: '10px',
  })
};

export default function InfoStudent() {
  const classes = useStyles();

  const [openModalPicture, setOpenModalPicture] = useState(false);
  const handleOpenModalPicture = () => setOpenModalPicture(true);
  const handleCloseModalPicture = () => setOpenModalPicture(false);

  const [openModalQRCode, setOpenQRCode] = useState(false);
  const handleOpenModalQRCode = () => setOpenQRCode(true);
  const handleCloseModalQRCode = () => setOpenQRCode(false);

  //Estados que representam um estudante
  const {
    matriculationNumber,
    fullName,
    birthday,
    sex,
    shift,
    phone,
    address,
    neighborhood,
    cep,
    imagesStudent,
    allowedDays,
    registrationNumber,
    courseName,
    startingAddress,
    setStartingAddress,
    arrivingAddress,
    setArrivingAddress,
    setCourseName,
    setRegistrationNumber,
    setAllowedDays,
    scholarityLevel,
    setMatriculationNumber,
    setFullName,
    setBirthday,
    setSex,
    setShift,
    setPhone,
    setAddress,
    setNeighborhood,
    setCep,
    setScholarityLevel
  } = useStudent();

  const allDays = [
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" }
  ];

  const onReadQRCode = (qrCode) => {
    if (!!qrCode) {
      setMatriculationNumber(getRegistrationNumberFromQRCode(qrCode));
      handleCloseModalQRCode();
    }
  }

  const qrCodeButton = (text = '') => {
    return (
      <Button
        variant='outlined'
        onClick={handleOpenModalQRCode}
        className={classes.input}
        style={{ height: 40 }}
        fullWidth
      >
        {text} <FaQrcode />
      </Button>

    );
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems='center'
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card style={{ overflow: 'inherit' }}>
          <CardContent>
            <Typography variant="h5" align="center" className={classes.textTitle}>
              Cadastrar estudante
            </Typography>

            <Grid container spacing={1} style={{ marginTop: '30px' }}>

              <Grid container item xs={12} sm={12} md={8} lg={8} spacing={1} direction="row" >
                <Grid container item spacing={1} direction="row" >

                  {
                    matriculationNumber === '' ?
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        {qrCodeButton("LER QR CODE")}
                      </Grid>
                      :
                      <>
                        <Grid item xs={9} sm={9} md={4} lg={4}>
                          <TextField
                            required
                            disabled
                            style={{ backgroundColor: '#EEEEEE' }}
                            size='small'
                            className={classes.input}
                            label="Nº de matrícula"
                            variant="outlined"
                            value={matriculationNumber}
                            onChange={(e) => setMatriculationNumber(e.target.value)}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={3} sm={3} md={2} lg={2}>
                          {qrCodeButton()}
                        </Grid>
                      </>
                  }

                  {
                    scholarityLevel === 'Ensino Superior' ?
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          required
                          className={classes.input}
                          size="small"
                          label="Número de Cadastro"
                          variant="outlined"
                          value={registrationNumber}
                          onChange={(e) => setRegistrationNumber(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      : false
                  }

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      required
                      className={classes.input}
                      size="small"
                      label="Nome completo"
                      variant="outlined"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  {
                    scholarityLevel === 'Ensino Superior' ?
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            required
                            className={classes.input}
                            size="small"
                            label="Nome do Curso"
                            variant="outlined"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            required
                            className={classes.input}
                            size="small"
                            label="Endereço de Partida"
                            variant="outlined"
                            value={startingAddress}
                            onChange={(e) => setStartingAddress(e.target.value)}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            required
                            className={classes.input}
                            size="small"
                            label="Endeço de Chegada"
                            variant="outlined"
                            value={arrivingAddress}
                            onChange={(e) => setArrivingAddress(e.target.value)}
                            fullWidth
                          />
                        </Grid>
                      </>
                      : false
                  }

                </Grid>

                <Grid container item spacing={1} direction="row" >
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <MaskInput
                      mask="99/99/9999"
                      value={birthday}
                      onChange={setBirthday}
                      size="small"
                      required
                      label="Data de Nasc."
                      variant="outlined"
                      className={classes.input}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <FormControl
                      fullWidth
                      size='small'
                      required
                      variant='outlined'
                      className={classes.input}
                    >
                      <InputLabel>Sexo</InputLabel>
                      <SelectMUI
                        label='Sexo'
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                      >
                        <MenuItem value='M'>Masculino</MenuItem>
                        <MenuItem value='F'>Feminino</MenuItem>
                      </SelectMUI>
                    </FormControl>
                  </Grid>
                </Grid>


                <Grid container item spacing={1} direction="row" >
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControl
                      fullWidth
                      size='small'
                      required
                      variant='outlined'
                      className={classes.input}
                    >
                      <InputLabel>Turno</InputLabel>
                      <SelectMUI
                        label='Turno'
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                      >
                        <MenuItem value='Matutino'>Matutino</MenuItem>
                        <MenuItem value='Vespertino'>Vespertino</MenuItem>
                        <MenuItem value='Noturno'>Noturno</MenuItem>
                      </SelectMUI>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <MaskInput
                      mask="(99) 99999-9999"
                      value={phone}
                      onChange={setPhone}
                      required
                      className={classes.input}
                      valueOnlyNumbers={true}
                      size="small"
                      label="Nº do telefone"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControl
                      fullWidth
                      size='small'
                      required
                      variant='outlined'
                      className={classes.input}
                    >
                      <InputLabel>Escolaridade</InputLabel>
                      <SelectMUI
                        label='Escolaridade'
                        value={scholarityLevel}
                        onChange={(e) => setScholarityLevel(e.target.value)}
                      >
                        <MenuItem value='Ensino Básico'>Ensino Básico</MenuItem>
                        <MenuItem value='Ensino Superior'>Ensino Superior</MenuItem>
                      </SelectMUI>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container item spacing={1} direction="row" >
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      required
                      className={classes.input}
                      size="small"
                      label="Logradouro"
                      variant="outlined"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      required
                      className={classes.input}
                      size="small"
                      label="Bairro"
                      variant="outlined"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <MaskInput
                      mask="99999-999"
                      value={cep}
                      onChange={setCep}
                      valueOnlyNumbers={true}
                      className={classes.input}
                      size="small"
                      label="CEP"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  {
                    scholarityLevel === 'Ensino Superior' ?
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Select isMulti
                          options={allDays}
                          placeholder="Selecione os dias que o estudante utiliza o ônibus"
                          styles={styleMultiSelect}
                          value={allowedDays}
                          onChange={setAllowedDays}
                        />
                      </Grid> : false
                  }

                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>

                <Grid container justifyContent="center" style={{ border: '2px solid #C4C4C4', borderRadius: 10, height: '100%', marginTop: 5 }} alignItems="center">
                  <Grid item>
                    <Button>
                      <img alt="Usuário padrão" src={imagesStudent[0]?.src || defaultUserImg} style={{ height: '100%', maxHeight: 250, maxWidth: '100%' }} />
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button onClick={handleOpenModalPicture}>
                      <img alt="Selecionar imagem" src={takePictureImg} style={{ height: '100%' }} />
                    </Button>
                  </Grid>
                </Grid>

              </Grid>

            </Grid>

            <Modal
              open={openModalPicture}
              onClose={handleCloseModalPicture}
              closeAfterTransition
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModalPicture}>
                <Box className={classes.modal}>
                  <ModalPicture handleOpen={handleOpenModalPicture} handleClose={handleCloseModalPicture} />
                </Box>
              </Fade>
            </Modal>

            <Modal
              open={openModalQRCode}
              onClose={handleCloseModalQRCode}
              closeAfterTransition
              className='modal-qr-code'
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModalQRCode} style={{ height: '100vh', border: 'none', color: 'white' }}>
                <Box style={{ height: '100vh', width: '100%', border: 'none' }}>
                  <ArrowBackIos
                    onClick={handleCloseModalQRCode}
                    fontSize='large'
                    className='icon-arrow-back'
                  />
                  <QRCodeReader setQRCode={onReadQRCode} isRunning={openModalQRCode} title='CADASTRAR ESTUDANTE' />
                </Box>
              </Fade>
            </Modal>

          </CardContent>
        </Card >
      </Grid>

    </Grid>

  );
}