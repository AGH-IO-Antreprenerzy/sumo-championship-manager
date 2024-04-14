import React, { useEffect, useState } from 'react';
import './../../../styles/Organisms.css';
import { getAllSeasons } from '../../../api/season';
import TextField from '../../molecules/TextField';
import {
  GeneralInformation,
  GeneralInformationError,
} from '../../../types/Tournaments';
import SelectField from '../../molecules/SelectField';
import ValueField from '../../molecules/ValueField';
import { getAllCountries } from '../../../api/country';

interface props {
  values: GeneralInformation;
  errors: GeneralInformationError;
  changeValues: React.Dispatch<React.SetStateAction<GeneralInformation>>;
  defaultSeason?: string;
}

const GeneralTrounamentInformation: React.FC<props> = ({
  values,
  errors,
  changeValues,
  defaultSeason,
}) => {
  const [allCountries, setAllCountries] = useState<string[]>([])
  const [seasonNames, setSeasonNames] = useState<string[]>([]);

  useEffect(() => {
    const getSeasonNames = async () => {
      const seasons = await getAllSeasons();
      const names = seasons.seasonDtoList.map((s) => s.name);

      if (defaultSeason && names.includes(defaultSeason)) {
        changeValues((prev) => ({ ...prev, seasonName: defaultSeason }));
        setSeasonNames([defaultSeason]);
      } else {
        setSeasonNames(names);
      }
    };

    getSeasonNames();
    getAllCountries()
    .then(setAllCountries)
  }, [changeValues, defaultSeason]);

  return (
    <div className="addTournamentInformationBox">
      <h1>General Information</h1>
      <TextField
        label="Name"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, name: e.target.value }))
        }
        value={values.name}
        type="text"
        errorMessage={errors.name}
      />
      <TextField
        label="Start of contest"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, contestStart: e.target.value }))
        }
        value={values.contestStart}
        type="date"
        errorMessage={errors.contestStart}
      />
      <TextField
        label="End of contest"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, contestEnd: e.target.value }))
        }
        value={values.contestEnd}
        type="date"
        errorMessage={errors.contestEnd}
      />
      <SelectField
        name="Country"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, country: e.target.value }))
        }
        options={allCountries}
        value={values.country}
        errorMessage={errors.country}
      />
      <TextField
        label="City"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, city: e.target.value }))
        }
        value={values.city}
        errorMessage={errors.city}
      />
      <TextField
        label="Street"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, street: e.target.value }))
        }
        value={values.street}
        errorMessage={errors.street}
      />
      <ValueField
        label="Street number"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, nr: +e.target.value }))
        }
        value={values.nr ?? 0}
      />
      <TextField
        label="Start of registration"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, registerStart: e.target.value }))
        }
        value={values.registerStart}
        type="date"
        errorMessage={errors.registerStart}
      />
      <TextField
        label="End of registration"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, registerEnd: e.target.value }))
        }
        value={values.registerEnd}
        type="date"
        errorMessage={errors.registerEnd}
      />
      <SelectField
        name="Season"
        onChange={(e) =>
          changeValues((prev) => ({ ...prev, seasonName: e.target.value }))
        }
        options={seasonNames}
        value={values.seasonName}
        placeholder='Select season'
      />
    </div>
  );
};

export default GeneralTrounamentInformation;
