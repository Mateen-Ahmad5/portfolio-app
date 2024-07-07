let company = document.getElementById("company");
let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");
let description = document.getElementById("description");

let isEdit = false;

function showExperienceForm() {
  document.getElementById("experience-form").style.display = "block";
}

document.getElementById("experience-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let experiences = JSON.parse(localStorage.getItem("experience")) || [];

    let id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

    if (isEdit) {
      let newExperience = {
        id: isEdit,
        company: company.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
      };

      let newExperiences = experiences.map((exp) => {
        if (exp.id == isEdit) {
          return newExperience;
        } else {
          return exp;
        }
      });

      localStorage.setItem("experience", JSON.stringify(newExperiences));
      isEdit = false;
    } else if (
      company.value &&startDate.value &&endDate.value &&description.value
    ) {
      experiences.push({
        id: id,
        company: company.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
      });

      localStorage.setItem("experience", JSON.stringify(experiences));
    }

    document.getElementById("experience-form").reset();
    document.getElementById("experience-form").style.display = "none";
    loadExperiences();
  });
function editExperience(id) {
  showExperienceForm();
  let experiences = JSON.parse(localStorage.getItem("experience")) || [];
  let experience = experiences.find((exp) => exp.id == id);
  isEdit = experience.id;
  if (experience) {
    company.value = experience.company;
    description.value = experience.description;
    startDate.value = experience.startDate;
    endDate.value = experience.endDate;
  }
}

function deleteExperience(id) {
  let experiences = JSON.parse(localStorage.getItem("experience")) || [];
  if (experiences.length > 0) {
    let newExperience = experiences.filter((exp) => {
      if (exp.id !== id) {
        return exp;
      }
    });
    localStorage.setItem("experience", JSON.stringify(newExperience));
    loadExperiences();
  }
}

function loadExperiences() {
  let experiences = JSON.parse(localStorage.getItem("experience")) || [];
  const experienceEntries = document.getElementById("experience-entries");
  experienceEntries.innerHTML = "";

  experiences.forEach((exp) => {
    const experienceEntry = document.createElement("div");
    experienceEntry.classList.add("experience-entry");
    experienceEntry.innerHTML = `
            <div class="button-container">
            <button class="edit-button" onclick="editExperience('${exp.id}')">Edit</button>
            <button class="delete-button"  onclick="deleteExperience('${exp.id}')">Delete</button>
            </div>
            <h3>Company Name: ${exp.company}</h3>
            <p>Start Date: ${exp.startDate}</p>
            <p>End Date: ${exp.endDate}</p>
            <p>Description: ${exp.description}</p>
        `;
    experienceEntries.appendChild(experienceEntry);
  });
}

loadExperiences();
