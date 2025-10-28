async function getShowsData(){
  try{
    const response = await fetch("http://localhost:3000/get-shows");
    if(!response.ok){
      const errorResponse = await response.json();
      const errorMessage = "this is the string";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  }catch(err){
    console.error("Error fetching shows: ", err.message);
  }
}

/*async function displayShowsData(){
  const showsData = await getShowsData();

  const showsContainer = document.querySelector('.shows-list');

  showsData.forEach(show =>{
      //format date
      const date = new Date(show.datetime);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit'
      });
      
      const showCard = document.createElement('div');
      showCard.classList.add('show-card');
      showCard.innerHTML = `
      <div class="show-where">
          <div class="show-city">${show.venue.location}</div>
          <div class="show-venue">${show.venue.name}</div>
      </div>
      <div class="show-date">${formattedDate}</div>
          <div class="show-cta"><a href="${show.url}">tickets</a>
      </div>
      `
      showsContainer.appendChild(showCard);
      //Fri, Nov 07
  });
}*/
