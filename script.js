"use strict";

// sample data - expanded Star Wars characters with varied ages
const characters = [
  { id: 1, name: "Luke Skywalker", age: 23 },
  { id: 2, name: "Darth Vader", age: 45 },
  { id: 3, name: "Princess Leia", age: 23 },
  { id: 4, name: "Obi-Wan Kenobi", age: 57 },
  { id: 5, name: "Yoda", age: 900 },
  { id: 6, name: "Han Solo", age: 32 },
  { id: 7, name: "Chewbacca", age: 234 },
  { id: 8, name: "R2-D2", age: 33 },
  { id: 9, name: "C-3PO", age: 112 },
  { id: 10, name: "Padmé Amidala", age: 27 },
];

// broken test data for exercise 6
const brokenCharacters = [
  { id: 101, age: 20 }, // missing name
  { id: 102, name: "Ahsoka Tano", age: 17 }, // valid
  { id: 103, name: "", age: 99 }, // invalid name (empty)
  { id: 104, age: 35 }, // missing name
];

function clearElement(el) {
  if (el) el.innerHTML = "";
}

function createListItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}

function showError(errorDiv, message) {
  if (!errorDiv) return;
  const div = document.createElement("div");
  div.classList.add("error-message");
  div.textContent = message;
  errorDiv.appendChild(div);
}

function isValidName(item) {
  return (
    item &&
    Object.prototype.hasOwnProperty.call(item, "name") &&
    typeof item.name === "string" &&
    item.name.trim().length > 0
  );
}

// Exercise 3 + 5: reusable render function with optional error display
function renderCharacterNames(array, listId, errorDivId = null) {
  const listEl = document.getElementById(listId);
  const errorDiv = errorDivId ? document.getElementById(errorDivId) : null;

  if (!listEl) {
    console.error(`Could not find list element with id "${listId}".`);
    return;
  }

  clearElement(listEl);
  if (errorDiv) clearElement(errorDiv);

  let count = 0;

  for (const item of array) {
    if (!isValidName(item)) {
      const msg = `Error: item with id ${
        item?.id ?? "(unknown)"
      } is missing a valid "name".`;
      console.error(msg, item);
      if (errorDiv) showError(errorDiv, msg);
      continue;
    }

    listEl.appendChild(createListItem(item.name));
    count++;
  }

  if (count === 0) {
    const empty = document.createElement("li");
    empty.classList.add("empty-list");
    empty.textContent = "No results to display.";
    listEl.appendChild(empty);
  }
}

// Exercise 4 + 5: age filter function
function renderBelowAge(array, threshold, listId, errorDivId = null) {
  const filtered = array.filter(
    (item) => typeof item.age === "number" && item.age < threshold
  );
  renderCharacterNames(filtered, listId, errorDivId);
}

// Exercise 1
function runExercise1() {
  console.log("Exercise 1: Print Character Names");
  characters.forEach((c) => console.log(c.name));
  renderCharacterNames(characters, "names-list");
}

// Exercise 2
function runExercise2() {
  console.log("Exercise 2: Filter by Age (< 40)");
  const young = characters.filter((c) => c.age < 40);
  young.forEach((c) => console.log(c.name));
  renderCharacterNames(young, "young-characters-list");
}

// Exercise 3
function runExercise3() {
  console.log("Exercise 3: Reusable Function for Lists");
  renderCharacterNames(characters, "function-list");
}

// Exercise 4
function runExercise4() {
  console.log("Exercise 4: Age Filter Function");
  renderBelowAge(characters, 40, "age-filter-list");
}

// Exercise 5
function runExercise5() {
  console.log("Exercise 5: Error Handling");
  renderCharacterNames(characters, "error-handling-list", "error-messages");
}

// Exercise 6
function runExercise6() {
  console.log("Exercise 6: Test Error Handling (brokenCharacters)");
  renderCharacterNames(
    brokenCharacters,
    "broken-array-list",
    "broken-array-errors"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  runExercise1();
  runExercise2();
  runExercise3();
  runExercise4();
  runExercise5();
  runExercise6();
});
