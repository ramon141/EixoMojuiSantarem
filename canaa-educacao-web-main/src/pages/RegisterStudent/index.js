
import React, { useState } from 'react';
import {
  Grid
} from '@material-ui/core';
import InfoStudent from './InfoStudent';
import AssociateStudent from './AssociateStudent/';
import AssociateSchool from './AssociateSchool';
import { useStudent } from '../../contexts/studentsContext';
import { useHistory } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';

export default function RegisterStudent(props) {

  const student = useStudent();

  const history = useHistory();

  const [notify, setNotify] = useState({
    type: '',
    message: '',
    title: '',
    isOpen: false
  });

  const onCancel = () => {
    student.clearAll();
    history.push('/manager-student');
  }

  const submitNewStudent = async () => {
    try {
      await student.post();
      console.log(student.infoStudent);

      setNotify({
        type: 'success',
        message: "O cadastro foi realizado com sucesso",
        title: "Cadastrado!",
        isOpen: true
      });
      student.clearAll();
      history.push('/manager-student');

    } catch (e) {
      console.log(e)

      setNotify({
        type: 'error',
        message: e.message,
        title: "Erro ao cadastrar estudante",
        isOpen: true
      });
    }
  }

  return (
    <Grid container style={{ padding: '30px' }} spacing={1}>
      <Grid item

        sm={12}
        xs={12}
        lg={12}
        md={12}
      >
        <InfoStudent />
      </Grid>
      <Grid item

        sm={12}
        xs={12}
        lg={12}
        md={12}
      >
        <AssociateSchool />
      </Grid>

      <Grid item
        sm={12}
        xs={12}
        lg={12}
        md={12}
      >
        <AssociateStudent onSubmit={submitNewStudent} onCancel={onCancel} />
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
    </Grid>
  );
}