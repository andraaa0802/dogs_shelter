import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ previousPage, path }) => {
  let previousPagePath;
  let previousPageName;
  if (previousPage === 'Adoptă') {
    previousPagePath = '/adopt';
    previousPageName = 'Adoptă';
  } else {
    previousPagePath = '/';
    previousPageName = 'Acasă';
  }

  return (
    <section className="hero-wrap hero-wrap-2">
      <div className="overlay">
        <div className="container">
          <div className="row no-gutters slider-text align-items-start">
            <div className="col-md-9 pb-5">
              <p className="breadcrumbs mb-2">
                <span className="mr-2">
                  <Link to={previousPagePath}>{previousPageName}</Link>
                </span>
                <span>&rarr; {path}</span>
              </p>
              <h1 className="breadcrumbs mb-0">{path}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;
