import React from 'react';
import { subjectassessmentsData } from './Assessmnets/assessmentspagedata';

function Submissions({ assessments }) {
    
    const calculateDaysRemaining = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInTime = dueDateObj - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays >= 0 ? differenceInDays : 'Overdue';
    };

    return (
        <div className="assessment-container">
            <div className="assessments-table">
                <div className="header">
                    <h3>Assessments Submissions</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total Mark</th>
                            <th>Days Remaining</th>
                            <th>Submissions</th>
                            <th>Not Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((assessment, index) => {
                            const daysRemaining = calculateDaysRemaining(assessment.dueDate);
                            const isOverdue = daysRemaining === 'Overdue';

                            return (
                                <tr key={index}>
                                    <td>{assessment.name}</td>
                                    <td>{assessment.totalMark}</td>
                                    <td><span className={`days-remaining ${isOverdue ? 'overdue' : ''}`}>{daysRemaining}</span></td>
                                    <td>{assessment.submissions}</td>
                                    <td>{assessment.not_submit}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Displaysubmissions() {

  
    return (
      <>

        <Submissions assessments={subjectassessmentsData} />
      </>
    );
  }
  
  export default Displaysubmissions;