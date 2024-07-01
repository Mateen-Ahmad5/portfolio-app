window.addEventListener("load", function () {
  function displayExperiences() {
    let experiences = JSON.parse(localStorage.getItem("experience")) || [];
    experiences.forEach(function (exp) {
      const experienceEntry = document.createElement("div");
      experienceEntry.classList.add("experience-entry");
      experienceEntry.innerHTML = `
            <h3>Company Name: ${exp.company}</h3>
            <p>Start Date: ${exp.startDate}</p>
            <p>End Date: ${exp.endDate}</p>
            <p>Description: ${exp.description}</p>
        `;
      document
        .getElementById("experience-entries")
        .appendChild(experienceEntry);
    });
  }

  displayExperiences();
});
