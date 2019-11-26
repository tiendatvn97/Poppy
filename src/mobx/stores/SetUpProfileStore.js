import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";
import Profile from "../models/Profile";
const moment = require("moment");
import uuid4 from "uuid/v4";
export default class SetUpProfileStore {
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
      const profile = await Profile.load(
        this.fullName,
        this.dateOfBirth,
        this.gender,
        this.location,
        this.aboutMe
      );
      let avatar = null;
      if (this.gender === "Female")
        avatar =
          "https://firebasestorage.googleapis.com/v0/b/poppy-app-2556f.appspot.com/o/avatars%2FimageDefaults%2Ffemale_avatar.jpg?alt=media&token=2f58fb5a-44ca-40c9-b88d-9fb6c9849e67";
      else
        avatar =
          "https://firebasestorage.googleapis.com/v0/b/poppy-app-2556f.appspot.com/o/avatars%2FimageDefaults%2Fmale_avatar.jpg?alt=media&token=0456c44c-7c5b-46a4-98d5-64b47c3f00cd";
      await Firebase.database.ref("users/" + userId).set({
        id: userId,
        email: this.rootStore.registerStore.email,
        avatarImage: avatar,
        follower: [userId],
        following: [userId],
        postId: [],
        chatId: [],
        blockId: [],
        profiles: profile
      });
      await this.rootStore.userStore.setUser();
    } catch (error) {
      mess = error.message;
    }
    return mess;
  }

  @action test() {
    var userId = Firebase.auth.currentUser.uid;
  }
}
