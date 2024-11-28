// DOM element references for toggling the profile form visibility
const profileFormSection = document.getElementById('profileFormSection');
const toggleProfileFormBtn = document.getElementById('toggleProfileFormBtn');
const profileForm = document.getElementById('profileForm');
const profileList = document.getElementById('profileList');
const shuffleProfilesBtn = document.getElementById('shuffleProfilesBtn');
const searchProfilesInput = document.getElementById('searchProfilesInput');
const searchProfilesBtn = document.getElementById('searchProfilesBtn');
const dragAreaProfile = document.getElementById('dragAreaProfile');

// Add event listeners for dragging
let isDragging = false;
let offsetX, offsetY;

dragAreaProfile.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - profileFormSection.offsetLeft;
  offsetY = e.clientY - profileFormSection.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    profileFormSection.style.left = `${e.clientX - offsetX}px`;
    profileFormSection.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Event listener for toggling the profile form visibility
toggleProfileFormBtn.addEventListener('click', () => {
  if (profileFormSection.style.display === 'none' || !profileFormSection.style.display) {
    profileFormSection.style.display = 'block';
    toggleProfileFormBtn.textContent = 'Hide Profile Form'; // Update button text
  } else {
    profileFormSection.style.display = 'none';
    toggleProfileFormBtn.textContent = 'Show Profile Form'; // Update button text
  }
});

// Profile Form Submission and Listing Data
profileForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  // Get form values
  const name = document.getElementById('name').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;
  const availability = document.getElementById('availability').value;

  // Create a new profile entry
  const profileEntry = {
    name,
    skills,
    experience,
    availability
  };

  // Save the profile entry to localStorage
  let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
  profiles.push(profileEntry);
  localStorage.setItem('profiles', JSON.stringify(profiles));

  // Clear the form
  profileForm.reset();

  // Reload profiles to display the new one
  loadProfiles();
});

// Function to load profiles from localStorage and display them
function loadProfiles() {
  let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
  // Randomize the profiles
  profiles = shuffle(profiles);

  // Clear the profile list
  profileList.innerHTML = '';

  // Append each profile entry to the list
  profiles.forEach((profile, index) => {
    const profileEntry = document.createElement('div');
    profileEntry.classList.add('profile-entry');
    profileEntry.innerHTML = `
      <h3>${profile.name}</h3>
      <p><strong>Skills:</strong> ${profile.skills}</p>
      <p><strong>Experience:</strong> ${profile.experience}</p>
      <p><strong>Availability:</strong> ${profile.availability}</p>
      <button class="hire-btn">Hire</button>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    profileList.appendChild(profileEntry);
  });

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      removeProfile(index);
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

// Load profiles when the page loads
window.addEventListener('load', loadProfiles);

// Event listener for shuffling profiles
shuffleProfilesBtn.addEventListener('click', () => {
  loadProfiles();
});

// Event listener for searching profiles
searchProfilesBtn.addEventListener('click', () => {
  const searchTerm = searchProfilesInput.value.toLowerCase();
  searchProfiles(searchTerm);
});

// Function to search profiles
function searchProfiles(searchTerm) {
  let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

  // Filter profiles based on the search term
  const filteredProfiles = profiles.filter(profile => {
    return (
      profile.name.toLowerCase().includes(searchTerm) ||
      profile.skills.toLowerCase().includes(searchTerm) ||
      profile.experience.toLowerCase().includes(searchTerm) ||
      profile.availability.toLowerCase().includes(searchTerm)
    );
  });

  // Clear the profile list
  profileList.innerHTML = '';

  // Append each filtered profile entry to the list
  filteredProfiles.forEach((profile, index) => {
    const profileEntry = document.createElement('div');
    profileEntry.classList.add('profile-entry');
    profileEntry.innerHTML = `
      <h3>${profile.name}</h3>
      <p><strong>Skills:</strong> ${profile.skills}</p>
      <p><strong>Experience:</strong> ${profile.experience}</p>
      <p><strong>Availability:</strong> ${profile.availability}</p>
      <button class="hire-btn">Hire</button>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    profileList.appendChild(profileEntry);
  });

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      removeProfile(index);
    });
  });
}

// Function to remove a profile
function removeProfile(index) {
  let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
  profiles.splice(index, 1);
  localStorage.setItem('profiles', JSON.stringify(profiles));
  loadProfiles();
}
