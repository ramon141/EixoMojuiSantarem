import api from '../../services/api';
import { postImages, putImages } from './Image';
import { format } from 'date-fns';
import { ConvertDataApiToFront, ConvertDataFrontToApi } from './ConvertData';
import { Validate } from './Validate';

const validate = Validate();
const convertDataApiToFront = ConvertDataApiToFront();
const convertDataFrontToApi = ConvertDataFrontToApi();

export const Student = ({
    id, setId,
    matriculationNumber, setMatriculationNumber,
    fullName, setFullName,
    birthday, setBirthday,
    sex, setSex,
    shift, setShift,
    registrationNumber, setRegistrationNumber,
    phone, setPhone,
    address, setAddress,
    neighborhood, setNeighborhood,
    scholarityLevel, setScholarityLevel,
    cep, setCep,
    imagesStudent, setImagesStudent,
    allowedDays, setAllowedDays,
    relatives, setRelatives,
    schoolId, setSchoolId,
    courseName, setCourseName,
    startingAddress, setStartingAddress,
    arrivingAddress, setArrivingAddress
}) => {

    //Retorna os dados do estudante no formato de objeto
    function toObject() {
        return {
            matriculationNumber,
            registrationNumber,
            fullName,
            birthday,
            sex,
            shift,
            phone,
            address,
            neighborhood,
            cep,
            scholarityLevel,
            allowedDays,
            imagesStudent,
            relatives,
            schoolId,
            courseName,
            startingAddress,
            arrivingAddress
        };
    }

    function toObjectFormatedToRequest() {
        if (scholarityLevel === 'Ensino Básico') {
            return {
                matriculationNumber: convertDataFrontToApi.matriculationNumber(matriculationNumber),
                registrationNumber: convertDataFrontToApi.registrationNumber(registrationNumber),
                fullName,
                birthday: convertDataFrontToApi.birthday(birthday),
                sex,
                shift,
                phone,
                address,
                neighborhood,
                cep,
                scholarityLevel,
                relatives,
                schoolId
            };
        }

        return {
            matriculationNumber: convertDataFrontToApi.matriculationNumber(matriculationNumber),
            registrationNumber: convertDataFrontToApi.registrationNumber(registrationNumber),
            fullName,
            birthday: convertDataFrontToApi.birthday(birthday),
            sex,
            shift,
            phone,
            address,
            neighborhood,
            cep,
            scholarityLevel,
            allowedDays: convertDataFrontToApi.allowedDays(allowedDays),
            schoolId,
            courseName,
            startingAddress,
            arrivingAddress
        };
    }

    function validateStudent() {
        try {
            const studentFormated = toObjectFormatedToRequest();

            validate.registrationNumber(studentFormated.registrationNumber, studentFormated.scholarityLevel);
            validate.matriculationNumber(studentFormated.matriculationNumber);
            validate.fullName(studentFormated.fullName);
            validate.birthday(studentFormated.birthday);
            validate.phone(studentFormated.phone);
            validate.cep(studentFormated.cep);
            validate.scholarityLevel(studentFormated.scholarityLevel);
            validate.allowedDays(studentFormated.allowedDays, studentFormated.scholarityLevel);
            validate.sex(studentFormated.sex);
            validate.shift(studentFormated.shift);
            validate.neighborhood(studentFormated.neighborhood);
            validate.address(studentFormated.address);
            validate.schoolId(studentFormated.schoolId);
            validate.relatives(studentFormated.relatives, studentFormated.scholarityLevel);
            validate.courseName(studentFormated.courseName, studentFormated.scholarityLevel);
            validate.startingAddress(studentFormated.startingAddress, studentFormated.scholarityLevel);
            validate.arrivingAddress(studentFormated.arrivingAddress, studentFormated.scholarityLevel);

        } catch (e) {
            throw e;
        }
    }

    //Valida as informações do usuário e faz a requisição para criar o estudante
    async function post() {
        try {
            let studentId = -1;

            //Valida os campos, caso ocorra erro na validação o catch, pega os
            //erros e lança(throw) para o try-catch que circunda o post.
            validateStudent();

            //Realiza a requisição de fato
            try {
                const response = await api.post(`students`, toObjectFormatedToRequest());
                studentId = response.data.id;
            } catch (error) {
                throw new Error(`Erro na criação do estudante. ${error.response.data.error.message}`);
            }

            //Envias as imagens
            if (studentId !== -1)
                await postImages(imagesStudent, studentId);
        } catch (e) {
            throw e;
        }
    }

    //Altera informações do estudante
    async function put(studentId) { //id != matriculationNumber
        try {
            //Valida os campos, caso ocorra erro na validação o catch, pega os
            //erros e lança(throw) para o try-catch que circunda o put.
            validateStudent();

            //Realiza a requisição de fato
            try {
                await api.put(`/students/${studentId}`, Object.assign(toObjectFormatedToRequest(), { studentId }));
            } catch (error) {
                throw new Error(`Erro na criação do estudante. ${error.message}`);
            }

            await putImages(imagesStudent, studentId);
        } catch (e) {
            throw e;
        }
    }

    /**
     * A função realiza uma requisição a API e salva os dados nos atributos dados.
     * @param {*} studentId Especifica o id do estudante que será atribuído no contexto
     */
    async function load(studentId) {
        try {
            const { data } = await api.get(`/students/${studentId}?filter={"include":["pictures"]}`);

            setId(data.id);
            setMatriculationNumber(data.matriculationNumber);
            setFullName(data.fullName);
            setBirthday(format(new Date(data.birthday), "dd/MM/yyyy"));
            setSex(data.sex);
            setShift(data.shift);
            setPhone(data.phone);
            setAddress(data.address);
            setNeighborhood(data.neighborhood);
            setCep(data.cep);
            setScholarityLevel(data.scholarityLevel);
            setSchoolId(data.schoolId);
            setImagesStudent(convertDataApiToFront.pictures(data.pictures));

            if (data.scholarityLevel === 'Ensino Básico') {
                setRelatives(data.relatives);

            } else {
                setRegistrationNumber(data.registrationNumber); setCourseName(data.courseName);
                setStartingAddress(data.startingAddress);
                setArrivingAddress(data.arrivingAddress);
                setAllowedDays(convertDataApiToFront.allowedDays(data.allowedDays));
            }

        } catch (error) {
            throw error;
        }
    }

    return {
        toObject,
        toObjectFormatedToRequest,
        post,
        put,
        load
    };

}