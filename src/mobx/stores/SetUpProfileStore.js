import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";
const moment = require("moment");
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
    this.dateOfBirth = moment(date).format("DD/MM/YYYY");
    this.isDateTimePickerVisible = false;
    // this.dateOfBirth = dateOfBirth;
  }

  @action showDateTimePicker() {
    this.isDateTimePickerVisible = true;
  }

  @action hideDateTimePicker() {
    console.log("hide");
    this.isDateTimePickerVisible = false;
  }

  @action isValidDate(): boolean {
    var date = moment(this.dateOfBirth, "DD/MM/YYYY");
    return date.isValid();
  }

  @action submitProfile(): ?string {
    let mess = "";
    if (
      !this.fullName ||
      !this.dateOfBirth ||
      !this.gender ||
      !this.location ||
      !this.aboutMe
    )
      return "All of field is not empty";
    if (!this.isValidDate()) return "Date is incorrect format";
    if (this.gender !== "Female" && this.gender !== "Male")
      return "Gender is incorrect format";
    return "";
  }

  @action async setProfileUser(userId: ?String) {
    let mess = "";
    try {
      await Firebase.database.ref("users/" + userId).set({
        avataImage: "",
        follower: [],
        following: [],
        postId: [],
        chatId: [],
        blockId: [],
        profileId: userId
      });
      await Firebase.database.ref("profiles/" + userId).set({
        fullName: this.fullName,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        location: this.location,
        aboutMe: this.aboutMe
      });
    } catch (error) {
      mess = error.message;
    }
    return mess;
  }

  @action test(){
    var userId = Firebase.auth.currentUser.uid;
    console.log(`userId${userId}`)
  }
}
