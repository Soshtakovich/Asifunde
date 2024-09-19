const LearnerData = {
    name: "Zakes Matsimbe",
    learnerNumber: "BET25-451236",
    grade: 8,
    position: 3,  // This is the overall class position, previously called `inClassPosition`

    academics: [
      { subject: "Mathematics", assessments: [34, 67, 78, 98, 99], position: 3 },
      { subject: "Physical Sciences", assessments: [77, 75, 45, 79, 89], position: 2 },
      { subject: "BET", assessments: [45, 56, 34, 89, 98], position: 45 },
      { subject: "Computer Skills", assessments: [78, 75, 89, 75, 78], position: 9 },
    ],
    attendance: {
      firstHalf: [95, 100, 100, 76, 98],
      secondHalf: [23, 65, 45, 50, 100],
    },
    leaderboard: [
        { position: 1, name: "Keketso Mtshiliba", mark: 99 },
        { position: 2, name: "Keketso Leburu", mark: 98 },
        { position: 3, name: "Zakes Matsimbe", mark: 97 },
        { position: 4, name: "Rethabile Nomane", mark: 94 },
        { position: 5, name: "Kefilwe Pieterson", mark: 91 },
        { position: 6, name: "Lindokuhle Ndlovu", mark: 89 },
        { position: 7, name: "Ntombikayise Sambata", mark: 89 },
        { position: 8, name: "Mbali Elizabeth Pike", mark: 88 },
        { position: 9, name: "Oarabile Sekubute", mark: 86 },
        { position: 10, name: "Akhona Siketi", mark: 81 },
        { position: 11, name: "Zanele Mkhize", mark: 80 },
        { position: 12, name: "Atlegang Serobatse", mark: 79 },
        { position: 13, name: "Tumelo Inguane", mark: 78 },
        { position: 14, name: "Ntiyiso Sasha Mabunda", mark: 78 },
        { position: 15, name: "Nthabiseng Alice Masoabi", mark: 76 },
        { position: 16, name: "Thabang Mabunda", mark: 75 },
        { position: 17, name: "Sfiso Vusi Mthembu", mark: 72 },
        { position: 18, name: "Elton Lewane", mark: 68 },
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
