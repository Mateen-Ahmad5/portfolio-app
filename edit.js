function showExperienceForm() {
  document.getElementById("experience-form").style.display = "block";
}

  document.getElementById("experience-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let company = document.getElementById("company");
    let startDate = document.getElementById("start-date");
    let endDate = document.getElementById("end-date");
    let description = document.getElementById("description"); 
    
    if (company.value && startDate.value && endDate.value && description.value) {
      const experienceEntry = document.createElement("div");
      experienceEntry.classList.add("experience-entry");
      experienceEntry.innerHTML = `
            <h3>Company Name: ${company.value}</h3>
            <p>Start Date: ${startDate.value}</p>
            <p>End Date: ${endDate.value}</p>
            <p>Description: ${description.value}</p>
        `;    
        
      document.getElementById("experience-entries").appendChild(experienceEntry);


    let experiences = JSON.parse(localStorage.getItem("experience")) || [];
    experiences.push({
      company: company.value,
      startDate: startDate.value,
      endDate: endDate.value,
      description: description.value,
    });
    localStorage.setItem("experience", JSON.stringify(experiences));

      company.value = "";
      startDate.value = "";
      endDate.value = "";
      description.value = "";

      document.getElementById("experience-form").style.display = "none";
    }
 });
 function loadExperiences() {
    let experiences = JSON.parse(localStorage.getItem("experience")) || [];
    const experienceEntries = document.getElementById("experience-entries");

    experiences.forEach(exp => {
        const experienceEntry = document.createElement("div");
        experienceEntry.classList.add("experience-entry");
        experienceEntry.innerHTML = `
            <h3>Company Name: ${exp.company}</h3>
            <p>Start Date: ${exp.startDate}</p>
            <p>End Date: ${exp.endDate}</p>
            <p>Description: ${exp.description}</p>
        `;
        experienceEntries.appendChild(experienceEntry);
    });
}
 document.addEventListener('DOMContentLoaded', loadExperiences);

 