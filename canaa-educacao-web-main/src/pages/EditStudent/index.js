
import React, { useEffect, useState } from 'react';
import {
  Grid
} from '@material-ui/core';
import InfoStudent from './InfoStudent';
import AssociateStudent from './AssociateStudent/';
import AssociateSchool from './AssociateSchool';
import { useStudent } from '../../contexts/studentsContext';
import { useHistory } from 'react-router-dom';
import { withNotitificationCustom } from '../../contexts/NotificationContext';
import Notification from '../../components/Notification/Notification';

function EditStudent(props) {
  const {
    clearAll,
    load,
    put
  } = useStudent();

  const history = useHistory();

  const [notify, setNotify] = useState({
    type: '',
    message: '',
    title: '',
    isOpen: false
  });

  const onCancel = () => {
    clearAll();
    history.push('/manager-student');
  }

  useEffect(() => {
    const boot = async () => {
      if (props.match.params.id) {
        try {
          await load(props.match.params.id);
        } catch (e) {
          console.log(e)

          props.handleOpenNotificationCustom({
            title: 'Algo deu errado ao recarregar o usuário!',
            onConfirm: props.handleCloseNotificationCustom
          });

          history.goBack();
        }

      } else {
        history.goBack();
      }

    }

    boot();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  const submitEditStudent = async () => {
    try {

      await put(props.match.params.id);

      clearAll();
      props.handleOpenNotificationCustom({ title: 'Editado!', onConfirm: props.handleCloseNotificationCustom })
      history.push('/manager-student');
    } catch (e) {
      console.error(e.message);

      setNotify({
        type: 'error',
        message: e.message,
        title: "Erro ao editar estudante",
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
        <InfoStudent student_id={props.match.params.id} />
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
        <AssociateStudent onSubmit={submitEditStudent} onCancel={onCancel} />
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
    </Grid>

  );
}
export default withNotitificationCustom(EditStudent);