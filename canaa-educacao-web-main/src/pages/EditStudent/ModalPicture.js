import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    FormControl,
    Grid,
    Hidden,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import './styles.css';
import { useStudent } from '../../contexts/studentsContext';
import { generateId } from '../../utils/unique';
import { BiImport } from 'react-icons/bi';
import { useFilePicker } from 'use-file-picker';

export default function ModalPicture({ handleClose, handleOpen, student_id, handleOpenNotificationCustom, isOpen, handleCloseNotificationCustom }) {
    const {
        imagesStudent,
        setImagesStudent,
    } = useStudent();

    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        maxFileSize: 5/*Mbs*/,
    });

    /**
     * É necessário criar uma cópia de imagesStudents para manter a variável intacta antes
     * de clicar em confirmar. Anteriormente o botão cancelar teria que deletar todas as imagens
     * o que pode não ser o objetivo do usuário, por exemplo o usuário já tirou as fotos e
     * clicou em confirmar, e posteriormente entrou neste modal novamente. Caso ele delete uma
     * imagem sem querer, não haverá botão para reverter a ação. Enquanto que criando uma cópia
     * o botão cancelar irá reverter as ações do usuário e manterão as imagens "originais" intactas
     */
    const [images, setImages] = useState(initObject());

    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcamRef = useRef(null);

    async function removeImage(img) {

        setImages(
            images.map((item) => {
                //Marca o item evitando que seja mostrado na tela, e avisando que deve ser
                //deletado da API
                if (item.id === img.id)
                    item.markToDelete = true;

                return item;
            })
        );
    }

    function initObject() {
        /**
         * Formato do imagesStudentFormated
         * [
         *    {
         *        isUploaded: true
         *        delete: false
         *        filename: ...
         *        src: ...
         *        id: ...
         *    }
         * ]
         */
        let imagesStudentFormated = [];

        imagesStudent.forEach((item) => {
            imagesStudentFormated.push({
                id: item.id,
                src: item.src,
                filename: item.filename,
                isUploaded: item.isUploaded || true,
                markToDelete: item.markToDelete || false
            });
        })

        return imagesStudentFormated;
    }

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            const id = generateId(10);

            setImages(prev => [...prev, {
                id,
                src: imageSrc,
                isUploaded: false,
                filename: id + '.jpeg',
                markToDelete: false
            }]);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [webcamRef]
    );

    const handleConfirm = async () => {
        try {
            setImagesStudent([...images]);
            handleClose();
        } catch (e) {
            handleOpenNotificationCustom({ title: `Algumas imagens não foram deletadas devido a um erro.`, onConfirm: handleCloseNotificationCustom });
        }
    }

    const handleCancel = () => {
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
    }, [devices])

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
        <>
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
                            videoConstraints={videoConstraints}
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
                            images.map((item, key) => {
                                return (
                                    !item.markToDelete ?
                                        <Grid item key={key} xs={12} sm={6} md={4} lg={4} className="foto">
                                            <span className="foto-fechar" style={{ zIndex: 30, cursor: 'pointer' }} onClick={() => removeImage(item)}>
                                                <CancelIcon fontSize="large" style={{ 'color': '#ff0000', zIndex: 50 }} />
                                            </span>
                                            <img src={item.src} alt="imagem" />
                                        </Grid> : false
                                )
                            })
                        }

                    </Grid>
                    <Grid container alignItems="center" spacing={1} justifyContent="center" style={{ marginTop: 6, maxHeight: 100 }}>
                        <Grid item  >
                            <button className="btn-cancel" onClick={handleCancel}>
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
        </>
    );
}