export default class Profile {
  fullName: string;
  gender: String;
  dateOfBirth: String;
  location: String;
  aboutMe: String;
  static async load( fullName, gender, dateOfBirth, location, aboutMe) {
    profile = new Profile();
    profile.fullName = fullName;
    profile.gender = gender;
    profile.dateOfBirth = dateOfBirth;
    profile.location = location;
    profile.aboutMe = aboutMe;
    return profile;
  }
}
