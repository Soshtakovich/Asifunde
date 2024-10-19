import React from 'react';
import '../../CSS/Main-small-components-css/Path.css';

function Path({ content }) {

    return (
        <div className="path-content-header">
            <div className="path-left">
                <h1>{content}</h1>
                
                <ul className="breadcrumb">
                    <li><a href="/">Asfunde / Teacher</a></li>

                        <li><a href="/" className="active">{content}</a></li>
                    
                </ul>
            </div>
        </div>
    );
}

export default Path;
