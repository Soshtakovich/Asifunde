import React from 'react';
//import Dashinsights from '../small-components/Insightsdata';
import Displayassessments from '../small-components/Assessmentsall';
import '../../CSS/Main-small-components-css/Dash.css'

function Dashboard()
{
    return(
        <>
            {/*  <Dashinsights/>   */}
            <Displayassessments/>
        </>

    );
}

export default Dashboard;