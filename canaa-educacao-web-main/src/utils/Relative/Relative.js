export const Relatives = (
    relatives,
    setRelatives
) => {
    function getRelatives() {
        return relatives;
    }

    const getOnlyNumbers = (str) => {
        //Usando regex podemos substituir tudo que não é número por espaço em branco
        return str.replace(/[^0-9]/g, '');
    }

    //Verifica se o email já foi cadastrado por outro parente
    function validateEmail(email, ignoreDuplicateEmail) {
        console.log(relatives);
        if (!ignoreDuplicateEmail && (relatives.find(olderRelative => olderRelative.email === email) !== undefined))
            throw new Error(`O email "${email}" já está em uso em outro parente. Por favor insira outro`);

        //Esse regex se encontra na validação de criação de novas contas
        let regexValidationEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!regexValidationEmail.test(email))
            throw new Error(`O email "${email}" é inválido, por favor digite novamente`);
    }

    //Verifica se possui somente números, e se a quantidade de digitos varia entre 11 a 13
    function validatePhone(phone) {
        if (isNaN(parseInt(phone)))
            throw new Error(`O telefone deve possuir somente números ${phone}`);

        if (String(phone).length < 11 || String(phone).length > 13)
            throw new Error(`O telefone deve possuir entre 11 e 13 números`);
    }

    function validateAddressNumber(addressNumber) {
        if (Number.isNaN(parseInt(addressNumber)))
            throw new Error(`O número da casa é inválido`);

    }

    //Não pode ser vazio
    function validateFullName(fullName) {
        if (fullName === null || fullName.length === 0)
            throw new Error(`O nome não pode estar vazio`);
    }

    //Não pode ser vazio
    function validateRelationship(relationship) {
        if (relationship === null || relationship.length === 0)
            throw new Error(`Por favor informe a relação entre o parente cadastrado e o estudante`);
    }

    //Não pode ser vazio
    function validateAddress(address) {
        if (address === null || address.length === 0)
            throw new Error(`Informe seu endereço`);
    }

    //Não pode ser vazio
    function validateNeighborhood(neighborhood) {
        if (neighborhood === null || neighborhood.length === 0)
            throw new Error(`Informe seu bairro`);
    }

    //Não pode ser nulo
    function validateIsLegalResponsible(isLegalResponsible) {
        if (isLegalResponsible === null)
            throw new Error(`Por favor informe se você é o responsável do estudante`);
    }

    function validateRelative(relative, ignoreDuplicateEmail = false) {
        try {
            validateEmail(relative.email, ignoreDuplicateEmail);
            validatePhone(relative.phone)
            validateAddressNumber(relative.addressNumber);
            validateFullName(relative.fullName);
            validateRelationship(relative.relationship);
            validateAddress(relative.address);
            validateNeighborhood(relative.neighborhood);
            validateIsLegalResponsible(relative.isLegalResponsible);
        } catch (error) {
            throw error;
        }
    }

    function convertDatas(relative) {
        relative.phone = getOnlyNumbers(relative.phone);

        relative.addressNumber = getOnlyNumbers(relative.addressNumber);

        return relative;
    }

    function getObjectsRelativeFromRelative(relative) {
        return {
            email: relative.email,
            phone: relative.phone,
            address: relative.address,
            addressNumber: relative.addressNumber,
            fullName: relative.fullName,
            relationship: relative.relationship,
            neighborhood: relative.neighborhood,
            isLegalResponsible: relative.isLegalResponsible
        };
    }

    function add(relative) {
        try {
            relative = convertDatas(relative);
            validateRelative(relative);

            let newRelative = getObjectsRelativeFromRelative(relative);

            setRelatives(
                (preview) => [...preview, newRelative]
            );

        } catch (error) {
            throw error;
        }
    }

    function remove(email) {
        let newRelatives = relatives.filter(
            relative => relative.email !== email
        );

        setRelatives(newRelatives);
    }

    function getRelative(email) {
        return relatives.filter(relative => relative.email === email)[0];
    }

    function put(relative, email) {
        try {
            if (relative.email === email)
                validateRelative(relative, true);
            else
                validateRelative(relative);

            let newRelative = getObjectsRelativeFromRelative(relative);

            let copyRelatives = [...relatives];
            for (let i = 0; i < copyRelatives.length; i++) {
                if (relatives[i].email === email) {
                    copyRelatives[i] = newRelative;
                }
            }

            setRelatives(copyRelatives);
        } catch (error) {
            throw error;
        }
    }

    return {
        add,
        remove,
        put,
        getRelatives,
        getRelative
    };
}