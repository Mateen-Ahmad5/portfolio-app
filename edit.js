function showExperienceForm() {
  document.getElementById("experience-form").style.display = "block";
}

document.getElementById("experience-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let company = document.getElementById("company");
    let startDate = document.getElementById("start-date");
    let endDate = document.getElementById("end-date");
    let description = document.getElementById("description");

    if (
      company.value &&startDate.value &&endDate.value &&description.value ) {
      let experiences = JSON.parse(localStorage.getItem("experience")) || [];
      experiences.push({
        company: company.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
      });
      document.getElementById("experience-form").reset();
      localStorage.setItem("experience", JSON.stringify(experiences));
      document.getElementById("experience-form").style.display = "none";
      loadExperiences();
    }
  });
function loadExperiences() {
  let experiences = JSON.parse(localStorage.getItem("experience")) || [];
  const experienceEntries = document.getElementById("experience-entries");
  experienceEntries.innerHTML = "";

  experiences.forEach((exp) => {
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

loadExperiences();
