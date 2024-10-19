// InsightsData.js

import React, { useState, useEffect } from 'react';
import Insights from './Insights';

function DashInsights() {
    const [insightsData, setInsightsData] = useState([
        { iconClass: 'bx bx-calendar-check', value: '0%', label: 'Attendance' },
        { iconClass: 'bx bx-analyse', value: '0', label: 'Assessments completed' },
        { iconClass: 'bx bx-run', value: '0%', label: 'Average' },
        { iconClass: 'bx bxs-discount', value: '0', label: 'Program Score' }
    ]);

    useEffect(() => {
        // Fetch insights data for the logged-in learner
        async function fetchInsights() {
            const learnerNumber = sessionStorage.getItem('Learner_Number');

            if (!learnerNumber) {
                console.error('Learner_Number not found in session storage.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/dash/${learnerNumber}`);
                const data = await response.json();

                if (response.ok) {
                    // Update insights data based on the fetched data
                    setInsightsData([
                        { iconClass: 'bx bx-calendar-check', value: `${data.progress.Attendance_Perc || 0}%`, label: 'Attendance' },
                        { iconClass: 'bx bx-analyse', value: data.totalAssessments.toString(), label: 'Assessments completed' },
                        { iconClass: 'bx bx-run', value: `${data.progress.Average_Mark || 0}%`, label: 'Average' },
                        { iconClass: 'bx bxs-discount', value: data.progress.Social_score.toString() || '0', label: 'Program Score' }
                    ]);
                } else {
                    console.error('Failed to fetch insights:', data.error);
                }
            } catch (error) {
                console.error('Error fetching insights data:', error);
            }
        }

        fetchInsights();
    }, []); // Run once on mount

    return (
        <div>
            <Insights insightsData={insightsData} />
        </div>
    );
}

export default DashInsights;
