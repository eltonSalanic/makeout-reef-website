async function getShowsData() {
    const parameters = new URLSearchParams({
        app_id: '712c86ae7c7a2363d5dbe09e6b3601b8'
    })
    
    try {
      const response = await fetch('https://rest.bandsintown.com/artists/makeoutreef/events?${parameters}');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  }
  
  getShowsData();
  