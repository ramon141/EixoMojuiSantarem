import { createHTML, organizeShipments } from "./utils";

export function exportPDF(shipments, fileName = 'Relatório Canaã Educação') {
    var iframe = document.createElement('iframe');

    const body = createHTML(organizeShipments(shipments, 'place'), fileName);

    iframe.width = "100%";
    iframe.setAttribute("srcdoc", body);
    iframe.style.display = 'none';

    const bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.appendChild(iframe);

    iframe.contentWindow.print();
}