import React from 'react';
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

import Select from 'react-select';

import defaultUserImg from '../../assets/default-user.png';
import takePictureImg from '../../assets/takePicture.png';
import ModalPicture from './ModalPicture';
import './styles.css';
import MaskInput from '../../components/MaskInput';
import { useStudent } from '../../contexts/studentsContext';
const useStyles = makeStyles((theme) => ({
  inputDisable: {
    marginTop: '10px',
    backgroundColor: '#dedede'
  },

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

export default function InfoStudent({ student_id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const allDays = [
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" }
  ];

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
    allowedDays,
    imagesStudent,
    scholarityLevel,
    registrationNumber,
    courseName,
    startingAddress,
    setStartingAddress,
    arrivingAddress,
    setArrivingAddress,
    setCourseName,
    setFullName,
    setBirthday,
    setSex,
    setShift,
    setAllowedDays,
    setPhone,
    setAddress,
    setNeighborhood,
    setCep,
    setScholarityLevel
  } = useStudent();


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
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      disabled
                      required
                      className={classes.inputDisable}
                      size="small"
                      label="Nº de Matrícula"
                      variant="outlined"
                      value={matriculationNumber}
                      fullWidth
                    />
                  </Grid>

                  {
                    scholarityLevel === 'Ensino Superior' ?
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          disabled
                          required
                          className={classes.inputDisable}
                          size="small"
                          label="Nº de Cadastro"
                          variant="outlined"
                          value={registrationNumber}
                          fullWidth
                        />
                      </Grid> : false
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
                      <img alt="Usuário padrão" src={imagesStudent.find((item) => { return !item.markToDelete })?.src || defaultUserImg} style={{ height: '100%', maxWidth: '100%' }} />
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button onClick={handleOpen}>
                      <img alt="Selecionar imagem" src={takePictureImg} style={{ height: '100%' }} />
                    </Button>
                  </Grid>
                </Grid>

              </Grid>

            </Grid>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box className={classes.modal}>
                  <ModalPicture student_id={student_id} handleOpen={handleOpen} handleClose={handleClose} />
                </Box>
              </Fade>
            </Modal>

          </CardContent>
        </Card >
      </Grid>

    </Grid>

  );
}