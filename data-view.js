

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const tableBody = document.querySelector('#data-table tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.completed}</td>
            `;
            tableBody.appendChild(row);
        });
  
 
}
fetchData();
