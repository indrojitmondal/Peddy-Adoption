const loadPets = async()=>{
     const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
     const data = await res.json();
     const allPets = data.pets;
     console.log(allPets);
     for (const pet of allPets) {
        console.log(pet);
     }
}
// loadPets();
const loadCategories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    // console.log(data.categories);
    displayCategories(data.categories);
    

}
loadCategories();
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');

    for (const pet of categories) {
        const newButton = document.createElement('button');
        newButton.classList = 'hover:bg-btn border py-5 border-btn rounded-2xl flex gap-3 items-center justify-center';

        // Correctly passing both pet.id and categories
        // newButton.setAttribute('onclick', `loadPetsByCategory('${pet.id}', categories)`);
        newButton.onclick = () => loadPetsByCategory(pet.id, categories);

        newButton.setAttribute('id', `${pet.id}`);
        newButton.innerHTML = `
            <img src="${pet.category_icon}" alt="${pet.category}">
            <h3 class="text-xl font-bold">${pet.category}</h3>
        `;
        categoryContainer.append(newButton);
    }
}

const resetAllCategories = (categories) => {
    console.log(categories.length);
    categories.forEach(category => {
        const id = category.id;
        const x = document.getElementById(id);
        x.classList.remove('bg-btn');
    });
}

const loadPetsByCategory = (x, categories) => {
    resetAllCategories(categories); 
    const currentButton = document.getElementById(x);
    currentButton.classList.add('bg-btn','rounded-[120px]');

    // alert(x); // gets the category ID
}
