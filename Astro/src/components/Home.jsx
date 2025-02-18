import '../App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Home.css';

import { useUserContext } from './UserContext';


export default function Home() {
    //let hostString = "https://p2-astro.azurewebsites.net/api/POD/date/2025-01-14";
    const [podToFind, setPodToFind] = useState(new Date().toISOString().slice(0, 10)); //By default, it loads Bulbasaur 
    const [podData, setPodData] = useState(null); //By default, before the user searches this is null;
    const [commentData, setCommentData] = useState(null); //By default, before the user searches this is null;
    const [reviewData, setReviewData] = useState(null); //By default, before the user searches this is null;

    const { currentUser, currentEmail, currentId } = useUserContext();

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
                    {comment:`${commentData}`, userid: `${currentId}`, podid: `${response.data.podId}`})

                    if(postResponse.status == 200)
                    {
                        const reviewResponse = await axios.get(`https://p2-astro.azurewebsites.net/api/POD/date/${podToFind}`);
                        setReviewData(reviewResponse.data.reviews);
                    }
                }
            } catch (error) {
                alert("You need to login to comment!");
                console.error('Error posting review!:', error)
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
            <input className='input-field'
                type="text" 
                onKeyDown={handleInputChange}
                placeholder='yyyy-mm-day'
            />
            </div>
        {
            podData ? (
                <div>
                    <br></br>
                    <div id = "pictureAndDesc" >
                        <img src={podData.url} alt={podData.explanation}/>
                        <div className='explanation-div'>
                            <h2><i>{podData.title}</i></h2>
                            <p>{podData.explanation}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Loading Picture of the day...</p>
                </div>
            )
        }
            <div className='bording-line'>
            <h2>Comments</h2>
            <input className='input-field'
                type="text"
                placeholder='Enter Your Comment'
                onKeyDown={handleReview}
            />
            </div>       
        {
            reviewData ? (
                <ul className='ul-block'>
                    {reviewData.map((comment, index) => (
                        <div key = {index}>
                            <div className='list-item'>
                                <li >{comment.comment}</li>
                            </div>
                        </div>
                        
                        
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