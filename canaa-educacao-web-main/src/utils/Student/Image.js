import api from '../../services/api';
import { DataURIToBlob } from '../../utils/dataURIToBlob';

/*Funções para imagens únicas*/
async function postImage(image, studentId) {
    const imgInBase64 = DataURIToBlob(image.src);
    const form = new FormData();
    form.append('file', imgInBase64, image.id + '.jpeg');

    try {
        await api.post(`/pictures/${studentId}`, form);
    } catch (error) {
        throw new Error(`Ocorreu um erro ao enviar as imagens. ${error.response.data.error.message}`);
    }
}

async function deleteImage(image, studentId) {
    try {
        await api.delete(`/pictures/${studentId}/${image.id}`);
    } catch (error) {
        throw new Error(`Ocorreu um erro ao enviar as imagens. ${error.response.data.error.message}`);
    }
}

/*Funções que fazem ações em massa*/
export async function postImages(images, studentId) {
    try {
        if (images.length) {
            for (let i = 0; i < images.length; i++) {
                postImage(images[i], studentId);
            }
        }

    } catch (error) {
        throw error;
    }
}

export async function deleteImages(images, studentId) {
    try {
        if (images.length) {
            for (let i = 0; i < images.length; i++) {
                deleteImage(images[i], studentId);
            }
        }

    } catch (error) {
        throw error;
    }
}

export async function putImages(images, studentId) {
    try {
        const imagesToDelete = indentifierImagesToDelete(images);
        const imagesToUpload = indentifierImagesToUpload(images);

        deleteImages(imagesToDelete, studentId);
        postImages(imagesToUpload, studentId);

    } catch (error) {
        throw error;
    }
}

/*Funções auxiliares*/
function indentifierImagesToDelete(images) {
    let imagesToDelete = [];

    images.forEach((item) => {
        if (item.markToDelete && item.isUploaded/*Para deletar do servidor, tem que estar no servido*/)
            imagesToDelete.push(item);
    })

    return imagesToDelete;
}

function indentifierImagesToUpload(images) {
    let imagesToUpload = [];

    images.forEach((item) => {
        if (!item.markToDelete && !item.isUploaded)
            imagesToUpload.push(item);
    })

    return imagesToUpload;
}