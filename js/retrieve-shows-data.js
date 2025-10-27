async function getShowsData() {
    const parameters = new URLSearchParams({
        app_id: '712c86ae7c7a2363d5dbe09e6b3601b8'
    })
    
    try {
      const response = await fetch(`https://rest.bandsintown.com/artists/makeoutreef/events?${parameters}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Fetch failed:', err);
    }
    
  }
  
  async function displayShowsData(){
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

    /*<div class="show-card">
        <div class="show-where">
            <div class="show-city">Los Angeles, CA</div>
            <div class="show-venue">The Echo</div>
        </div>
        <div class="show-date">Fri, Nov 07</div>
            <div class="show-cta"><a href="#">tickets</a>
        </div>
    </div>*/
  }

  displayShowsData();
  