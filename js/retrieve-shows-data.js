async function getShowsData(){
  try{
    const response = await fetch("https://buk2yisea7.execute-api.us-east-1.amazonaws.com/makeout-reef/shows");
    if(!response.ok){
      const parsedRes = await response.json();
      throw new Error(parsedRes.body); //throw error, let UI catch it
    }

    const data = await response.json();
    return data.body;
  }catch(err){
    throw new Error(errorMessage);
  }
}

async function populateShowsDataInDom(){
  let showsData;

  try{
    showsData = await getShowsData();
    showsData = JSON.parse(showsData);
  }catch(err){
    //put error message as h2 in .shows-window
    const showsContainer = document.querySelector('.shows-window');
    const errorMessageElement = document.createElement('h2');
    errorMessageElement.innerHTML = 'Could not get upcoming shows. Try again later.';
    showsContainer.classList.add('no-upcoming-shows');
    showsContainer.appendChild(errorMessageElement);
    return;
  }

  if(showsData.length === 0){
    //put message as h2 in .shows-window
    const showsContainer = document.querySelector('.shows-window');
    const noUpcomingShowsElement = document.createElement('h2');
    noUpcomingShowsElement.innerHTML = 'No upcoming shows!';
    showsContainer.classList.add('no-upcoming-shows');
    showsContainer.appendChild(noUpcomingShowsElement);
  }else{
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
    });
  }
}

populateShowsDataInDom();