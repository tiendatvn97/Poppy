import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";
import Profile from "../models/Profile";
const moment = require("moment");
import uuid4 from "uuid/v4";
export default class EditProfileStore {
  constructor(stores) {
    this.rootStore = stores;
  }

  @observable fullName: ?string = "";
  @observable dateOfBirth: ?string = "";
  @observable gender: ?string = "";
  @observable location: ?string = "";
  @observable aboutMe: ?string = "";
  @observable isLoading: boolean = false;
  @observable isDateTimePickerVisible: boolean = false;

  @action getData() {
    const profile = this.rootStore.userStore.profile;
    this.fullName = profile.fullName;
    this.dateOfBirth = profile.dateOfBirth;
    this.gender = profile.gender;
    this.location = profile.location;
    this.aboutMe = profile.aboutMe;
  }

  @action fullNameOnChange(dateOfBirth: ?string) {
    this.fullName = dateOfBirth;
  }

  @action genderOnChange(dateOfBirth: ?string) {
    this.gender = dateOfBirth;
  }

  @action locationOnChange(dateOfBirth: ?string) {
    this.location = dateOfBirth;
  }

  @action aboutMeOnChange(dateOfBirth: ?string) {
    this.aboutMe = dateOfBirth;
  }

  //date on change
  @action dateOfBirthOnChange(dateOfBirth: ?string) {
    this.dateOfBirth = dateOfBirth;
  }

  @action handleDatePicked(date: any) {
    this.dateOfBirth = moment(date).format("DD/MM/YYYY");
    this.isDateTimePickerVisible = false;
    // this.dateOfBirth = dateOfBirth;
  }

  @action showDateTimePicker() {
    this.isDateTimePickerVisible = true;
  }

  @action hideDateTimePicker() {
    this.isDateTimePickerVisible = false;
  }

  @action isValidDate(): boolean {
    var date = moment(this.dateOfBirth, "DD/MM/YYYY");
    return date.isValid();
  }

  @action async submitProfile(): ?string {
    this.isLoading = true;
    let mess = "";
    if (
      !this.fullName ||
      !this.dateOfBirth ||
      !this.gender ||
      !this.location ||
      !this.aboutMe
    )
      return "All of field is not empty";
    else if (!this.isValidDate()) return "Date is incorrect format";
    else if (this.gender !== "Female" && this.gender !== "Male")
      return "Gender is incorrect format";
    else mess = await this.update();

    return mess;
  }

  @action async update() {
    let mess = "";
    try {
      const profile = await Profile.load(
        this.fullName,
        this.gender,
        this.dateOfBirth,

        this.location,
        this.aboutMe
      );

      updates = {};
      updates[`users/${this.rootStore.userStore.id}/profiles`] = profile;
      await Firebase.database.ref().update(updates);
      await this.rootStore.userStore.setUser();
    } catch (error) {
      mess = error.message;
    }
    return mess;
  }
}
