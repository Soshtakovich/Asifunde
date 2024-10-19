

const LearnerData = {
    name: "Zakes Matsimbe",
    learnerNumber: "BET25-456123",
    grade: 9,
    position: 3,  

    academics: [
      { subject: "Mathematics", assessments: [34, 67, 78, 98, 99], position: 3 },
      { subject: "Physical Sciences", assessments: [77, 75, 45, 79, 89], position: 2 },
      { subject: "BET", assessments: [45, 56, 34, 89, 98], position: 45 },
      { subject: "Computer Skills", assessments: [78, 75, 89, 75, 78], position: 9 },
    ],

    leaderboard: [
        { position: 1, name: "Keketso Mtshiliba", mark: 99 },
        { position: 2, name: "Keketso Leburu", mark: 98 },
        { position: 3, name: "Zakes Matsimbe", mark: 97 },
    ],

    // Function to dynamically get positions from academics
    getPositions() {
      const positions = {};
      this.academics.forEach(subject => {
        const subjectKey = subject.subject.replace(/\s+/g, "_"); // Replace spaces with underscores
        positions[subjectKey] = subject.position;
      });
      return positions;
    },

    // Retrieve the in-class position from the learner's main position
    getInClassPosition() {
      return this.position;
    },
};

export default LearnerData;
