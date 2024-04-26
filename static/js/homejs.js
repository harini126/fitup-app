document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('.icon');
  const sections = document.querySelectorAll('.section');
  const loseWeightWorkouts = document.getElementById('loseWeightWorkouts');
  const gainWeightWorkouts = document.getElementById('GainWeightWorkouts');
  const gainMuscleWorkouts = document.getElementById('GainMuscleWorkouts');
  const stableWeightWorkouts = document.getElementById('stableWeightWorkouts'); // Get reference to the stableWeightWorkouts div

  // Hide the sections initially
  loseWeightWorkouts.style.display = 'none';
  gainWeightWorkouts.style.display = 'none';
  gainMuscleWorkouts.style.display = 'none';
  stableWeightWorkouts.style.display = 'none'; // Hide the stableWeightWorkouts div initially
  const defaultSection = document.getElementById('section1'); // Default section

  // Hide all sections except the default one
  sections.forEach(section => {
    if (section !== defaultSection) {
      section.style.display = 'none';
    }
  });
  // Add click event listeners to the icons in the footer
  const footerIcons = document.querySelectorAll('.footer .icon');
  footerIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      // Hide the workout lists if they are visible
      if (loseWeightWorkouts.style.display === 'block') {
        loseWeightWorkouts.style.display = 'none';
      }
      if (gainWeightWorkouts.style.display === 'block') {
        gainWeightWorkouts.style.display = 'none';
      }
      if (gainMuscleWorkouts.style.display === 'block') {
        gainMuscleWorkouts.style.display = 'none';
      }
      if (stableWeightWorkouts.style.display === 'block') {
        stableWeightWorkouts.style.display = 'none';
      }

      // Show the corresponding section for the clicked icon
      sections.forEach(section => {
        if (section.id === icon.dataset.section) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  // Add click event listener to the "Lose Weight" card
  const loseWeightCard = document.querySelector('.card[onclick="showText(\'Lose Weight\')"]');
  loseWeightCard.addEventListener('click', () => {
    // Hide any visible sections
    sections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the workout list
    loseWeightWorkouts.style.display = 'block';
  });

  // Add click event listener to the "Gain Weight" card
  const weightGainCard = document.getElementById('weightGainCard');
  weightGainCard.addEventListener('click', () => {
    // Hide any visible sections
    sections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the GainWeightWorkouts div
    gainWeightWorkouts.style.display = 'block';
  });

  // Add click event listener to the "Gain Muscle" card
  const muscleGainCard = document.getElementById('muscleGainCard');
  muscleGainCard.addEventListener('click', () => {
    // Hide any visible sections
    sections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the GainMuscleWorkouts div
    gainMuscleWorkouts.style.display = 'block';
  });

  // Add click event listener to the "Stable Weight" card
  const stableWeightCard = document.getElementById('stableWeightCard');
  stableWeightCard.addEventListener('click', () => {
    // Hide any visible sections
    sections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the stableWeightWorkouts div
    stableWeightWorkouts.style.display = 'block';
  });

  // Add click event listener to the "Back" button in the workout list
  const backButton = document.querySelector('#loseWeightWorkouts .button');
  backButton.addEventListener('click', () => {
    // Hide the workout list
    loseWeightWorkouts.style.display = 'none';

    // Show the "Workouts" section
    document.getElementById('section1').style.display = 'flex';
  });

  // Add click event listener to the "Back" button in the GainWeightWorkouts
  const backButton2 = document.querySelector('#GainWeightWorkouts .button');
  backButton2.addEventListener('click', () => {
    // Hide the GainWeightWorkouts div
    gainWeightWorkouts.style.display = 'none';

    // Show the "Workouts" section
    document.getElementById('section1').style.display = 'flex';
  });

  // Add click event listener to the "Back" button in the GainMuscleWorkouts
  const backButton3 = document.querySelector('#GainMuscleWorkouts .button');
  backButton3.addEventListener('click', () => {
    // Hide the GainMuscleWorkouts div
    gainMuscleWorkouts.style.display = 'none';

    // Show the "Workouts" section
    document.getElementById('section1').style.display = 'flex';
  });

  // Add click event listener to the "Back" button in the stableWeightWorkouts
  const backButton4 = document.querySelector('#stableWeightWorkouts .button');
  backButton4.addEventListener('click', () => {
    // Hide the stableWeightWorkouts div
    stableWeightWorkouts.style.display = 'none';

    // Show the "Workouts" section
    document.getElementById('section1').style.display = 'flex';
  });
});

function goBack() {
  // Hide the workout lists
  document.getElementById('loseWeightWorkouts').style.display = 'none';
  document.getElementById('GainWeightWorkouts').style.display = 'none';
  document.getElementById('GainMuscleWorkouts').style.display = 'none';
  document.getElementById('stableWeightWorkouts').style.display = 'none';

  // Show the workouts section
  document.getElementById('section1').style.display = 'flex';

  // Scroll to the top of the page
  window.scrollTo(0, 0);
}



document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('.icon');

  icons.forEach(icon => {
      icon.addEventListener('click', () => {
          // Remove 'active' class from all icons
          icons.forEach(i => i.classList.remove('active'));

          // Add 'active' class to the clicked icon
          icon.classList.add('active');

          // Rest of your code...
      });
  });

  // Rest of your existing JavaScript code...
});




function toggleMenu() {
  var menu = document.getElementById('menu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}


