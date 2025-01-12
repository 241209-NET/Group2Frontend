import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Search() {

    const handleInputChange = (event) => {

    }


  return (
    <div>
        <h2>Search</h2>
        <input 
            type="text" 
            onChange={handleInputChange}
            placeholder='Enter pokemon to search for'
        />

    </div>
  )
}

export default Search