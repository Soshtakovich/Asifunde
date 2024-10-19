

//export const assessmentsData = [
 //   { subject: "Mathematics", image: "/images/subjects/maths.jpg", dueDate: "14-08-2023", status: "Completed", statusClass: "completed", daysRemaining: 5 },
  //  { subject: "Physical Sciences", image: "/images/subjects/physical-sciences.jpg", dueDate: "14-08-2023", status: "Not_Started", statusClass: "pending", daysRemaining: 5 },
  //  { subject: "English", image: "/images/subjects/english.jpeg", dueDate: "14-08-2023", status: "Incomplete", statusClass: "process", daysRemaining: 5 },
 //   { subject: "Computer Skills", image: "/images/subjects/computer.jpg", dueDate: "14-08-2023", status: "Completed", statusClass: "completed", daysRemaining: 5 },
 //   { subject: "BET", image: "/images/subjects/english.jpeg", dueDate: "14-08-2023", status: "Incomplete", statusClass: "process", daysRemaining: 5 }
//];


// Utility to fetch assessments data and export in required format
export const assessmentsData = async () => {
    const learnerNumber = sessionStorage.getItem('Learner_Number'); // Get learner number
   // console.log(`Fetching assessments for: ${learnerNumber}`); // Log learner number

    try {
        const response = await fetch(`http://localhost:4000/api/dashassessments/${learnerNumber}`);

        //console.log(`Response Status: ${response.status}`); // Log response status

        if (!response.ok) {
            const errorText = await response.text(); // Read error message
            console.error(`Failed to fetch assessments: ${errorText}`);
            throw new Error(errorText);
        }

        const data = await response.json();
       // console.log('Fetched Assessments Data:', data); // Log fetched data

        // Access the 'data' property of the response
        return data.data.map(item => ({
            subject: item.subject,
            image: `/images/subjects/${item.subject.toLowerCase().replace(/\s+/g, '-')}.jpg`,
            dueDate: item.dueDate,
            status: item.status, // Update this line based on actual data structure
            statusClass: item.statusClass, // Update this line based on actual data structure
            daysRemaining: item.daysRemaining,
        }));
    } catch (error) {
        //console.error('Error fetching assessments:', error); // Log errors
        return []; // Return empty array if the fetch fails
    }
};




export const resultsData = [
    { title: "Start Our Meeting", statusClass: "completed", icon: 'bx bx-check-circle' },
    { title: "Analyse Our Site", statusClass: "completed", icon: 'bx bx-check-circle' },
    { title: "Play Football", statusClass: "not-completed", icon: 'bx bx-x-circle' },
];


