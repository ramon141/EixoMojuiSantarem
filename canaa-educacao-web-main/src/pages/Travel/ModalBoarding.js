import { styles } from './style';
import {
  Fade,
  Modal,
  Box,
} from '@material-ui/core';

import {
  ArrowBackIos
} from '@material-ui/icons';

import QRCodeReader from '../../components/QRCodeReader/';

export default function ModalBoarding({
  openModalBoarding,
  handleCloseModalBoarding,
  setQRCode
}) {
  return (
    <Modal
      open={openModalBoarding}
      onClose={handleCloseModalBoarding}
      closeAfterTransition
      style={styles.modal}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalBoarding} style={{ height: '100vh', border: 'none' }}>
        <Box style={{ height: '100vh', width: '100%', border: 'none' }}>
          <ArrowBackIos
            onClick={handleCloseModalBoarding}
            fontSize='large'
            style={styles.iconArrowBack}
          />
          <QRCodeReader isRunning={openModalBoarding} setQRCode={setQRCode} title='EMBARCAR ESTUDANTE' />
        </Box>
      </Fade>
    </Modal>
  )
}