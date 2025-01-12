import '../App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function Home() {

    const [podToFind, setPodToFind] = useState(new Date().toISOString().slice(0, 10)); //By default, it loads Bulbasaur 
    const [podData, setPodData] = useState(null); //By default, before the user searches this is null;


    useEffect(() => {
        
        //This is a function that I will call to send that GET request to the pokeAPI
        const fetchPodData = async () => {
            try{
                //First we try to get a response from pokeAPI
                const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${podToFind}`); // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
                console.log(podToFind);
                setPodData({
                    title: response.data.title,
                    date: response.data.date,
                    explanation: response.data.explanation,
                    url: response.data.url,
                });

            } catch (error) {
                console.error('Error fetching Pod data:', error)
                setPodData(null);
            }
        };
        //Here we just call the function
        fetchPodData();
    }, [podToFind]); // UseEffect exepcts a dependency array as a second argument.
    //Even if you have none, omitting this can result in an infinite loop. 
    const handleInputChange = (event) => {
        if (event.target.value.length == 10) {
            setPodToFind(event.target.value)
            console.log('do validate');
          }
    }

    return ( 

        <div className="home">
            <div>
            <h2>Search</h2>
            <input 
                type="text" 
                onChange={handleInputChange}
                placeholder='yyyy-mm-day'
            />
            </div>
        {
            podData ? (
                <div>
                    <h3>{podData.title}</h3>
                    <img src={podData.url} alt={podData.explanation} />
                    <p>{podData.explanation}</p>
                </div>
            ) : (
                <div>
                    <p>Loading Picture of the day...</p>
                </div>
            )
        }
        <div>Astro is a full-stack web application designed to bring astronomy enthusiasts together. By combining the latest NASA imagery with a social platform, Astro offers users a unique space to explore the cosmos and connect with others who share their passion for astronomy.</div>

        </div>
    )

}