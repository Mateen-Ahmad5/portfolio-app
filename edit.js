const apiBaseUrl = "http://localhost:8000/api/portfolio/experience/";
const company = document.getElementById("company");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const description = document.getElementById("description");

const companyError = document.getElementById("company-error");
const startDateError = document.getElementById("start-date-error");
const endDateError = document.getElementById("end-date-error");
const descriptionError = document.getElementById("description-error");

let currentExperienceId = null;

function showLoadingIndicator() {
  document.querySelector(".loading-indicator").style.display = "block";
}

function hideLoadingIndicator() {
  document.querySelector(".loading-indicator").style.display = "none";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${year}`;
}

function showExperienceForm() {
  document.getElementById("experience-form").style.display = "block";
}

async function handleFormSubmit(event) {
  event.preventDefault();

  let isValid = validateForm();

  if (!isValid) {
    return;
  }

  formatDate();

  const experienceData = {
    company: company.value,
    startDate: startDate.value,
    endDate: endDate.value,
    description: description.value,
  };

  try {
    if (currentExperienceId) {
      await updateExperience(currentExperienceId, experienceData);
    } else {
      await createExperience(experienceData);
    }
    document.getElementById("experience-form").reset();
    closeExperienceForm();
    loadExperiences();
  } catch (error) {
    console.error("Error:", error);
  }
}

document
  .getElementById("experience-form")
  .addEventListener("submit", handleFormSubmit);

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

async function createExperience(experienceData) {
  showLoadingIndicator();

  try {
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experienceData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error creating experience:", error);
  } finally {
    hideLoadingIndicator();
  }
}

async function updateExperience(id, experienceData) {
  showLoadingIndicator();

  try {
    const response = await fetch(`${apiBaseUrl}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experienceData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error updating experience:", error);
  } finally {
    hideLoadingIndicator();
  }
}

async function editExperience(id) {
  showLoadingIndicator();

  console.log(`Fetching experience with ID: ${id}`);
  showExperienceForm();

  try {
    const response = await fetch(`${apiBaseUrl}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const experiencesArray = Array.isArray(data.experience)
      ? data.experience
      : [data.experience];

    const experienceToEdit = experiencesArray.find((exp) => exp._id === id);

    if (experienceToEdit) {
      currentExperienceId = id;
      company.value = experienceToEdit.company || "";
      description.value = experienceToEdit.description || "";
      startDate.value = experienceToEdit.startDate.split("T")[0];
      endDate.value = experienceToEdit.endDate.split("T")[0];
    } else {
      console.error("Experience not found for the provided ID.");
    }
  } catch (error) {
    console.error("Error fetching experience data:", error);
  } finally {
    hideLoadingIndicator();
  }
}

async function deleteExperience(id) {
  if (confirm("Are you sure you want to delete this experience?")) {
    showLoadingIndicator();

    try {
      const response = await fetch(`${apiBaseUrl}${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      loadExperiences();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      hideLoadingIndicator();
    }
  }
}

async function loadExperiences() {
  try {
    const response = await fetch(apiBaseUrl);
    const data = await response.json();
    const experiences = data.experience || [];
    console.log(data);

    const experienceEntries = document.getElementById("experience-entries");
    experienceEntries.innerHTML = "";

    if (experiences.length === 0) {
      const noExperienceMessage = document.createElement("p");
      noExperienceMessage.textContent = "Experience not found.";
      experienceEntries.appendChild(noExperienceMessage);
    } else {
      experiences.forEach((exp) => {
        const experienceEntry = document.createElement("div");
        experienceEntry.classList.add("experience-entry");
        experienceEntry.innerHTML = `
          <div>
            <h3>Company Name: ${exp.company}</h3>
            <p>Start Date: ${exp.startDate}</p>
            <p>End Date: ${exp.endDate}</p>
            <p>Description: ${exp.description}</p>
          </div>
          <div class="button-container">
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
        experienceEntries.appendChild(experienceEntry);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
function cancelExperienceForm() {
  closeExperienceForm();
}

function closeExperienceForm() {
  document.getElementById("experience-form").reset();
  document.getElementById("experience-form").style.display = "none";
  currentExperienceId = null;
}

loadExperiences();
