import React, { useEffect, useState } from 'react';
import TextField from '../../molecules/TextField';
import { Role } from '../../../api/login';
import { getAllCountries } from '../../../api/country';
import SelectField from '../../molecules/SelectField';
import { getClubs } from '../../../api/club';
import { addTrainer } from '../../../api/trainer';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/allRoutes';
import Button from '../../Atoms/Button';
import "./addTrainerForm.css"

const AddTrainerForm = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [role, setRole] = useState<Role | null>(null)
    const [club, setClub] = useState("")

    const [nameError, setNameError] = useState("");
    const [lastnameError, setLastnameError] = useState("")
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [countryError, setCountryError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [clubError, setClubError] = useState("");

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

    const checkForEmail = (): boolean => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
        if (email === '') {
          setEmailError("You need to provide an email")
          return false;
        } else if (!regex.test(email)) {
            setEmailError("Provide a valid email")
          return false;
        } else {
          return true;
        }
      };

    const handleErrors = () => {
        setNameError("")
        setLastnameError("")
        setPasswordError("")
        setEmailError("")
        setCountryError("")
        setRoleError("")
        setClubError("")

        let isValid = true;

        if (name === ""){
            setNameError("You need to provide a name")
            isValid = false
        }

        if (lastname === ""){
            setLastnameError("You need to provide a lastname")
            isValid = false
        }

        if (password === ""){
            setPasswordError("You need to provide a password")
            isValid = false
        }

        isValid = checkForEmail();

        if (country === ""){
            setCountryError("You need to choose a country")
            isValid = false
        }

        if (role === null){
            setRoleError("You need to provide a role")
            isValid = false
        }

        if (role === Role.Club && club === ""){
            setClubError("You need to provide a club")
            isValid = false
        }

        if (role === Role.National){
            setClub("")
        }

        return isValid
    }

    const handleSubmit = async () => {
        const isValid = handleErrors()

        if (isValid){
            const body = {
                name,
                lastname,
                password,
                email,
                country,
                role: role as Role,
                club
            }
            try{
                await addTrainer(body)
                navigate(ROUTES.HOME) //change it probably to sth else
            }
            catch(ex: unknown){
                if (ex instanceof Error)
                alert(ex.message)
            }
        }
    }

    return (
        <div className='form' style={{width: 500}}>
            <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                errorMessage={nameError}
            />
            <TextField
                label='Lastname'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                errorMessage={lastnameError}
            />
            <TextField
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={passwordError}
            />
            <TextField
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={emailError}
            />
            <SelectField
                name='Country'
                onChange={(e) => {
                    setCountry(e.target.value)
                    setClub("")
                }}
                options={allCountries}
                errorMessage={countryError}
                value={country}
                placeholder='Select Country'
            />
            <SelectField name='Role'
                onChange={e => setRole(e.target.value as Role)}
                options={[
                    Role.Club,
                    Role.National
                ]}
                errorMessage={roleError}
                value={role ?? ""}
                placeholder='Select Role'
            />
            { role === Role.Club && <SelectField
                name='Club'
                onChange={e => setClub(e.target.value)}
                options={clubsPerCountry}
                errorMessage={clubError}
                value={club}
            />}
            <Button
                name='Add trainer'
                onClick={handleSubmit}
            />
        </div>
    );

    
};

export default AddTrainerForm;