import moment from "moment";

export function ConvertDataApiToFront() {
    function allowedDays(allowedDays) {
        //No banco de dados é armazenado somente um número que corresponde a um dia da semana
        //agora temos que fazer a conversão para um tipo que o campo Select leia
        const allDays = [
            { value: 1, label: "Segunda-feira" },
            { value: 2, label: "Terça-feira" },
            { value: 3, label: "Quarta-feira" },
            { value: 4, label: "Quinta-feira" },
            { value: 5, label: "Sexta-feira" },
            { value: 6, label: "Sábado" }
        ];

        let newAllowedDays = [];
        allowedDays.forEach((value) => {
            newAllowedDays.push(allDays[value - 1]);
        });

        return newAllowedDays;
    }

    function pictures(pictures) {
        if (!pictures) return [];

        let newPicture = pictures.map(item => ({
            isUploaded: true,
            src: item.url,
            filename: item.filename,
            id: item.id
        }));

        return newPicture;
    }

    return {
        allowedDays,
        pictures
    };
}

export function ConvertDataFrontToApi() {
    function matriculationNumber(matriculationNumber) {
        return String(matriculationNumber);
    }

    function registrationNumber(registrationNumber) {
        return String(registrationNumber);
    }

    function birthday(birthday) {
        return moment(birthday, 'DD/MM/YYYY').toDate().toJSON();
    }

    function allowedDays(allowedDays) {
        let copyAllowedDays = [...allowedDays];

        for (let i = 0; i < allowedDays.length; i++)
            copyAllowedDays[i] = parseInt(allowedDays[i].value);

        return copyAllowedDays;
    }

    return {
        matriculationNumber,
        registrationNumber,
        birthday,
        allowedDays
    };
}