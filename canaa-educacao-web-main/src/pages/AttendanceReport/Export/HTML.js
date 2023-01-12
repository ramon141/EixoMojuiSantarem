import { createHTML, organizeShipments } from "./utils";

export function exportHTML(shipments, fileName = 'Relatório Canaã Educação') {

    var htmlContent = createHTML(organizeShipments(shipments, 'place'), fileName);

    var tempLink = document.createElement("a");
    var blobFile = new Blob([htmlContent], { type: "text/html" });

    tempLink.setAttribute('href', URL.createObjectURL(blobFile));
    tempLink.setAttribute('download', `${fileName}.html`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
}