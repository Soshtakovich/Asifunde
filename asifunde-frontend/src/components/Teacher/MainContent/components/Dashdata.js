// Dashdata.js - Providing only data for the dashboard menu
const subjectData = [
    {
        iconClass: 'bx bx-book-content',
        Name: 'Add Assessment',
        label: 'Add a Test or Assignment',
        link: 'Assessments' // Matching the component name in Maincontent.js
    },
    {
        iconClass: 'bx bx-stats',
        Name: 'Check Submissions',
        label: 'Assessments Submitted So Far',
        link: 'Submissions'
    },
    {
        iconClass: 'bx bxs-paste',
        Name: 'Add Subject Material',
        label: 'Notes / Worksheet',
        link: 'Content'
    },
    {
        iconClass: 'bx bxs-speaker',
        Name: 'Send a Message',
        label: 'Make an Announcement',
        link: 'Announcements'
    }
];

export default subjectData; // Just export the data
