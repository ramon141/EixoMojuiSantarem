import React, { useState, useEffect } from 'react';

import {
  Card,
  Typography,
  CardContent,
  Grid,
  TextField,
  Button
} from '@material-ui/core';


import {
  ArrowBackIos
} from '@material-ui/icons';
import { FaQrcode } from 'react-icons/fa';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';

import api from '../../services/api';
import { styles } from './styles.js';
import './styles.css';
import ModalUnboarding from '../Unboarding/ModalUnboarding';
import { useHistory } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';
import { getRegistrationNumberFromQRCode } from '../../utils/qrCode';

export default function Uboarding() {

  const history = useHistory();
  const [notify, setNotify] = useState({
    type: '',
    message: '',
    title: '',
    isOpen: false
  });

  const [openModalUnboarding, setOpenModalUnboarding] = React.useState(false);
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState(undefined);

  const onRead = (qrCode) => {
    console.log('lido')

    if (!!qrCode) {
      const matriculationNumber = getRegistrationNumberFromQRCode(qrCode);

      // Verifica se o estudante pertence a escola que esta selecionado
      const studentBelongsToSchool = students.findIndex((item) => parseInt(item.matriculationNumber) === parseInt(matriculationNumber));

      if (studentBelongsToSchool !== -1) {
        api.post(`shipments/${matriculationNumber}/unship`).then(res => {
          console.log(res.data);
          handleCloseModalUnboarding();
        })

      } else {
        setNotify({
          type: 'error',
          title: 'Estudante não reconhecido',
          message: 'O estudante informado não pertence a escola ' + schoolSelected.name,
          isOpen: true
        });
        handleCloseModalUnboarding();
      }
    }
  }

  const handleOpenModalUnboarding = () => setOpenModalUnboarding(true);
  const handleCloseModalUnboarding = () => {
    setOpenModalUnboarding(false);
  }

  useEffect(() => {
    api.get('/schools').then(response => {
      setSchools(response.data);
      setSchoolSelected(response.data[0].name);
    })
  }, []);

  useEffect(() => {
    //So recarrega se o modal estiver fechando
    if (openModalUnboarding || schoolSelected === undefined || schoolSelected === null || schoolSelected.id === undefined) return;

    const schoolId = schoolSelected.id;

    const filter = {
      include: ['shipments'],
      where: {
        schoolId
      }
    };

    api.get(`/students?filter=${JSON.stringify(filter)}`).then(response => {
      let data = response.data;

      // console.log(data);

      data.forEach((student, index) => {
        data[index].inBus = false;

        if (student.shipments !== undefined && student.shipments.length > 0) {

          let shipmentsStudents = student.shipments.sort((a, b) => {
            const dateTimeA = new Date(a.datetime);
            const dateTimeB = new Date(b.datetime);

            return dateTimeB - dateTimeA;
          });

          data[index].shipments = shipmentsStudents;
          data[index].inBus = shipmentsStudents[0].type === "Embarque";
        }

      })

      setStudents(data);
    })

  }, [schoolSelected, openModalUnboarding]);

  function travelStatus(params) {
    const status = params.value ? "Em viagem" : "Desembarcou";

    return <span>{status}</span>
  }

  const columns = [
    {
      field: 'matriculationNumber',
      headerName: 'Matrícula',
      width: 150,
    },
    {
      field: 'fullName',
      headerName: 'Nome do Estudante',
      flex: 1
    },
    {
      field: 'inBus',
      headerName: 'Situação',
      renderCell: travelStatus,
      width: 300,
    }
  ];

  function tableStudents() {
    return (
      <Grid item style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={students}
          getRowClassName={(params) =>
            `row-${params.row.inBus ? "board" : "unboard"}`
          }
          pageSize={5}
          getRowId={(row) => row.matriculationNumber}
          rowsPerPageOptions={[5]}
        />
      </Grid>
    );
  }

  return (
    <Card style={styles.rootCard}>
      <CardContent>
        <Typography variant="h5" align="center" style={styles.textTitle}>
          Desembarcar Estudante
        </Typography>

        <Grid container spacing={2} justifyContent='center' style={{ marginTop: 30 }}>
          <Grid item>
            <Typography align='center' style={{ marginTop: 20 }}>
              Selecione a escola de desembarque:
            </Typography>
          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Autocomplete
              options={schools}
              onChange={(event, newValue) => {
                setSchoolSelected(newValue);
              }}
              size='small'
              fullWidth
              getOptionLabel={
                (option) => `${option.name}`
              }
              renderInput={(params) => <TextField {...params} label="Escola" variant="outlined" />}
            />
          </Grid>
          {
            students.length !== 0 ?
              <Grid item>
                <div
                  style={{ textAlign: 'center', cursor: 'pointer', border: '3px solid #FBCC08', borderRadius: '10px' }}
                  onClick={handleOpenModalUnboarding}
                >
                  <FaQrcode size={14 * 7} />
                  <br />
                  Ler QR Code
                </div>
              </Grid> : false
          }

          {
            students.length !== 0 ?
              tableStudents() : <>Não há estudantes registrados</>
          }

          <Grid container spacing={2} justifyContent='center' style={{ margin: 0, marginTop: 30 }}>
            <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
              <Button
                fullWidth
                onClick={() => history.push('/travel')}
                variant='outlined'
                style={{ backgroundColor: '#FBCC08' }}
              >
                <ArrowBackIos />
                Voltar
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </CardContent>

      <ModalUnboarding
        openModalUnboarding={openModalUnboarding}
        handleCloseModalUnboarding={handleCloseModalUnboarding}
        setQRCode={onRead}
      />

      <Notification notify={notify} setNotify={setNotify} />
    </Card>
  );
}