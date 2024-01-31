import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound () {
    return (
      <div className="not-found">
        <h3 className="not-found__title">
         <span>404</span> - The page was not found
        </h3>
        <p className="not-found__text">
        Oh, there's nothing here
        </p>
        <Link className="not-found__link" to="/">Back</Link>
      </div>
    )
  }
  
  export default PageNotFound;