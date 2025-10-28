import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors({origin: "*"}));

app.get("/get-shows", async (req, res)=>{
    const parameters = new URLSearchParams({
        app_id: process.env.API_KEY
    });

    try {
        const response = await fetch(`https://rest.bandsintown.com/artists/makeoutreef/events?${parameters}`);

        if (!response.ok){
            const errorResponse = await response.json();
            const errorMessage = errorResponse?.error || errorResponse?.message ||  `No error message from BIT API. Error Code: ${errorResponse.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        res.json(data);
        
      } catch (err) {
        console.error('Failed to retrieve show data from BandsInTown Api: ', err.message);
      }
});

app.listen(process.env.API_PORT, () => {
    console.log("Makeout Reef api running at port " + process.env.API_PORT);
})