const loadPets = async () => {

    showSpinner(true);
    setTimeout( ()=>{

        showSpinner(false);

    },3000);


    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    const pets = data.pets;
    console.log(pets);
    // setTimeout(displayPets(pets),5000);
    setTimeout( () =>{
        displayPets(pets);
    }, 3000);
    // displayPets(pets);
    for (const pet of pets) {
        console.log(pet);
    }
}
const getYear= (dob)=>{
    // console.log(typeof dob);
    // typeof dob !=='string'
    let year='2024';
    if(dob){
       year= dob.slice(0,4);
    }
    else{
        year=2024;
    }
    return year;
}
const getPetDetailsLines= (pet_details) =>{
   console.log(typeof pet_details);
   const result = pet_details.split('. ');
   console.log(result);
   return result;
}
const showSpinner = (status)=>{
    const spinner = document.getElementById('spinner');
    if(status){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }

}
// setTimeout(displayPets,2000);

const displayPets = (pets) => {
    const left = document.getElementById('left');
     
    
 
    

    for (const pet of pets) {
        const newDiv = document.createElement('div');
        const year= getYear(pet.date_of_birth);
        const detailsLines= getPetDetailsLines(pet.pet_details);
        newDiv.classList.add('border', 'p-3', 'border-b1','rounded-md');
        newDiv.innerHTML = `
        <img class="rounded-md" src="${pet.image}" alt="">
        <h3 class="font-extrabold">${pet.pet_name?pet.pet_name:'Tom'}</h3>
        <p class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"> 
         <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
       </svg> 
        Breed: ${pet.breed?pet.breed:'Golden Retrieve'}
        </p>
       
        <p><i class="fa-solid fa-calendar-days "></i> Birth: ${pet.date_of_birth?year:'2024'}</p>
        <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender?pet.gender:'Male'}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price?pet.price:'1200'}$</p>
        
        <hr>
    
        <div class="pt-5 flex gap-5 justify-center">
        <button class="px-5 py-1   border border-btn rounded-md hover:bg-btn like-button text-primary"><i class="fa-regular fa-thumbs-up"></i></button>
        <button class="px-5 py-1  border border-btn rounded-md hover:bg-btn adopt text-primary">Adopt</button>
        <button class="px-5 py-1  border border-btn rounded-md hover:bg-btn details text-primary">Details</button>
        </div>
      `;

        left.append(newDiv);

        const likeButton = newDiv.querySelector('.like-button');
        likeButton.onclick = () => {
            showImage(pet.image);
        };
        const adoptButton = newDiv.querySelector('.adopt');
        adoptButton.onclick = () => {
            // alert('Adopt Clicked');
            const countdownModal = document.getElementById('countdownModal');
            countdownModal.showModal();
            const modalValue = document.getElementById('countdown').innerText;
            const countdownElement = document.getElementById('countdown');
            console.log(modalValue);

            let count = 3;
            const intervalId = setInterval(() => {
                countdownElement.innerText = count; // Update the countdown display

                if (count === 0) {
                    clearInterval(intervalId); // Stop the countdown
                    countdownElement.innerText = '3'; // Close the countdown (clear the text)
                }

                count--;
            }, 1000); // Run every 1 second

            // Set a timeout to close the modal after 3 seconds (3000 ms)
            setTimeout(() => {
                countdownModal.close(); // Close the modal
                adoptButton.setAttribute('disabled',true);
                //  adoptButton.classList.add('text-black','bg-gray-100');
                //  adoptButton.classList.remove('hover:bg-btn');
                 adoptButton.innerText='Adopted';

            }, 3000);

        }
        const detailsButton = newDiv.querySelector('.details');
        detailsButton.onclick = () =>{
            const detailsModal = document.getElementById('detailsModal');
            const detailsListHTML = detailsLines.map(line => `<li>${line}.</li>`).join(''); 
            detailsModal.innerHTML=
            `
            <div class="modal-box space-y-2 rounded-md">
               
            <img class="w-full rounded-md" src="${pet.image}" alt="">

            
              <h2 class="text-2xl font-bold ">${pet.pet_name?pet.pet_name:'Tom'}</h3>
            <div class="space-y-2">
              <div>
                <div class="grid grid-cols-2 gap-5">
                <p class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"> 
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg> 
                Breed: ${pet.breed?pet.breed:'Golden Retrieve'}
                </p> 
                <p><i class="fa-solid fa-calendar-days "></i> Birth: ${pet.date_of_birth?year:'2024'}</p>
                </div>
                <div class="grid grid-cols-2 gap-5">
                <p><i class="fa-solid fa-venus"></i> Gender:  ${pet.gender?pet.gender:'Male'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price?pet.price:'1200'}$</p>
                </div> 
                <p><i class="fa-solid fa-venus"></i> Vaccinated Status : ${pet.vaccinated_status?pet.vaccinated_status:'Partially'}</p>
              </div> 
               
              <div>
                 <h3 class="font-extrabold ">Details Information</h3>
                 <p>Meet our lovable pet! Full of energy and affection, this furry friend brightens every day. Check out the details below to learn more about their unique traits!</p>
                  <ul class="pl-10 list-disc">
                     
                  ${detailsListHTML}
                     
                  
                  </ul>
              </div>

            </div>

              <form class="pt-3 w-full " method="dialog">
              
                <button class=" w-full px-3 py-2 font-bold rounded-md bg-btn text-primary">Cancel</button>

             </form>

        </div>
            `;
            detailsModal.show();
        }


    }
};


// Call the function to start the countdown


loadPets();

const showImage = (imageSrc) => {
    const rightContainer = document.getElementById('right');
    const imgElement = document.createElement('img');
    imgElement.classList.add('rounded-md');
    imgElement.setAttribute('src', imageSrc);
    rightContainer.append(imgElement);
};


const loadCategories = async () => {
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
        x.classList.remove('bg-btn', 'rounded-[120px]');
    });
}

const loadPetsByCategory = (x, categories) => {
    resetAllCategories(categories);
    const currentButton = document.getElementById(x);
    currentButton.classList.add('bg-btn', 'rounded-[120px]');

    // alert(x); // gets the category ID
}