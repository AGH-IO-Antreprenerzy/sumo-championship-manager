import React, { useEffect, useState } from 'react';
import Button from '../Atoms/Button';
import { Gender } from '../../types/Seasons';
import { Club } from '../../types/Club';
import TextField from './TextField';
import SelectField from './SelectField';
import RadioButton from '../Atoms/RadioButton';
import { Champion } from '../../types/Champion';

type props = {
  onSubmit?: (champion: Champion) => void;
  onEditSave?: (champion: Champion) => void;
  clubs?: Club[];
  editedChampion?: Champion | null;
};

const AddChampionForm: React.FC<props> = ({
  clubs,
  onSubmit,
  editedChampion = null,
  onEditSave,
}) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [birthday, setBirthday] = useState('');
  const [club, setClub] = useState<Club | null>(null);
  const isEdited = !!editedChampion;

  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!firstname) {
      setErrorMessage('First name is required');
    } else if (!lastname) {
      setErrorMessage('Last name is required');
    } else if (!gender) {
      setErrorMessage('Please set gender');
    } else if (!birthday) {
      setErrorMessage('Please set birthdate');
    } else if (!club) {
      setErrorMessage('Please set club');
    } else {
      setErrorMessage('');
      return true;
    }
    return false;
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setGender(null);
    setBirthday('');
    setClub(null);
  };

  const handleSubmit = () => {
    if (validateForm() && gender && onSubmit) {
      onSubmit({
        firstname,
        lastname,
        gender,
        birthday,
        clubId: club?.id ?? 0,
        clubName: club?.name,
      } as Champion);
      resetForm();
    }
  };

  const handleEdit = () => {
    if (validateForm() && gender && onEditSave) {
      onEditSave({
        firstname,
        lastname,
        gender,
        birthday,
        clubId: club?.id ?? 0,
        clubName: club?.name,
      } as Champion);
      resetForm();
    }
  };

  useEffect(() => {
    if (editedChampion) {
      setFirstName(editedChampion.firstname);
      setLastName(editedChampion.lastname);
      setGender(editedChampion.gender);
      setBirthday(editedChampion.birthday);
      setClub(clubs?.find((club) => club.id === editedChampion.clubId) ?? null);
    }
  }, [clubs, editedChampion]);

  return (
    <div className="addChampionForm">
      <TextField
        label="Firstname"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Lastname"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
      />

      <div className="gender">
        <p className="heading">Gender:</p>
        <div className="checkboxes">
          <RadioButton
            onChange={(e) => e.target.value === 'on' && setGender('FEMALE')}
            label="Female"
            name="gender"
            checked={gender === 'FEMALE'}
          />
          <RadioButton
            onChange={(e) => e?.target.value === 'on' && setGender('MALE')}
            label="Male"
            name="gender"
            checked={gender === 'MALE'}
          />
        </div>
      </div>

      <TextField
        type="date"
        label="Birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />

      <SelectField
        options={clubs?.map((club) => club.name) ?? []}
        value={club?.name ?? ''}
        name="Club"
        onChange={(e) => {
          const selectedClub = clubs?.find(
            (club) => club.name === e.target.value,
          );
          if (!selectedClub) return;
          setClub(selectedClub);
        }}
      />
      <p className="error mb10">{errorMessage}</p>

      <Button
        name={isEdited ? 'Save' : 'Add Champion'}
        onClick={isEdited ? handleEdit : handleSubmit}
      />
    </div>
  );
};

export default AddChampionForm;
