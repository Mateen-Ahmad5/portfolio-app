const company = document.getElementById("company");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const description = document.getElementById("description");

const companyError = document.getElementById("company-error");
const startDateError = document.getElementById("start-date-error");
const endDateError = document.getElementById("end-date-error");
const descriptionError = document.getElementById("description-error");

let currentId = null;

// Fetch experiences from the backend
async function fetchExperiences() {
  try {
    const response = await fetch(
      "http://localhost:5001/api/portfolio/experience/"
    );
    const experiences = await response.json();
    displayExperiences(experiences);
  } catch (err) {
    console.error("Error fetching experiences:", err);
  }
}

// Display experiences on the page
function displayExperiences(experiences) {
  const experienceEntries = document.getElementById("experience-entries");
  experienceEntries.innerHTML = "";
  experiences.forEach((exp) => {
    const entry = document.createElement("div");
    entry.className = "experience-entry";
    entry.innerHTML = `
      <div>
        <h3>Company Name: ${exp.company}</h3>
        <p>Start Date: ${exp.startDate}</p>
        <p>End Date: ${exp.endDate}</p>
        <p>Description: ${exp.description}</p>
      </div>
      <div>
        <button class="icon-button" onclick="editExperience('${exp._id}')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
        <button class="icon-button" onclick="deleteExperience('${exp._id}')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    `;
    experienceEntries.appendChild(entry);
  });
}

// Form submission handler
document
  .getElementById("experience-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let isValid = validateForm();
    if (!isValid) return;

    const experience = {
      company: company.value,
      startDate: startDate.value,
      endDate: endDate.value,
      description: description.value,
    };

    try {
      if (currentId) {
        // Update existing experience
        await fetch(`http://localhost:5001/api/portfolio/experience/${currentId}`, {
          method: 'PUT',
          body: JSON.stringify(experience),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Create new experience
        await fetch("http://localhost:5001/api/portfolio/experience/", {
          method: 'POST',
          body: JSON.stringify(experience),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      const result = await fetch(
        `http://localhost:5001/api/portfolio/experience/${currentId}`,
        {
          method: "PUT",
          body: JSON.stringify(experience),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      document.getElementById("experience-form").reset();
      hideExperienceForm();
      fetchExperiences();
      // currentId = null;
    } catch (err) {
      console.error("Error saving experience:", err);
    }
  });

// Edit experience handler
async function editExperience(id) {
  showExperienceForm();

  // try {
  //   const response = await fetch(`http://localhost:5001/api/portfolio/experience/${id}`);
  //   const data = await response.json();
  //   company.value = data.company;
  //   description.value = data.description;
  //   startDate.value = data.startDate;
  //   endDate.value = data.endDate;
  //   currentId = id;
  // } catch (err) {
  //   console.error('Error fetching experience:', err);
  // }
}

// Delete experience handler
async function deleteExperience(id) {
  if (confirm("Are you sure you want to delete this experience?")) {
    try {
      await fetch(`http://localhost:5001/api/portfolio/experience/${id}`, {
        method: "DELETE",
      });
      fetchExperiences();
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  }
}

function showExperienceForm() {
  document.getElementById("experience-form").style.display = "block";
}

function hideExperienceForm() {
  document.getElementById("experience-form").style.display = "none";
}

function validateForm() {
  let isValid = true;

  companyError.textContent = "";
  startDateError.textContent = "";
  endDateError.textContent = "";
  descriptionError.textContent = "";

  if (!company.value.trim()) {
    companyError.textContent = "Company name is required.";
    isValid = false;
  }

  if (!startDate.value) {
    startDateError.textContent = "Start date is required.";
    isValid = false;
  }

  if (!endDate.value) {
    endDateError.textContent = "End date is required.";
    isValid = false;
  }

  if (
    startDate.value &&
    endDate.value &&
    new Date(startDate.value) >= new Date(endDate.value)
  ) {
    startDateError.textContent = "Start date must be earlier than end date.";
    isValid = false;
  }

  if (!description.value.trim()) {
    descriptionError.textContent = "Description is required.";
    isValid = false;
  }

  return isValid;
}

// Cancel form action
function cancelExperienceForm() {
  document.getElementById("experience-form").reset();
  hideExperienceForm();
  currentId = null;
}

// Initial fetch
fetchExperiences();
