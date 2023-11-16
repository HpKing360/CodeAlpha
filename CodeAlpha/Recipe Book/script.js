const API_KEY = "7984abab35184ec4a9160ab6438ffe21";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");

 recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";

    recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();


const searchInputEl = document.getElementById("search-input");
const searchButtonEl = document.getElementById("search-button");

searchButtonEl.addEventListener("click", () => {
  const searchTerm = searchInputEl.value.toLowerCase();
  const recipes = getRecipes();

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) => {
    const recipeTitle = recipe.title.toLowerCase();
    return recipeTitle.includes(searchTerm);
  });

  displayRecipes(filteredRecipes);
});

// Add responsive styling to the search bar container
const searchContainerEl = document.querySelector(".search-container");
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    searchContainerEl.classList.add("mobile-search");
  } else {
    searchContainerEl.classList.remove("mobile-search");
  }
});
const favoriteButtonEl = document.getElementById("favorite-button");

favoriteButtonEl.addEventListener("click", function() {
  // Toggle the favorite state of the recipe
  this.classList.toggle("active");

  // Save the favorite state to the database or local storage
});