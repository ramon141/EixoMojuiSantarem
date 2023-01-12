import { styles } from './styles';
import {
  Fade,
  Modal,
  Box,
} from '@material-ui/core';

import {
  ArrowBackIos
} from '@material-ui/icons';

import QRCodeReader from '../../components/QRCodeReader';

export default function ModalUnboarding({
  openModalUnboarding,
  handleCloseModalUnboarding,
  setQRCode
}) {
  return (
    <Modal
      open={openModalUnboarding}
      onClose={handleCloseModalUnboarding}
      closeAfterTransition
      style={{ height: '100vh', backgroundColor: 'black' }}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalUnboarding} style={{ height: '100vh' }}>
        <Box style={styles.modal}>
          <ArrowBackIos
            onClick={handleCloseModalUnboarding}
            fontSize='large'
            style={styles.iconArrowBack}
          />
          <QRCodeReader isRunning={openModalUnboarding} setQRCode={setQRCode} title='DESEMBARCAR ESTUDANTE' />
        </Box>
      </Fade>
    </Modal>
  )
}