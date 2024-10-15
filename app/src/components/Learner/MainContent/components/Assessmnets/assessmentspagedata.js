
//export const subjectassessmentsData


export const subjectassessmentsData = async () => {
    const learnerNumber = sessionStorage.getItem('Learner_Number'); // Get learner number from session storage

    try {
        const response = await fetch(`http://localhost:4000/api/assessmentsall/${learnerNumber}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch assessments: ${errorText}`);
            throw new Error(errorText);
        }

        const data = await response.json();
        console.log('Fetched Subject Assessments Data:', data); // Log fetched data
        return data;
    } catch (error) {
        console.error('Error fetching subject assessments:', error);
        return []; // Return empty array if fetch fails
    }
};


