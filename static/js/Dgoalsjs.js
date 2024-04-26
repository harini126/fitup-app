document.addEventListener('DOMContentLoaded', function () {
    loadMeals();
  });
  
  function addMeal() {
    const itemName = document.getElementById('itemName').value.trim();
    const caloriesCount = document.getElementById('caloriesCount').value.trim();
    const date = document.getElementById('datePicker').value;
  
    if (!itemName || !caloriesCount || !date) {
      displayError("Please fill out all fields.");
      return;
    }
  
    const meal = { itemName, caloriesCount, date };
    saveMeal(meal);
    displayMeals();
    clearInputFields();
  }
  
  function saveMeal(meal) {
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  
  function loadMeals() {
    displayMeals();
  }
  
  // Replace the existing displayMeals function with the updated one
  
  function displayMeals() {
    const mealList = document.getElementById('mealList');
    mealList.innerHTML = '';
  
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    const groupedMeals = groupMealsByDate(meals);
  
    for (const date in groupedMeals) {
      const mealsByDate = groupedMeals[date];
  
      const mealCard = document.createElement('div');
      mealCard.className = 'meal-card';
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editMeal(date, mealsByDate));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteMeal(date));
  
      mealCard.innerHTML = `<h2>${date}</h2>`;
      
      mealsByDate.forEach((meal, index) => {
        mealCard.innerHTML += `<p>${meal.itemName} (${meal.caloriesCount} calories)</p>`;
      });
  
      mealCard.appendChild(editButton);
      mealCard.appendChild(deleteButton);
  
      mealList.appendChild(mealCard);
    }
  }
  
  function groupMealsByDate(meals) {
    return meals.reduce((groupedMeals, meal) => {
      const date = meal.date;
      groupedMeals[date] = groupedMeals[date] || [];
      groupedMeals[date].push(meal);
      return groupedMeals;
    }, {});
  }
  
  function editMeal(date, meals) {
    const mealToEdit = meals[0]; // Assuming we edit the first meal in the list
    if (!mealToEdit) {
      displayError('No meal to edit.');
      return;
    }
  
    document.getElementById('itemName').value = mealToEdit.itemName;
    document.getElementById('caloriesCount').value = mealToEdit.caloriesCount;
    document.getElementById('datePicker').value = mealToEdit.date;
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Save Changes';
    editButton.addEventListener('click', () => saveEditedMeal(date, meals));
  
    document.getElementById('mealList').appendChild(editButton);
  }
  
  function saveEditedMeal(originalDate, meals) {
    const itemName = document.getElementById('itemName').value.trim();
    const caloriesCount = document.getElementById('caloriesCount').value.trim();
    const date = document.getElementById('datePicker').value;
  
    if (!itemName || !caloriesCount || !date) {
      displayError("Please fill out all fields.");
      return;
    }
  
    const editedMeal = { itemName, caloriesCount, date };
  
    const mealsWithoutOriginal = JSON.parse(localStorage.getItem('meals')).filter(meal => meal.date !== originalDate);
    const updatedMeals = [...mealsWithoutOriginal, editedMeal];
  
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
    clearInputFields();
    displayMeals();
    removeEditButton();
  }
  
  
  
  
  function deleteMeal(date) {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    const updatedMeals = meals.filter(meal => meal.date !== date);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
    displayMeals();
  }
  
  
  function createMealItemElement(meal, index) {
    const mealItem = document.createElement('div');
    mealItem.className = 'meal-item';
  
    const itemName = document.createElement('input');
    itemName.type = 'text';
    itemName.value = meal.itemName;
    itemName.disabled = true;
  
    const caloriesCount = document.createElement('input');
    caloriesCount.type = 'number';
    caloriesCount.value = meal.caloriesCount;
    caloriesCount.disabled = true;
  
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => toggleEditMode(mealItem, itemName, caloriesCount));
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteMeal(index));
  
    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);
  
    mealItem.appendChild(itemName);
    mealItem.appendChild(caloriesCount);
    mealItem.appendChild(actionsDiv);
  
    return mealItem;
  }
  
  function toggleEditMode(mealItem, itemNameInput, caloriesCountInput) {
    itemNameInput.disabled = !itemNameInput.disabled;
    caloriesCountInput.disabled = !caloriesCountInput.disabled;
  
    if (!itemNameInput.disabled) {
      itemNameInput.focus();
    } else {
      const meals = JSON.parse(localStorage.getItem('meals')) || [];
      const index = Array.from(mealItem.parentNode.children).indexOf(mealItem) - 1; // Subtract 1 to account for the card heading
      const meal = meals[index];
      meal.itemName = itemNameInput.value.trim();
      meal.caloriesCount = caloriesCountInput.value.trim();
      localStorage.setItem('meals', JSON.stringify(meals));
      displayMeals();
    }
  }
  
  function deleteMeal(index) {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(meals));
    displayMeals();
  }
  
  
  function groupMealsByDate(meals) {
    const groupedMeals = {};
  
    meals.forEach((meal) => {
      if (!groupedMeals[meal.date]) {
        groupedMeals[meal.date] = [];
      }
  
      groupedMeals[meal.date].push(meal);
    });
  
    return groupedMeals;
  }
  
  function clearInputFields() {
    document.getElementById('itemName').value = '';
    document.getElementById('caloriesCount').value = '';
    document.getElementById('datePicker').value = '';
    clearError();
  }
  
  function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
  }
  
  function clearError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
  }
  
  function goToPage2(section4) {
    window.location.href = 'homehtml.html';
}