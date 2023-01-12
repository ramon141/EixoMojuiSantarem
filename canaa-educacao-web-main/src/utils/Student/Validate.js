export function Validate() {

    //Só pode conter números positivos
    function registrationNumber(registrationNumber, scholarityLevel) {
        //Somente é necessário se o estudante estiver no "Ensino Superior"
        if (scholarityLevel !== "Ensino Superior")
            return;

        if (isNaN(parseInt(registrationNumber)))
            throw new Error(`Por favor digite o número de cadastro`);

        if (parseInt(registrationNumber) <= 0)
            throw new Error(`O número de matrícula deve ser positivo`);
    }

    //Só pode conter números positivos
    function matriculationNumber(matriculationNumber) {
        if (isNaN(parseInt(matriculationNumber)))
            throw new Error(`Por favor leia o QRCode da matrícula`);

        if (parseInt(matriculationNumber) <= 0)
            throw new Error(`O número de matrícula deve ser positivo`);
    }

    //Não pode ser vazio
    function fullName(fullName) {
        if (fullName.length === 0)
            throw new Error(`O nome não pode estar vazio`);
    }

    //Verifica se é uma data anterior, e se é valida
    function birthday(birthday) {
        var birthdayCopy = new Date(birthday);

        if (isNaN(birthdayCopy) || birthday === null)
            throw new Error(`A data digitada não é válida`);

        if (birthdayCopy.getTime() > Date.now())
            throw new Error(`A data de nascimento deve ser uma data no passado`);
    }

    //Verifica se possui somente números, e se a quantidade de digitos varia entre 11 a 13
    function phone(phone) {
        if (isNaN(parseInt(phone)))
            throw new Error(`O telefone deve possuir somente números`);

        if (String(phone).length < 11 || String(phone).length > 13)
            throw new Error(`O telefone deve possuir entre 11 e 13 números`);
    }

    //Tiver somente numeros
    function cep(cep) {
        //CEP é opcional
        if (String(cep).length === 0)
            return;

        if (isNaN(parseInt(cep)))
            throw new Error(`O CEP deve possuir somente números`);

        if (String(cep).length !== 8)
            throw new Error(`O CEP deve possuir apenas 8 dígitos`);
    }

    //Verifica se os valores de allowedDays, está no período 0-6 (inclusos)
    function allowedDays(allowedDays, scholarityLevel) {
        if (scholarityLevel === 'Ensino Básico')
            return;

        if (!allowedDays || allowedDays.length === 0)
            throw new Error(`Selecione os dias de embarque`);

        for (let i = 0; i < allowedDays.length; i++)
            if (allowedDays < 0 || allowedDays > 6)
                throw new Error(`Os dias de embarque permitidos não são válidos`);
    }

    function shift(shift) {
        if (String(shift).length === 0)
            throw new Error(`Preencha o campo "Turno"`);
    }

    function sex(sex) {
        if (String(sex).length === 0)
            throw new Error(`Preencha o campo "Sexo"`);
    }

    function scholarityLevel(scholarityLevel) {
        if (String(scholarityLevel).length === 0)
            throw new Error(`Preencha o campo "Escolaridade"`);
    }

    function address(address) {
        if (String(address).length === 0)
            throw new Error(`Preencha o campo "Logradouro"`);
    }

    function neighborhood(neighborhood) {
        if (String(neighborhood).length === 0)
            throw new Error(`Preencha o campo "Bairro"`);
    }

    function schoolId(schoolId) {
        if (String(schoolId).length === 0)
            throw new Error(`Selecione a escola que o estudante participa`);
    }

    function relatives(relatives, scholarityLevel) {
        if (scholarityLevel === "Ensino Básico" && relatives.length === 0)
            throw new Error(`Por favor adicione um responsável ao usuário`);
    }

    function courseName(courseName, scholarityLevel) {
        if (scholarityLevel === "Ensino Superior" && String(courseName).length === 0)
            throw new Error(`Por favor, insira o nome do curso do estudante`);
    }

    function startingAddress(startingAddress, scholarityLevel) {
        if (scholarityLevel === "Ensino Superior" && String(startingAddress).length === 0)
            throw new Error(`Por favor, insira o endereço de partida do estudante`);
    }


    function arrivingAddress(arrivingAddress, scholarityLevel) {
        if (scholarityLevel === "Ensino Superior" && String(arrivingAddress).length === 0)
            throw new Error(`Por favor, insira o endereço de chegada do estudante`);
    }


    return {
        registrationNumber,
        matriculationNumber,
        fullName,
        birthday,
        phone,
        cep,
        allowedDays,
        shift,
        sex,
        scholarityLevel,
        address,
        neighborhood,
        schoolId,
        relatives,
        courseName,
        startingAddress,
        arrivingAddress,
    };
}


