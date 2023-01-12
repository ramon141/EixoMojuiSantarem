import api from '../../services/api';
import { format } from 'date-fns';

export function getStudentFromRegistrationNumber(
  matriculationNumber,
  setFullName,
  setBirthday,
  setShift,
  setSchool,
  setUserPicture,
  callbackOnError) {

  const filter = {
    where: {
      matriculationNumber
    },
    include: [
      "school",
      "pictures"
    ]
  };

  api.get(`/students?filter=${JSON.stringify(filter)}`)
    .then((res) => {
      const student = res.data[0];

      if (res.data[0]) {
        setFullName(student.fullName);

        setBirthday(
          format(new Date(student.birthday), 'dd/MM/yyyy')
        );

        setUserPicture(
          !!student.pictures && !!student.pictures[0] ?
            student.pictures[0].url : ''
        );

        setShift(student.shift);
        setSchool(student.school);

      } else {
        callbackOnError('O estudante não está registrado no sistema')
      }
    }).catch((error) => {

    })

}


