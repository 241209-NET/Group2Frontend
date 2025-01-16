import '../App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function Home() {
    //let hostString = "https://p2-astro.azurewebsites.net/api/POD/date/2025-01-14";
    const [podToFind, setPodToFind] = useState(new Date().toISOString().slice(0, 10)); //By default, it loads Bulbasaur 
    const [podData, setPodData] = useState(null); //By default, before the user searches this is null;
    const [commentData, setCommentData] = useState(null); //By default, before the user searches this is null;
    const [reviewData, setReviewData] = useState(null); //By default, before the user searches this is null;

    useEffect(() => {
        
        //This is a function that I will call to send that GET request to the pokeAPI
        const fetchPodData = async () => {
            try{
                //First we try to get a response from pokeAPI
                const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=HFpqrhFAOdwMs8fKiLVAjWggpyKvaZbmjYmskQVD&date=${podToFind}`); // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
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
        fetchPodData();
    }, [podToFind]); // UseEffect exepcts a dependency array as a second argument.
    //Even if you have none, omitting this can result in an infinite loop. 

    useEffect(() => {
    
        const fetchApiPodData = async () => {
            try{
                const response = await axios.get(`https://p2-astro.azurewebsites.net/api/POD/date/${podToFind}`); // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
            } catch (error) {
                axios.post('https://p2-astro.azurewebsites.net/api/POD', { Date: `${podToFind}`, Explanation: `${podData.explanation}`, Title: `${podData.title}`, URL: `${podData.url}`}).then(function (response) {console.log(response);}).catch(function (error) {console.log(error);});

            }
        };
        fetchApiPodData();
    }, [podData]); // UseEffect exepcts a dependency array as a second argument.
    //Even if you have none, omitting this can result in an infinite loop. 

    useEffect(() => {
        const PostReview = async () => {
            try{
                if(commentData)
                {
                    const response = await axios.get(`https://p2-astro.azurewebsites.net/api/POD/date/${podToFind}`);
                    const postResponse = await axios.post('https://p2-astro.azurewebsites.net/api/Review', 
                    {comment:`${commentData}`, userid: `1`, podid: `${response.data.podId}`})

                    if(postResponse.status == 200)
                    {
                        const reviewResponse = await axios.get(`https://p2-astro.azurewebsites.net/api/POD/date/${podToFind}`);
                        setReviewData(reviewResponse.data.reviews);
                    }
                }
            } catch (error) {
                console.error('Error fetching Pod data:', error)
            }
        };
        PostReview();
    }, [commentData]);
    useEffect(() => {
        const getComments = async () => {
            try{
                const reviewResponse = await axios.get(`https://p2-astro.azurewebsites.net/api/POD/date/${podToFind}`);
                if(reviewResponse.status == 200)
                    setReviewData(reviewResponse.data.reviews);
                else
                    setReviewData(null);
            } catch (error) {
                console.error('Error fetching comment data:', error)
            }
        }
        getComments();
    }, [podToFind]);
    
    // UseEffect exepcts a dependency array as a second argument.
    //Even if you have none, omitting this can result in an infinite loop. 
    const handleInputChange = (event) => {
        if (event.key === 'Enter') {
            setReviewData(null);
            setPodToFind(event.target.value);
          }
    }
    const handleReview = (event) => {
        if (event.key === 'Enter') {
            setCommentData(event.target.value);
          }
    }

    return ( 

        <div className="home">
            <div>
            <h2>Search</h2>
            <input 
                type="text" 
                onKeyDown={handleInputChange}
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
            <div>
            <h2>comments</h2>
            <input 
                type="text"
                placeholder='Enter Your Comment'
                onKeyDown={handleReview}
            />
            </div>       
        {
            reviewData ? (
                <ul>
                    {reviewData.map((comment, index) => (
                        <li key = {index}>{comment.comment}</li>
                    ))}
                </ul>
            ) : (
                <div>
                    <p> Loading comments...</p>
                </div>
            )
        }
        </div>
    )

}