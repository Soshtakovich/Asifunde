import React from 'react';
import '../../CSS/Main-small-components-css/Path.css';

function Path({ content }) {
    const pathParts = content.split('/');

    return (
        <div className="path-content-header">
            <div className="path-left">
                <h1>{pathParts[pathParts.length - 1]}</h1>
                
                <ul className="breadcrumb">
                    <li><a href="/">Asfunde</a></li>
                    {pathParts.length > 1 ? (
                        <>
                            <li><a href="/Subjects" className="active">Subjects</a></li>
                            <li><a href={`/Subjects/${pathParts[1]}`} className="active">{pathParts[1]}</a></li>
                        </>
                    ) : (
                        <li><a href="/" className="active">{content}</a></li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Path;
