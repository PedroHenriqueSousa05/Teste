let sortDirection = true; // true for ascending, false for descending
let lastSortedColumn = -1; // to track last sorted column

function sortTable(columnIndex) {
    const table = document.getElementById("orders-table");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    if (lastSortedColumn === columnIndex) {
        sortDirection = !sortDirection;
    } else {
        sortDirection = true;
        lastSortedColumn = columnIndex;
    }

    const sortedRows = rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText.replace('R$', '').replace(',', '.');
        const cellB = b.cells[columnIndex].innerText.replace('R$', '').replace(',', '.');

        const valueA = isNaN(cellA) ? cellA.toLowerCase() : parseFloat(cellA);
        const valueB = isNaN(cellB) ? cellB.toLowerCase() : parseFloat(cellB);

        if (sortDirection) {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        } else {
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
        }
        return 0;
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    tbody.append(...sortedRows);

    updateSortIndicators(columnIndex);
}

function updateSortIndicators(columnIndex) {
    const headers = document.querySelectorAll("th");
    headers.forEach((header, index) => {
        header.innerHTML = header.innerText.replace(/ ▲| ▼/g, '') + (sortDirection ? " ▲" : " ▼");
        if (index !== columnIndex) {
            header.innerHTML = header.innerText.replace(/ ▲| ▼/g, '');
        }
    });
}
