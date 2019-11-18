export default class Profile {
  id: string;
  fullName: string;
  gender: String;
  dateOfBirth: String;
  location: String;
  aboutMe: String;
  static async load(id, fullName, gender, dateOfBirth, location, aboutMe) {
    profile = new Profile();
    profile.id = id;
    profile.fullName = fullName;
    profile.gender = gender;
    profile.dateOfBirth = dateOfBirth;
    profile.location = location;
    profile.aboutMe = aboutMe;
    return profile;
  }
}
