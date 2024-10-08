// Load All Pets
let copyPets= (x)=>{
   
    // displayPetsByShorting(x);
    getCopyData(x);
}
const loadPets = async () => {

    showSpinner(true);
    setTimeout( ()=>{

        showSpinner(false);

    },2000);
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    const pets = data.pets;
     copyPets([...pets]);
    // shortByPrice(copyPets);
    //console.log(pets);
    // setTimeout(displayPets(pets),5000);
    setTimeout( () =>{
        displayPets(pets);
    }, 2000);
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
    const rightContainer = document.getElementById('right-container');
    rightContainer.classList.add('border','border-gray-300', 'rounded-md');
    console.log('hello');
    console.log(rightContainer);
    if(pets.length===0){
        const left= document.getElementById('left');
        
        left.classList.remove('lg:grid-cols-3','md:grid-cols-2');
        
        left.classList.add('grid-cols-1');
        left.innerHTML='';
        left.innerHTML=
        `
        

        
        <div class="border mx-auto p-3 border-b1">

        <img class="mx-auto" src="images/error.webp" alt="notFound">
        <h1 class="font-bold text-center text-xl">No Information Available</h1>
        <p class="w-8/12 mx-auto ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
         its layout. The point of using Lorem Ipsum is that it has a.</p>

     </div>

        `;
        return;
    }
    else{
        const left= document.getElementById('left');
        left.classList.remove('grid-cols-1');
        left.classList.add('lg:grid-cols-3','md:grid-cols-2','grid-cols-1');
       
        left.innerHTML='';
       
        for (const pet of pets) {
        const newDiv = document.createElement('div');
        const year= getYear(pet.date_of_birth);
        const detailsLines= getPetDetailsLines(pet.pet_details);
        newDiv.classList.add('border', 'p-3', 'border-b1','rounded-md');
        newDiv.innerHTML = `
        <img class="rounded-md object-cover w-full " src="${pet.image}" alt="">
        <h3 class="font-inter py-2 text-xl font-extrabold">${pet.pet_name?pet.pet_name:'Tom'}</h3>
        <p class="font-lato flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"> 
         <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
       </svg> 
        Breed: ${pet.breed?pet.breed:'Golden Retrieve'}
        </p>
       
        <p class="font-lato"><i class="fa-solid fa-calendar-days "></i> Birth: ${pet.date_of_birth?year:'2024'}</p>
        <p class="font-lato"><i class="fa-solid fa-venus"></i> Gender: ${pet.gender?pet.gender:'Male'}</p>
        <p class="pb-2 font-lato"><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price?pet.price:'1200'}$</p>
        
        <hr>
    
        <div class="pt-5 font-lato flex justify-between gap-5 ">
        <button class="px-5 md:px-2 font-bold  py-1   border border-btn rounded-md hover:bg-btn like-button text-primary"><i class="fa-regular fa-thumbs-up"></i></button>
        <button class="px-5 md:px-2 font-bold py-1  border border-btn rounded-md hover:bg-btn adopt text-primary">Adopt</button>
        <button class="px-5 md:px-2 font-bold py-1  border border-btn rounded-md hover:bg-btn details text-primary">Details</button>
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
        detailsButton.onclick = async() =>{
            const detailsModal = document.getElementById('detailsModal');
           // alert(pet.petId);
            let petId= pet.petId;
            const res= await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
            const data = await res.json();
            console.log('Details Data');
            console.log(data.petData);
            let p=data.petData;
            const detailsListHTML = detailsLines.map(line => `<li>${line}.</li>`).join(''); 
            detailsModal.innerHTML=
            `
            <div class="modal-box space-y-2 rounded-md">
               
            <img class="w-full rounded-md" src="${p.image}" alt="">

            
              <h2 class="text-2xl font-bold ">${p.pet_name?p.pet_name:'Tom'}</h3>
            <div class="space-y-2">
              <div>
                <div class="grid grid-cols-2 gap-5">
                <p class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"> 
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg> 
                Breed: ${p.breed?p.breed:'Golden Retrieve'}
                </p> 
                <p><i class="fa-solid fa-calendar-days "></i> Birth: ${p.date_of_birth?year:'2024'}</p>
                </div>
                <div class="grid grid-cols-2 gap-5">
                <p><i class="fa-solid fa-venus"></i> Gender:  ${p.gender?p.gender:'Male'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price : ${p.price?p.price:'1200'}$</p>
                </div> 
                <p><i class="fa-solid fa-venus"></i> Vaccinated Status : ${p.vaccinated_status?p.vaccinated_status:'Partially'}</p>
              </div> 
               
              <div>
                 <h3 class="font-extrabold ">Details Information</h3>
                 <p>${p.pet_details}</p>
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
   }
};



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
    const finalData= data.categories;
    // copyPets([...finalData]);
    displayCategories(finalData);



}
loadCategories();
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    
    let s=1;
    for (const pet of categories) {
        const newButton = document.createElement('button');
        newButton.classList = 'hover:bg-btn border py-5 border-btn rounded-2xl flex gap-3 items-center justify-center';

        // Correctly passing both pet.id and categories
        // newButton.setAttribute('onclick', `loadPetsByCategory('${pet.id}', categories)`);
        newButton.onclick = () => loadPetsByCategory(pet.id, categories);

        newButton.setAttribute('id', `${pet.id}`);
        newButton.innerHTML = `
           <img src="${pet.category_icon}" alt="${pet.category}">
           <h3 class="text-lg md:text-xl font-bold">${pet.category}</h3>
       `;
        categoryContainer.append(newButton);
        if(pet.id===2){
            // alert('hi');
            document.getElementById('2').classList.add('bg-btn','rounded-[120px]');  
        }
        s++;
    }
    
   

}

const resetAllCategories = (categories) => {
    const shortByPrice= document.getElementById('shortByPrice');
    shortByPrice.classList.remove('bg-primary');
    shortByPrice.classList.add('hover:bg-btnShort');
    console.log(categories.length);
    categories.forEach(category => {
        const id = category.id;
        const x = document.getElementById(id);
        x.classList.remove('bg-btn', 'rounded-[120px]');
    });
}
let categoryStatus=false;
let categoryName='';
// loadPetsByCategoryName 
const loadPetsByCategoryName = async (categoryName)=>{
    showSpinner(true);
    setTimeout( ()=>{

        showSpinner(false);

    },2000);
   
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    const data = await res.json();
    console.log('loadPetsByCategoryName');
    // console.log(data.data);
    const pets = data.data;

    copyPets([...pets]);
    // console.log(pets);
    // setTimeout(displayPets(pets),5000);
    setTimeout( () =>{
        displayPets(pets);
    }, 2000);
    // displayPets(pets);
    for (const pet of pets) {
        console.log(pet);
    }
    
    
    
}
const loadPetsByCategory = (x, categories) => {
    resetAllCategories(categories);
    const currentButton = document.getElementById(x);
    currentButton.classList.add('bg-btn', 'rounded-[120px]');

    // alert(x); // gets the category ID
    // displayPetsByShorting();
    categoryStatus=true;
    if(x===1)
    {
        categoryName='cat';
       // alert(categoryName);
    }
    else if(x===2){
        categoryName='dog';
       
       // alert(categoryName);
    }
    else if(x===3){
        categoryName='rabbit';
        //alert(categoryName);
    }
    else if(x===4){
        categoryName='bird';
        //alert(categoryName);
    }
    const left= document.getElementById('left');
    const right= document.getElementById('right');

    const rightContainer = document.getElementById('right-container');
   
    // rightContainer.classList.remove('border','border-gray-300', 'rounded-md');

    left.innerHTML='';
    // right.innerHTML='';

    if(categoryStatus){
        // alert('Category Selected');
        // rightContainer.classList.remove('border','border-gray-300', 'rounded-md');

        left.innerHTML='';
        
        // right.innerHTML='';
        
        // alert(categoryName);
    }
    else{
        // alert('all data is in display');
    }
     
    
    
    loadPetsByCategoryName(categoryName);
}
let myData=[];

const getCopyData = (x) =>{
//    function copyPets(x){
//        console.log('CopyData');
//        console.log(x);
//    }
    console.log('CopyDataGot:');
    console.log(x);
    myData=x;
    
    
    
}

const compare=(a,b)=>{
    if(!a.price) a.price=1200;
    if(!b.price) b.price=1200;
    return (b.price)-(a.price);
}

const shortByPrice= document.getElementById('shortByPrice');
shortByPrice.addEventListener('click', ()=>{
    // alert('shortButtonClicked');
    console.log('Copy Data Received by myData');
    console.log(myData);
    shortByPrice.classList.add('bg-primary');
    shortByPrice.classList.remove('hover:bg-btnShort');


 
    // displayPetsByShorting();
    const left = document.getElementById('left');
    const right= document.getElementById('right');

    const rightContainer = document.getElementById('right-container');
    left.innerHTML='';
        myData.sort(compare);
        displayPets(myData);

    if(categoryStatus){
        // alert('Category Selected');
        // rightContainer.classList.remove('border','border-gray-300', 'rounded-md');

        left.innerHTML='';
        myData.sort(compare);
        displayPets(myData);
        // right.innerHTML='';
        
        // alert(categoryName);
    }
    else{
        // alert('all data is in display');
    }
     
    
    
    // alert('Short button Clicked');
})

// document.getElementById('2').classList.add('bg-btn', 'rounded-[120px]');

console.log(document.getElementById('2'));
