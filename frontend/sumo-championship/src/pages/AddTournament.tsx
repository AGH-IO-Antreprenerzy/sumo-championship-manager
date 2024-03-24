import React, { useState } from 'react';
import './../styles/Pages.css';
import GeneralTrounamentInformation from '../components/organisms/AddTournamentForms/GeneralTrounamentInformation';
import { GeneralInformation, defaultGeneralInformation } from '../types/Tournaments';

const AddTournament = () => {

    const [generalInformation, setGeneralInformation] = useState<GeneralInformation>(defaultGeneralInformation);

    return (
        <div className='page'>
            <GeneralTrounamentInformation
                values={generalInformation}
                changeValues={setGeneralInformation}
            />
        </div>
    );
};

export default AddTournament;