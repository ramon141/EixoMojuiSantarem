import { format } from 'date-fns';
import ReactDOMServer from 'react-dom/server';

export function createHTML(organizeShipments, title) {
    return `
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        margin: 20px;
                        font-family: 'Arial Nova', Arial, sans-serif;
                        font-weight: normal;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                </style>
                <title>${title}</title>
            </head>

                <body>
                    ${ReactDOMServer.renderToStaticMarkup(tableStudents(organizeShipments))}
                <body>
            </html>
        `;
}

function tableStudents(organizeShipments) {
    return (
        <>
            <div>
                <div style={{
                    fontWeight: 'bold',
                    border: '2px solid rgb(251, 204, 8)',
                    borderRadius: '5px',
                    textAlign: 'center',
                    height: '100px',
                    lineHeight: '25px',
                    fontSize: '13px'
                }}>
                    <p style={{
                        position: 'relative',
                        top: '10px',
                        left: '10px',
                        fontSize: '17px',

                    }}>
                        Prefeitura Municipal de Canaã dos Carajás Conecta Canaã
                    </p>
                    <p>Emitido em: {format(Date.now(), "dd/MM/yyyy 'às' HH:mm")}</p>
                </div>
            </div>

            <div style={{
                fontWeight: 'bold',
                width: '100%',
                textAlign: 'center',
                marginTop: '10px',
                fontSize: '13px',
            }}>
                <p>Relatório de Embarques</p>
                <p>Total de registros: {organizeShipments.length}</p>
            </div>

            <hr style={{ backgroundColor: 'rgb(229, 229, 229)}' }} />
            {
                Object.keys(organizeShipments).map((valueAttribute) => (
                    <div style={{ marginTop: '40px' }}>
                        <span>Escola: {valueAttribute}</span>
                        <table style={{
                            width: '101%',
                            textAlign: 'left',
                            marginLeft: '-3px',
                            borderSpacing: '0px',
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: 'rgb(211, 211, 211)' }}>
                                    <th style={{ width: '25%', fontSize: '13px' }}>
                                        Nome
                                    </th>
                                    <th style={{ width: '15%', fontSize: '13px' }}>
                                        Nº de Matrícula
                                    </th>
                                    <th style={{ width: '20%', fontSize: '13px' }}>
                                        Data
                                    </th>
                                    <th style={{ width: '20%', fontSize: '13px' }}>
                                        Tipo
                                    </th>
                                    <th style={{ width: '20%', fontSize: '13px' }}>
                                        Direção
                                    </th>
                                </tr>
                            </thead >
                            <tbody>

                                {
                                    organizeShipments[valueAttribute].map((item, key) => (
                                        item.student ?
                                            <tr key={key}>
                                                <td style={{
                                                    borderBottom: '1px solid rgb(224, 224, 224)',
                                                    fontSize: '13px',
                                                    padding: '7px 0px'
                                                }}>
                                                    &nbsp;&nbsp; {item.student.fullName}
                                                </td>

                                                <td style={{
                                                    borderBottom: '1px solid rgb(224, 224, 224)',
                                                    fontSize: '13px',
                                                    padding: '7px 0px'
                                                }}>
                                                    &nbsp;&nbsp; {item.student?.matriculationNumber}
                                                </td>

                                                <td style={{
                                                    borderBottom: '1px solid rgb(224, 224, 224)',
                                                    fontSize: '13px',
                                                    padding: '7px 0px'
                                                }}>
                                                    &nbsp;&nbsp; {format(new Date(item.datetime), "dd/MM/yyyy 'às' HH:mm")}
                                                </td>

                                                <td style={{
                                                    borderBottom: '1px solid rgb(224, 224, 224)',
                                                    fontSize: '13px',
                                                    padding: '7px 0px'
                                                }}>
                                                    &nbsp;&nbsp; {item.type}
                                                </td>

                                                <td style={{
                                                    borderBottom: '1px solid rgb(224, 224, 224)',
                                                    fontSize: '13px',
                                                    padding: '7px 0px'
                                                }}>
                                                    &nbsp;&nbsp; {item.direction === 'ir' ? 'Indo à escola' : 'Voltando da escola'}
                                                </td>
                                            </tr> : false
                                    ))
                                }

                            </tbody>
                        </table >
                    </div >
                ))
            }
        </>
    );
}

//Organiza as os registros de viagens pelo atributo que os difere:
//Todas as vigens da escola XXX, ficarão no atributo XXX do objeto XXX
//Cada um desses atributos é um vetor que possuirá as viagens
export function organizeShipments(shipments, attributeForOrganize) {
    let shipmentsOrganized = {};

    shipments.forEach((shipment) => {
        if (!!shipmentsOrganized[shipment[attributeForOrganize]]) {
            shipmentsOrganized[shipment[attributeForOrganize]].push(shipment);
        } else {
            shipmentsOrganized[shipment[attributeForOrganize]] = [shipment];
        }
    });

    return shipmentsOrganized;

}