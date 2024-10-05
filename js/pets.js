const loadPets = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    const pets = data.pets;
    console.log(pets);
    displayPets(pets);
    for (const pet of pets) {
       console.log(pet);
    }
}
const displayPets = (pets)=>{
  
    const left = document.getElementById('left');
    for (const pet of pets) {
        
    const newDiv = document.createElement('div');
    newDiv.classList='border p-3 border-b1';
    newDiv.innerHTML=
    `
    <img src="${pet.image}" alt="">
    <h3 class="font-extrabold">${pet.pet_name}</h3>
    <p class="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"> 
     <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
   </svg> 
    Breed: ${pet.breed}
    </p>
    <p>
     <i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth}
    </p>
    <p>
     <i class="fa-solid fa-venus"></i> Gender: Female

    </p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price}$</p>

    <hr>

    <div class="pt-5 flex gap-5 justify-center">
     <button class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
     <button class="btn text-primary">Adopt</button>
     <button class="btn text-primary">Details</button>
    </div>
    `;
    left.append(newDiv);
    }
        


}
loadPets();
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
       x.classList.remove('bg-btn','rounded-[120px]');
   });
}

const loadPetsByCategory = (x, categories) => {
   resetAllCategories(categories); 
   const currentButton = document.getElementById(x);
   currentButton.classList.add('bg-btn','rounded-[120px]');

   // alert(x); // gets the category ID
}