function extractRegistrationNumberChild(qrCode) {
  let matriculationNumber = qrCode.substring(qrCode.indexOf("matricula:") + 10, qrCode.indexOf(" /"));
  matriculationNumber = parseInt(matriculationNumber);

  if (!isNaN(matriculationNumber) && isFinite(matriculationNumber))
    return matriculationNumber;
  else
    return -1;
}

function extractRegistrationNumberHighSchool(qrCode) {
  let matriculationNumber = qrCode.split(' ')[0];
  //Algumas carteirinhas usam o \n para separar a matricula do nome
  matriculationNumber = qrCode.split('\n')[0];

  matriculationNumber = parseInt(matriculationNumber);

  if (!isNaN(matriculationNumber) && isFinite(matriculationNumber))
    return matriculationNumber;
  else
    return -1;
}

export function getRegistrationNumberFromQRCode(qrCode) {
  //Verifica se o qr code é infantil ou não. O qr code destes, possui uma formatação um pouco diferente
  if (qrCode.includes("matricula")) {
    return extractRegistrationNumberChild(qrCode);

  } else {
    return extractRegistrationNumberHighSchool(qrCode)
  }



}