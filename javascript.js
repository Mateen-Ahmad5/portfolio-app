let filterExperienceField = document.getElementById("filterExperience");

filterExperienceField.addEventListener("input", (e) => {
  let experiences = JSON.parse(localStorage.getItem("experience")) || [];

  let newExperience = experiences.filter((exp) => {
    if (exp.company.includes(e.target.value)) {
      return exp;
    }
  });

  if (e.target.value !== "") {
    loadExperiences(newExperience);
  } else {
    let experiences = JSON.parse(localStorage.getItem("experience")) || [];
    loadExperiences(experiences);
  }
});

window.addEventListener("load", function () {
  let experiences = JSON.parse(localStorage.getItem("experience")) || [];

  loadExperiences(experiences);
});

const loadExperiences = (experiences) => {
  const experienceEntries = document.getElementById("experience-entries");
  experienceEntries.innerHTML = "";

  if (experiences.length === 0) {
    const noExperienceMessage = document.createElement("p");
    noExperienceMessage.textContent = "Experience not found.";
    noExperienceMessage.classList.add("no-experience-message");
    experienceEntries.appendChild(noExperienceMessage);
  } else {
    experiences.forEach(function (exp) {
      const experienceEntry = document.createElement("div");
      experienceEntry.classList.add("experience-entry");
      experienceEntry.innerHTML = `
            <h3>Company Name: ${exp.company}</h3>
            <p>Start Date: ${exp.startDate}</p>
            <p>Start Date: ${exp.endDate}</p>
            <p>Description: ${exp.description}</p>
        `;
      experienceEntries.appendChild(experienceEntry);
    });
  }
};




