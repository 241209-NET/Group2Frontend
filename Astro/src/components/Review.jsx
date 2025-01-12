import { useState } from 'react';
//import a from "../../assets/"

export default function Review() {

    const [comment, setComment] = useState('');

    async function loadComments(event) {

        event.preventDefault(); 
    
        try {
            //REPLACE WITH ACTUAL BACKEND LATER
            const response = await axios.get(`http://localhost:5080/api/Review`, {
                username,
                password,
            });

            if (response.data.success) {
                login(); 
            } else {
            }

        } catch (error) {

            console.error("Login error:", error);

        }


    }

    async function postComment(event) {


        try {
            //REPLACE WITH ACTUAL BACKEND LATER
            //axios.post(`http://localhost:5080/api/Review`, {


        } catch (error) {

            console.error("Post:", error);

        }


    }


    return (

        <div className="comment-box">
            write your review here
            <input

                
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="write your review here"
                required
            />

        </div>

    );


}