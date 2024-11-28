// For toggling the profile form (similar for jobs)
const profileFormSection = document.getElementById('profileFormSection');
const toggleProfileFormBtn = document.getElementById('toggleProfileFormBtn');

// Toggle visibility when the button is clicked
toggleProfileFormBtn.addEventListener('click', () => {
  if (profileFormSection.style.display === 'none' || !profileFormSection.style.display) {
    profileFormSection.style.display = 'block';
    toggleProfileFormBtn.textContent = 'Hide Profile Form';  // Update button text
  } else {
    profileFormSection.style.display = 'none';
    toggleProfileFormBtn.textContent = 'Show Profile Form';  // Update button text
  }
  
});
// DOM element references for toggling
const jobFormSection = document.getElementById('jobFormSection');
const toggleJobFormBtn = document.getElementById('toggleJobFormBtn');

// Event listener for toggling the job form
toggleJobFormBtn.addEventListener('click', () => {
  if (jobFormSection.style.display === 'none' || !jobFormSection.style.display) {
    jobFormSection.style.display = 'block';
    toggleJobFormBtn.textContent = 'Hide Job Form'; // Update button text
  } else {
    jobFormSection.style.display = 'none';
    toggleJobFormBtn.textContent = 'Show Job Form'; // Update button text
  }
});

