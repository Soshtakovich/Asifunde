import React from 'react';
import Insights from './Insights';

const insightsData = [
    {
        iconClass: 'bx bx-calendar-check',
        value: '3 Days',
        label: 'Absent'
    },
    {
        iconClass: 'bx bx-analyse',
        value: '4',
        label: 'Assessments completed'
    },
    {
        iconClass: 'bx bx-run',
        value: '52%',
        label: 'Average'
    },
    {
        iconClass: 'bx bxs-discount',
        value: '5.88',
        label: 'Program Score'
    }
];

function Dashinsights() {
    return (
        <div>
            <Insights insightsData={insightsData} />
        </div>
    );
}

export default Dashinsights;
