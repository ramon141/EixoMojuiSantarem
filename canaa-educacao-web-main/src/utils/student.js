const getOnlyNumbers = (str) => {
    //Usando regex podemos substituir tudo que não é número por espaço em branco
    return str.replace(/[^0-9]/g, '');
}

export const relativesFactory = ({ fullName, relationship, email, phone, address, addressNumber, neighborhood, isLegalResponsible }) => ({
    fullName: fullName,
    relationship: relationship,
    email: email,
    phone: getOnlyNumbers(phone),
    address: address,
    addressNumber: getOnlyNumbers(addressNumber),
    neighborhood: neighborhood,
    isLegalResponsible: isLegalResponsible
})
