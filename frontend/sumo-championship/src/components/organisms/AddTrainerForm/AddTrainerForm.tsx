import React, { useEffect, useState } from 'react';
import TextField from '../../molecules/TextField';
import { Role } from '../../../api/login';
import { getAllCountries } from '../../../api/country';
import SelectField from '../../molecules/SelectField';
import { getClubs } from '../../../api/club';

const AddTrainerForm = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [role, setRole] = useState<Role | null>(null)
    const [club, setClub] = useState("")

    const [allCountries, setAllCountries] = useState<string[]>([])
    const [clubsPerCountry, setClubsPerCountry] = useState<string[]>([])

    useEffect(() => {
        if (allCountries.length === 0){
            getAllCountries()
            .then(setAllCountries)
        }

        getClubs(country)
        .then(setClubsPerCountry)
        
    }, [country, allCountries.length])

    return (
        <div className='form' style={{width: 500}}>
            <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <SelectField
                name='Country'
                onChange={(e) => setCountry(e.target.value)}
                options={allCountries}
                defaultOption=''
            />
            <SelectField
                name='Role'
                onChange={e => setRole(e.target.value as Role)}
                options={[
                    Role.Club,
                    Role.National
                ]}
                defaultOption=''
            />
            { role === Role.Club && <SelectField
                name='Club'
                onChange={e => setClub(e.target.value)}
                options={clubsPerCountry}
                defaultOption=''
            />}
        </div>
    );
};

export default AddTrainerForm;