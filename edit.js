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
            <h3>${company.value}</h3>
            <p>${startDate.value}</p>
            <p>${endDate.value}</p>
            <p>${description.value}</p>
        `;    
        
      document.getElementById("experience-entries").appendChild(experienceEntry);

        // Save the form data to local storage

    let experiences = JSON.parse(localStorage.getItem("experience")) || [];
    experiences.push({
      company: company.value,
      startDate: startDate.value,
      endDate: endDate.value,
      description: description.value
    });
    localStorage.setItem("experience", JSON.stringify(experiences));

      company.value = "";
      startDate.value = "";
      endDate.value = "";
      description.value = "";

      document.getElementById("experience-form").style.display = "none";
    }
 });
 