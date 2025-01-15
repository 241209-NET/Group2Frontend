import { useState } from 'react';
//import a from "../../assets/"

import './Review.css';

import { useUserContext } from './UserContext'; 

export function LoadReview({username, comment}) {
    return (
        <div className="comment-body">
            <b>{username}</b>
            {comment}
        </div>
    );
}

export default function Review() {

    const { currentUser } = useUserContext();

    const [comment, setComment] = useState('');
    
    const [pressedPostCommentButton, setPressedPostCommentButton] = useState(false);



    const [commentList, setCommentList] = useState([
        { username: "Bob", comment: "This is the first review."},
        { username: "Mike", comment: "This is the second review."}
    ]);
    
    const [userList, setUserList] = useState(["name", "othername"]);

    async function LoadAllReviews() {
        
        event.preventDefault();
    
        try {

            //collects all the reviews from the api backend
            const responseReview = await axios.get(`https://p2-astro.azurewebsites.net/api/Review`);
    
            if (responseReview.status === 200) {

                const reviews = responseReview.data;
                
                //collects each username from the api backend that matches review.UserId
                const reviewsWithUsernames = await Promise.all(

                    reviews.map(async (review) => {
                        const responseUser = await axios.get(`https://p2-astro.azurewebsites.net/api/User/${review.UserId}`);
                        return {...review, username: responseUser.data.username};
                    })

                );
    
                setCommentList(reviewsWithUsernames);

            } else {
                console.error("Status error:", responseReview.status);
            }
        } catch (error) {
            console.error("Error loading reviews:", error);
        }
    }

    async function postComment() {


        try {

            axios.post(`https://p2-astro.azurewebsites.net/api/Review/CreateNewReview`, comment); 

        } catch (error) {

            console.error("Post: ", error);

        }


    }

    return (
        <div>
            <div className="comment-box">
            {!pressedPostCommentButton && currentUser != null && (
                <button onClick={() => setPressedPostCommentButton(true)} className="comment-button">Comment</button>
            )}
    
            {pressedPostCommentButton && (
                <div>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comment"
                        required
                        className="user-comment"
                    />
                    <div className="comment-button-box">
                        <button onClick={() => setPressedPostCommentButton(false)} className="comment-button">Cancel</button>
                        <button onClick={() => postComment()} className="comment-button">Post</button>
                    </div>
    
                </div>
            )}

            <button onClick={() => LoadAllReviews()} className="comment-button">Load all comments</button>

            </div>

            
            
            <div>
                
                {commentList.map((review) => (

                    <LoadReview username={review.username} comment={review.comment} />

                ))}

            </div>

        </div>
        
    );


}