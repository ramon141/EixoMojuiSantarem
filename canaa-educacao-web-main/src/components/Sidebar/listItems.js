import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: theme.palette.background.paper,
  },

  nested: {
    paddingLeft: theme.spacing(4),
    color: '#000'
  },

  cor: {
    color: '#000'
  },
}));

export default function ListItems() {
  const classes = useStyles();

  //Informa as permissões que 
  const typeUser = localStorage.getItem('Permission');

  const [openRegister, setOpenRegister] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  function handleClickCadastro() {
    setOpenRegister(!openRegister);
  };

  function handleClickReport() {
    setOpenReport(!openReport);
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <div>

      {
        typeUser === "Admin" || typeUser === "Técnico" ?
          <>
            <ListItem button onClick={handleClickCadastro}>
              <ListItemText primary="Gerenciamento" className={classes.cor} />
              {openRegister ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openRegister} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItemLink button href="/school-register" className={classes.nested}>
                  <ListItemText primary="Escola" />
                </ListItemLink>

                <ListItemLink button href="/manager-student" className={classes.nested}>
                  <ListItemText primary="Estudante" />
                </ListItemLink>

              </List>
            </Collapse>
          </> : false
      }

      {
        typeUser === "Admin" ?
          <>
            <ListItem button onClick={handleClickReport}>
              <ListItemText primary="Relatório" className={classes.cor} />
              {openReport ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openReport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItemLink button href="/attendance-report" className={classes.nested}>
                  <ListItemText primary="Viagens" />
                </ListItemLink>

              </List>
            </Collapse>
          </> : false
      }


      {
        typeUser === "Admin" || typeUser === "Monitor" ?
          <ListItemLink button href="/travel" className={classes.cor}>
            <ListItemText primary="Embarque/Desembarque" />
          </ListItemLink>
          : false
      }

      {
        typeUser === "Admin" ?
          <>
            <ListItemLink button href="/manager" className={classes.cor}>
              <ListItemText primary="Cadastro de usuários" />
            </ListItemLink>
          </> : false
      }

    </div>
  );
};