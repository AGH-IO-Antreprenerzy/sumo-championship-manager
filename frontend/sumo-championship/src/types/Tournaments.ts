export interface GeneralInformation {
  name: string;
  tournamentDate: string;
  location: string;
  registrationDate: string;
  season: string;
}

export const defaultGeneralInformation: GeneralInformation = {
  name: '',
  tournamentDate: '',
  location: '',
  registrationDate: '',
  season: '',
};
