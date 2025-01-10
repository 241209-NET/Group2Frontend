import { useState } from 'react';

export default function Review() {

    const [comment, setComment] = useState('');


    return (

        <div write your review here>

            <input

                className="user-input"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="write your review here"
                required
            />

        </div>

    );


}