import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import ufpaLogo from '../../assets/ufpa.png';
import canaaBandeira from '../../assets/LogoPrefeitura.png';
import logoFundacao from '../../assets/LogoFUNDACAO.png';
import logoPacto from '../../assets/Pacto.png';
import { Grid } from '@material-ui/core';

import { Desc } from "./styles";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">

        <div className="row ">
          {/* Primeira linha do Footer */}
          <div className="col">
            <h5>Parcerias</h5>
          </div>
        </div>

        <Grid container direction='row' justifyContent='center' alignItems="center" spacing={2}>

          <Grid item xs={3} sm={3} md={2} lg={2}>
            <a href="https://portal.ufpa.br/" rel="noreferrer" target="_blank">
              <img src={ufpaLogo} className='logo' alt="Logo UFPA" />
            </a>
          </Grid>

          <Grid item xs={3} sm={3} md={2} lg={2}>
            <a href="/search" rel="noreferrer" target="_blank">
              <img src={logoFundacao} className='logo' alt="Logo UFPA" />
            </a>
          </Grid>

          <Grid item xs={3} sm={3} md={2} lg={2}>
            <a href="/search" rel="noreferrer" target="_blank">
              <img src={logoPacto} className='logo' alt="Logo UFPA" />
            </a>
          </Grid>

          <Grid item xs={3} sm={3} md={2} lg={2}>
            <a href="https://www.canaadoscarajas.pa.gov.br/novo/" rel="noreferrer" target="_blank">
              <img src={canaaBandeira} className='logo' alt="Logo UFPA" />
            </a>
          </Grid>

        </Grid>

        <Desc>
          <hr />
          <div className="row">
            <p className="col-sm">
              &copy;{new Date().getFullYear()} Prefeitura municipal de Canaã dos Carajás | Todos os direitos reservados |
            </p>
          </div>
        </Desc>
      </div>
    </div>
  );
}

export default Footer;