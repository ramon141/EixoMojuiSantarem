import { format } from "date-fns";
import ExcelJS from "exceljs";
import { organizeShipments } from "./utils";

export async function exportXLSX(shipments, fileName = 'Relatório Canaã Educação') {
    const shipmentsFiltred = shipments.filter((item) => !!item.student);

    const rows = shipmentsFiltred.map(item => {
        return {
            'fullName': item.student.fullName,
            'matriculationNumber': item.student.matriculationNumber,
            'datetime': format(new Date(item.datetime), "dd/MM/yyyy 'às' HH:mm"),
            'place': item.place,
            'type': item.type,
            'direction': item.direction === 'ir' ? 'Indo à escola' : 'Voltando da escola'
        }
    });

    const workbook = new ExcelJS.Workbook();

    const rowsOrganizeShipments = organizeShipments(rows, 'place');
    Object.keys(rowsOrganizeShipments).forEach((valueAttribute) => {
        addWorksheet(workbook, valueAttribute, rowsOrganizeShipments[valueAttribute]);
    });

    await downloadWorkbook(workbook, fileName);
}

async function downloadWorkbook(workbook, fileName) {
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.click();
    a.remove();
}

function addWorksheet(workbook, worksheetName, rows) {
    workbook.addWorksheet(worksheetName);
    const worksheet = workbook.getWorksheet(worksheetName);

    worksheet.columns = [
        { header: "Nome", key: "fullName", width: 30 },
        { header: "Nº de Matrícula", key: "matriculationNumber", width: 15 },
        { header: "Data", key: "datetime", width: 20 },
        { header: "Tipo", key: "type", width: 15 },
        { header: "Direção", key: "direction", width: 20 }
    ];

    headerConfiguration(worksheet, {
        fill: {
            type: 'pattern',
            pattern: 'darkVertical',
            fgColor: { argb: '00FBCC08' },
            bgColor: { argb: 'FFFBCC08' }
        },
        border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        },
        alignment: {
            vertical: 'center',
            horizontal: 'center'
        }
    });

    worksheet.addRows(rows);
    columnConditionalStyle(worksheet, worksheet.getColumn('type'),
        {
            true: {
                fill: {
                    type: 'pattern',
                    pattern: 'darkVertical',
                    fgColor: { argb: '00AFD095' },
                    bgColor: { argb: 'FFAFD095' }
                },
                border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            },
            false: {
                fill: {
                    type: 'pattern',
                    pattern: 'darkVertical',
                    fgColor: { argb: '00ED9BA4' },
                    bgColor: { argb: 'FFED9BA4' }
                },
                border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            }
        },
        (cell) => { return cell.value === 'Embarque' });
}

function headerConfiguration(worksheet, configuration) {
    const properties = Object.keys(configuration);

    for (let i = 0; i < worksheet.columns.length; i++) {
        properties.forEach((item) => {
            worksheet.getCell((String.fromCharCode(i + 65)) + '1')[item] = configuration[item];
        })
    }
}

function columnConditionalStyle(worksheet, column, style, condition) {
    const letterColumn = (String.fromCharCode(column.number + 64));

    for (let i = 2; i < column.values.length; i++) {
        const cell = worksheet.getCell(`${letterColumn}${i}`);
        const currentStyle = condition(cell, i) ? style.true : style.false;
        const currentProperties = Object.keys(currentStyle);

        currentProperties.forEach((item) => {
            cell[item] = currentStyle[item];
        });
    }
}