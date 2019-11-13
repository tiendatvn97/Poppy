import { observable, action, computed } from "mobx";
const moment = require('moment')
export default class SetUpProfileStore {
  @observable fullName: ?string = "";
  @observable dateOfBirth: ?string = "";
  @observable gender: ?string = "";
  @observable location: ?string = "";
  @observable aboutMe: ?string = "";
  @observable isLoading: boolean = false;
  @observable isDateTimePickerVisible: boolean = false;
  
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
    this.dateOfBirth = moment(date).format('DD/MM/YYYY');
    this.isDateTimePickerVisible = false;
    // this.dateOfBirth = dateOfBirth;
  }

  @action showDateTimePicker() {
    this.isDateTimePickerVisible = true;
  }

  @action hideDateTimePicker() {
    console.log("hide")
    this.isDateTimePickerVisible = false;
  }

  


}
