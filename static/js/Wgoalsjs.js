// Sample workout data (for testing)
let workouts = [];

// Variable to store the index of the workout being edited
let editingIndex = -1;

// Function to add a new workout or save edits
function addWorkout() {
    const workoutName = document.getElementById('workoutName').value;
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    const errorMessage = document.getElementById('errorMessage');

    if (workoutName && duration && date) {
        const newWorkout = {
            name: workoutName,
            duration: duration,
            date: date,
            notes: notes,
        };

        if (editingIndex === -1) {
            workouts.push(newWorkout);
        } else {
            // Replace the existing workout with the edited one
            workouts[editingIndex] = newWorkout;
            // Reset editingIndex after saving changes
            editingIndex = -1;
        }

        // Clear input fields
        document.getElementById('workoutName').value = '';
        document.getElementById('duration').value = '';
        document.getElementById('date').value = '';
        document.getElementById('notes').value = '';

        // Clear error message
        errorMessage.textContent = '';

        // Save workouts to local storage
        saveToLocalStorage();

        displayWorkouts();
    } else {
        // Display error message
        errorMessage.textContent = 'Please fill out all fields.';
    }
}

// Function to display workouts
function displayWorkouts() {
    const workoutListContainer = document.getElementById('workoutList');
    workoutListContainer.innerHTML = '';

    if (workouts.length === 0) {
        workoutListContainer.innerHTML = '<p>No workouts recorded yet.</p>';
    } else {
        workouts.forEach((workout, index) => {
            const workoutItem = document.createElement('div');
            workoutItem.classList.add('workout-item');

            workoutItem.innerHTML = `
                <p><strong>${workout.name}</strong></p>
                <p>Duration: ${workout.duration} minutes</p>
                <p>Date: ${workout.date}</p>
                <p>Notes: ${workout.notes}</p>
                <button onclick="editWorkout(${index})">Edit</button>
                <button onclick="deleteWorkout(${index})">Delete</button>
            `;

            workoutListContainer.appendChild(workoutItem);
        });
    }
}

// Function to edit a workout
function editWorkout(index) {
    editingIndex = index;

    // Populate the form with the selected workout's details
    const selectedWorkout = workouts[index];
    document.getElementById('workoutName').value = selectedWorkout.name;
    document.getElementById('duration').value = selectedWorkout.duration;
    document.getElementById('date').value = selectedWorkout.date;
    document.getElementById('notes').value = selectedWorkout.notes;
}

// Function to delete a workout
function deleteWorkout(index) {
    workouts.splice(index, 1);
    // Update local storage after deleting
    saveToLocalStorage();
    displayWorkouts();
}

// Function to save workouts to local storage
function saveToLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Function to load workouts from local storage
function loadFromLocalStorage() {
    const storedWorkouts = localStorage.getItem('workouts');

    if (storedWorkouts) {
        workouts = JSON.parse(storedWorkouts);
        displayWorkouts();
    }
}

// Load workouts from local storage on page load
window.onload = function () {
    loadFromLocalStorage();
};


function goToPage2(section4) {
    window.location.href = 'homehtml.html';
}