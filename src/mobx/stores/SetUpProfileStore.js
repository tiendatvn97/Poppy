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

  @action
  async upLoadAvatar() {
    console.log("upload");
    // console.log("url image: " + JSON.stringify(this.image.base64));

    var uuid = uuid4();
    const fileName = `${uuid}.jpg}`;
    const res = await fetch("../../../src/images/female_avatar.jpg")
    const blob =res.blob();

    console.log("blob");
    // const blob = await response.blob();
    console.log("blob => " + blob);
    var storageRef = Firebase.storage.ref(`posts/image/${fileName}`);

    storageRef.put(blob).on(
      Firebase.firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log("snapshot:" + snapshot.state);
        console.log(
          "progress:" + (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (snapshot.state === Firebase.firebase.storage.TaskState.SUCCESS) {
          console.log("success");
        }
      },
      error => {
        console.log("error: " + error.toString());
      },
      () => {
        storageRef.getDownloadURL().then(async downloadUrl => {
          console.log("File avalable at: " + downloadUrl);
          // await this.addPost(downloadUrl);
        });
      }
    );
  }

  @action async setProfileUser(userId: ?String) {
    let mess = "";
    try {
      await this.upLoadAvatar();
      const profile = await Profile.load(
        this.fullName,
        this.dateOfBirth,
        this.gender,
        this.location,
        this.aboutMe
      );
      await Firebase.database.ref("users/" + userId).set({
        id: userId,
        email: this.rootStore.registerStore.email,
        avataImage: "",
        follower: [],
        following: [],
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
