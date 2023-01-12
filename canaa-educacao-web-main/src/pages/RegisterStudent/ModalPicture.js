import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    FormControl,
    Grid,
    Hidden,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import './styles.css';
import { useStudent } from '../../contexts/studentsContext';
import { generateId } from '../../utils/unique';
import { BiImport } from 'react-icons/bi';
import { useFilePicker } from 'use-file-picker';

export default function ModalPicture({ handleClose }) {
    const {
        imagesStudent,
        setImagesStudent
    } = useStudent();

    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        maxFileSize: 5/*Mbs*/,
    });

    /**
     * É necessário criar uma copia de imagesStudents para manter a variável intacta antes
     * de clicar em confirmar. Anteriormente o botão cancelar teria que deletar todas as imagens
     * o que pode não ser o objetivo do usuário, por exemplo o usuário já tirou as fotos e
     * clicou em confirmar, e posteriormente entrou neste modal novamente. Caso ele delete uma
     * imagem sem querer, não haverá botão para reverter a ação. Enquanto que criando uma copia
     * o botão cancelar irá reverter as ações do usuário e manterão as imagens "originais" intactas
     */
    const [images, setImages] = useState([...imagesStudent]);
    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);

    const webcamRef = useRef(null);

    function removeImage(img) {
        console.log(img);
        setImages(images.filter(image => image.src !== img.src));
    }

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImages(images => [...images, { id: generateId(10), src: imageSrc }]);
        }, [webcamRef]
    );

    const handleConfirm = () => {
        setImagesStudent([...images]);
        handleClose();
    }

    const handleDevices = useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );

    useEffect(() => {
        if (!!devices && devices.length > 0) {
            setDeviceId(devices[0].deviceId)
        }
    }, [devices]);

    useEffect(() => {
        //Tranforma o formato do selector de imagens para o formato da webcam
        if (filesContent.length !== 0) {
            let newImages = [...images];

            filesContent.forEach((item) => {
                newImages.push({
                    id: generateId(10),
                    src: item.content
                });
            })

            setImages(newImages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filesContent]);

    return (
        <Grid container spacing={2} className="root">
            <Grid container item alignItems="center" spacing={2} justifyContent="center" xs={12} sm={7} md={7} lg={7}>
                <Grid item xs={12} sm={12} md={6} lg={6}>

                    <FormControl size='small' variant='outlined' fullWidth>
                        <InputLabel>Selecione a câmera</InputLabel>
                        <Select
                            label='Selecione a câmera'
                            value={deviceId}
                            onChange={(e) => setDeviceId(e.target.value)}
                        >
                            {devices.map((device) => (
                                <MenuItem key={device.deviceId} value={device.deviceId}>{device.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <button className='btn-import-picture' onClick={() => openFileSelector()}>
                        Importar fotos <BiImport />
                    </button>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Webcam
                        className="webcam"
                        audio={false}
                        width='100%'
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            width: 1280,
                            height: 720,
                            deviceId: deviceId,
                            facingMode: "user"
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <div className="externa" style={{ marginTop: '20px' }}>
                        <button className="btn-confirm" onClick={capture}>
                            Capturar
                        </button>
                    </div>
                </Grid>
            </Grid>

            <Grid container item xs={12} sm={5} md={5} lg={5}>
                <Grid item>
                    <Hidden xsDown >
                        <div className="linha-vertical">
                        </div>
                    </Hidden>
                </Grid>

                <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2} className="fotos" style={{ marginTop: '15px', marginLeft: '2px', width: '101.6%' }}>
                    {
                        images.map((item, key) => (
                            <Grid item key={key} xs={12} sm={6} md={4} lg={4} className="foto">
                                <button className="foto-fechar" style={{ zIndex: 30 }} onClick={() => removeImage(item)}>
                                    <CancelIcon fontSize="large" style={{ 'color': '#ff0000', zIndex: 50 }} />
                                </button>

                                <img src={item.src} alt="imagem" />
                            </Grid>
                        ))
                    }

                </Grid>

                <Grid container alignItems="center" spacing={1} justifyContent="center" style={{ marginTop: 6, maxHeight: 100 }}>
                    <Grid item  >
                        <button className="btn-cancel" onClick={handleClose}>
                            Cancelar
                        </button>
                    </Grid>
                    <Grid item  >
                        <button className="btn-confirm" onClick={handleConfirm} >
                            Confirmar
                        </button>
                    </Grid>

                </Grid>
            </Grid>

        </Grid >
    );
}