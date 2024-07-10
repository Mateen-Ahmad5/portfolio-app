let company = document.getElementById("company");
let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");
let description = document.getElementById("description");

let isEdit = false;

function showExperienceForm() {
  document.getElementById("experience-form").style.display = "block";
}
document.getElementById("experience-form").addEventListener("submit", function (event) {
  if (!company.value || !startDate.value || !endDate.value || !description.value) {
    event.preventDefault();
    return;
  }

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
    } else if (company.value && startDate.value && endDate.value && description.value) {
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

  if (experiences.length === 0) {
    const noExperienceMessage = document.createElement("p");
    noExperienceMessage.textContent = "Experience not found. ";
    experienceEntries.appendChild(noExperienceMessage);
  } else {
    experiences.forEach((exp) => {
      const experienceEntry = document.createElement("div");
      experienceEntry.classList.add("experience-entry");
      experienceEntry.innerHTML = `
           <div><h3>Company Name: ${exp.company}</h3>
            <p>Start Date: ${exp.startDate}</p>
            <p>End Date: ${exp.endDate}</p>
            <p>Description: ${exp.description}</p>
            </div>

              
<div class="button-container">
<button class="icon-button" onclick="editExperience('${exp.id}')">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</button>

<button class="icon-button" onclick="deleteExperience('${exp.id}')">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button>
</div>
            
        `;
      experienceEntries.appendChild(experienceEntry);
    });
  }
}

loadExperiences();
