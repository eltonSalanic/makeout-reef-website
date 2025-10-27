import express from 'express';
import dotenv from 'dotenv/config';

const app = express();

app.get("/get-shows", async ()=>{
    const parameters = new URLSearchParams({
        app_id: process.env.API_KEY
    });

    try {
        const response = await fetch(`https://rest.bandsintown.com/artists/makeoutreef/events?${parameters}`);

        if (!response.ok){
            const errorResponse = response.json();
            const errorMessage = await errorResponse?.error || errorResponse?.message ||  `Code: ${errorResponse.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
      } catch (err) {
        console.error('Failed to retrieve show data from BandsInTown Api: ', err);
      }
});

app.listen(process.env.API_PORT, () => {
    console.log("Makeout Reef api running at port " + process.env.API_PORT);
})