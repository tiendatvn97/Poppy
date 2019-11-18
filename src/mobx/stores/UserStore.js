import { observable, computed, action } from "mobx";
import Firebase from "../../firebase/Firebase";
import Profile from "../models/Profile";
import User from "../models/User";

export default class UserStore {
  @observable id: ?string = "";
  @observable avataImage: ?string = "";
  @observable follower: ?(string[]) = [];
  @observable following: ?(string[]) = [];
  @observable postId: ?(string[]) = [];
  @observable chatId: ?(string[]) = [];
  @observable blockId: ?(string[]) = [];
  @observable profile: ?Profile = null;

  @observable listUser: ?User = [];

  @action
  async setUser() {
    this.clearStore();
    const user = await Firebase.auth.currentUser;
    await Firebase.database
      .ref("/profiles/Nj5FRPnZrUWrydJaLr9uQIj1pFf2")
      .once("value", snapshot => {
        if (snapshot.val()) {
          this.id = user.uid;
          const profileObj = new Profile();
          profileObj.id = snapshot.val().id;
          profileObj.fullName = snapshot.val().fullName;
          profileObj.gender = snapshot.val().gender;
          profileObj.dateOfBirth = snapshot.val().dateOfBirth;
          profileObj.location = snapshot.val().location;
          profileObj.aboutMe = snapshot.val().aboutMe;
          this.profile = profileObj;
        }
      });
  }
  @action
  clearStore() {
    console.log("setUSer");
    this.getAllUser();
    this.id = "";
    this.avataImage = "";
    this.follower = [];
    this.following = [];
    this.postId = [];
    this.chatId = [];
    this.blockId = [];
    this.profile = null;
  }

  @action async getAllUser() {
    dbUSer = Firebase.database
      .ref("users")
      .once("value", async snapshotUser => {
        snapshotUser.forEach(async user => {
          let profileObbj = null;
          Firebase.database
            .ref("profiles/" + user.key)
            .once("value", async profile => {
              if (profile.val()) {
                profileObbj = await Profile.load(
                  profile.key,
                  profile.val().fullName,
                  profile.val().gender,
                  profile.val().dateOfBirth,
                  profile.val().location,
                  profile.val().aboutMe
                );
              }
            });
          const userInstant = await User.load(
            user.key,
            user.val().avataImage || "",
            user.val().follower || [],
            user.val().following || [],
            user.val().postId || [],
            user.val().chatId || [],
            user.val().blockId || [],
            profileObbj
          );
          this.listUser.push(userInstant);
        });
      });
    await console.log(`LIST: ${JSON.stringify(this.listUser)}`);
  }
}
