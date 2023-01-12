import React, { useState } from 'react';
import { Relatives as RelativesManager } from '../utils/Relative/Relative';
import { Student as StudentManager } from '../utils/Student/Student';

export const StudentContext = React.createContext({});

export const StudentProvider = ({ children }) => {
    const [id, setId] = useState('');
    const [matriculationNumber, setMatriculationNumber] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sex, setSex] = useState('');
    const [shift, setShift] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [cep, setCep] = useState('');
    const [scholarityLevel, setScholarityLevel] = useState('');
    const [courseName, setCourseName] = useState('');
    const [startingAddress, setStartingAddress] = useState('');
    const [arrivingAddress, setArrivingAddress] = useState('');
    const [imagesStudent, setImagesStudent] = useState([]);
    const [allowedDays, setAllowedDays] = useState([]);

    const [relatives, setRelatives] = useState([]);
    const [schoolId, setSchoolId] = useState('');
    const context = {
        id,
        relatives,
        schoolId,
        matriculationNumber,
        fullName,
        birthday,
        sex,
        shift,
        phone,
        address,
        neighborhood,
        cep,
        scholarityLevel,
        imagesStudent,
        allowedDays,
        registrationNumber,
        courseName,
        startingAddress,
        setStartingAddress,
        arrivingAddress,
        setArrivingAddress,
        setCourseName,
        setRegistrationNumber,
        setAllowedDays,
        setMatriculationNumber,
        setFullName,
        setBirthday,
        setSex,
        setShift,
        setPhone,
        setAddress,
        setNeighborhood,
        setCep,
        setSchoolId,
        setRelatives,
        setScholarityLevel,
        setImagesStudent,
        setId,
        clearAll: () => {
            setMatriculationNumber('');
            setFullName('');
            setSchoolId('');
            setBirthday('');
            setSex('');
            setRegistrationNumber('');
            setImagesStudent([]);
            setRelatives([]);
            setAllowedDays([]);
            setStartingAddress('');
            setArrivingAddress('');
            setShift('');
            setPhone('');
            setAddress('');
            setCourseName('');
            setScholarityLevel('')
            setNeighborhood('');
            setCep('');
            setId('');
        }
    };
    return (
        <StudentContext.Provider value={context}>
            {children}
        </StudentContext.Provider>
    )
}

export const useRelatives = () => {
    const { relatives, setRelatives } = React.useContext(StudentContext);
    const relativesManager = new RelativesManager(relatives, setRelatives);
    return {
        ...relativesManager,
        relatives,
        setRelatives
    };
}

export const useSchool = () => {
    const { schoolId, setSchoolId } = React.useContext(StudentContext);
    return { schoolId, setSchoolId, };
}

export const useStudent = () => {
    const {
        id,
        relatives,
        matriculationNumber,
        fullName,
        birthday,
        sex,
        shift,
        phone,
        address,
        neighborhood,
        cep,
        scholarityLevel,
        imagesStudent,
        allowedDays,
        registrationNumber,
        courseName,
        startingAddress,
        setStartingAddress,
        arrivingAddress,
        setArrivingAddress,
        setCourseName,
        setRegistrationNumber,
        setAllowedDays,
        setMatriculationNumber,
        setFullName,
        setBirthday,
        setSex,
        setShift,
        setPhone,
        setAddress,
        setNeighborhood,
        setCep,
        setScholarityLevel,
        setImagesStudent,
        setRelatives,
        setId,
        clearAll,
        setSchoolId,
        schoolId
    } = React.useContext(StudentContext);

    const studentManager = new StudentManager({
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
    });

    return {
        ...studentManager,
        id,
        relatives,
        matriculationNumber,
        fullName,
        birthday,
        sex,
        shift,
        phone,
        address,
        neighborhood,
        cep,
        imagesStudent,
        scholarityLevel,
        allowedDays,
        registrationNumber,
        startingAddress,
        setStartingAddress,
        arrivingAddress,
        setArrivingAddress,
        setRegistrationNumber,
        courseName,
        setCourseName,
        setAllowedDays,
        setMatriculationNumber,
        setFullName,
        setBirthday,
        setSex,
        setShift,
        setPhone,
        setAddress,
        setNeighborhood,
        setCep,
        setScholarityLevel,
        setImagesStudent,
        setRelatives,
        setId,
        clearAll
    }
}