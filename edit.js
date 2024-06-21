document.getElementById('add-experience-btn').addEventListener('click', function() {
    document.getElementById('experience-form').style.display = 'block';
});

document.getElementById('experience-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const company = document.getElementById('company').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const description = document.getElementById('description').value;

    if (company && startDate && endDate && description) {
        const experienceEntry = document.createElement('div');
        experienceEntry.classList.add('experience-entry');
        experienceEntry.innerHTML = `
            <h3>${company}</h3>
            <p>${startDate} - ${endDate}</p>
            <p>${description}</p>
        `;

        document.getElementById('experience-entries').appendChild(experienceEntry);

        document.getElementById('company').value = '';
        document.getElementById('start-date').value = '';
        document.getElementById('end-date').value = '';
        document.getElementById('description').value = '';

        document.getElementById('experience-form').style.display = 'none';
       
    } else {
        alert('Please fill in all fields.');
    }
  

});