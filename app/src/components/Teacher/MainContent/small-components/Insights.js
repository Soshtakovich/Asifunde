import React from 'react';

function Insights({ insightsData }) {
    return (
        <div>
            <ul className="insights">
                {insightsData.map((insight, index) => (
                    <li key={index} >
                        <i className={insight.iconClass}></i>
                        <span className="info">
                            <h3 className='insights-heading'>{insight.value}</h3>
                            <p>{insight.label}</p>
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Insights;
