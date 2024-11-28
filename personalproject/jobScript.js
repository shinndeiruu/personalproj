// DOM element references for toggling the job form visibility
const jobFormSection = document.getElementById('jobFormSection');
const toggleJobFormBtn = document.getElementById('toggleJobFormBtn');
const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');
const shuffleJobsBtn = document.getElementById('shuffleJobsBtn');
const searchJobsInput = document.getElementById('searchJobsInput');
const searchJobsBtn = document.getElementById('searchJobsBtn');
const dragAreaJob = document.getElementById('dragAreaJob');

// Add event listeners for dragging
let isDragging = false;
let offsetX, offsetY;

dragAreaJob.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - jobFormSection.offsetLeft;
  offsetY = e.clientY - jobFormSection.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    jobFormSection.style.left = `${e.clientX - offsetX}px`;
    jobFormSection.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Event listener for toggling the job form visibility
toggleJobFormBtn.addEventListener('click', () => {
  if (jobFormSection.style.display === 'none' || !jobFormSection.style.display) {
    jobFormSection.style.display = 'block';
    toggleJobFormBtn.textContent = 'Hide Job Form'; // Update button text
  } else {
    jobFormSection.style.display = 'none';
    toggleJobFormBtn.textContent = 'Show Job Form'; // Update button text
  }
});

// Job Form Submission and Listing Data
jobForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  // Get form values
  const jobTitle = document.getElementById('jobTitle').value;
  const companyName = document.getElementById('companyName').value;
  const jobDescription = document.getElementById('jobDescription').value;
  const jobLocation = document.getElementById('jobLocation').value;

  // Create a new job entry
  const jobEntry = {
    jobTitle,
    companyName,
    jobDescription,
    jobLocation
  };

  // Save the job entry to localStorage
  let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  jobs.push(jobEntry);
  localStorage.setItem('jobs', JSON.stringify(jobs));

  // Clear the form
  jobForm.reset();

  // Reload jobs to display the new one
  loadJobs();
});

// Function to load jobs from localStorage and display them
function loadJobs() {
  let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  // Randomize the jobs
  jobs = shuffle(jobs);

  // Clear the job list
  jobList.innerHTML = '';

  // Append each job entry to the list
  jobs.forEach((job, index) => {
    const jobEntry = document.createElement('div');
    jobEntry.classList.add('job-card');
    jobEntry.innerHTML = `
      <div>
        <h3>${job.jobTitle}</h3>
      </div>
      <div>
        <p><strong>Company:</strong> ${job.companyName}</p>
      </div>
      <div>
        <p><strong>Description:</strong> ${job.jobDescription}</p>
      </div>
      <div>
        <p><strong>Location:</strong> ${job.jobLocation}</p>
      </div>
      <footer>
        <button class="apply-btn">Apply</button>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </footer>
    `;
    jobList.appendChild(jobEntry);
  });

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      removeJob(index);
    });
  });
}

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load jobs when the page loads
window.addEventListener('load', loadJobs);

// Event listener for shuffling jobs
shuffleJobsBtn.addEventListener('click', () => {
  loadJobs();
});

// Event listener for searching jobs
searchJobsBtn.addEventListener('click', () => {
  const searchTerm = searchJobsInput.value.toLowerCase();
  searchJobs(searchTerm);
});

// Function to search jobs
function searchJobs(searchTerm) {
  let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

  // Filter jobs based on the search term
  const filteredJobs = jobs.filter(job => {
    return (
      job.jobTitle.toLowerCase().includes(searchTerm) ||
      job.companyName.toLowerCase().includes(searchTerm) ||
      job.jobDescription.toLowerCase().includes(searchTerm) ||
      job.jobLocation.toLowerCase().includes(searchTerm)
    );
  });

  // Clear the job list
  jobList.innerHTML = '';

  // Append each filtered job entry to the list
  filteredJobs.forEach((job, index) => {
    const jobEntry = document.createElement('div');
    jobEntry.classList.add('job-card');
    jobEntry.innerHTML = `
      <div>
        <h3>${job.jobTitle}</h3>
      </div>
      <div>
        <p><strong>Company:</strong> ${job.companyName}</p>
      </div>
      <div>
        <p><strong>Description:</strong> ${job.jobDescription}</p>
      </div>
      <div>
        <p><strong>Location:</strong> ${job.jobLocation}</p>
      </div>
      <footer>
        <button class="apply-btn">Apply</button>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </footer>
    `;
    jobList.appendChild(jobEntry);
  });

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      removeJob(index);
    });
  });
}

// Function to remove a job
function removeJob(index) {
  let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  jobs.splice(index, 1);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  loadJobs();
}
