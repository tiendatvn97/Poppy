import { observable, computed, action } from "mobx";
import Firebase from "../../firebase/Firebase";
import Profile from "../models/Profile";
import User from "../models/User";

export default class UserStore {
  @observable id: ?string = "u6xWTSoxmVVxsfGmhfqegbATryP2";
  @observable avataImage: ?string = "";
  @observable follower: ?(string[]) = [];
  @observable following: ?(string[]) = [];
  @observable postId: ?(string[]) = [];
  @observable chatId: ?(string[]) = [];
  @observable blockId: ?(string[]) = [];
  @observable profile: ?Profile = {
    aboutMe: "a",
    dateOfBirth: "08/11/2019",
    fullName: "3aRqo3BmeXYrkix8P9CILdTOwk43",
    gender: "dat",
    location: "Male"
  };

  @observable recentChats: ?(any[]) = [];
  @observable listUser: ?User = [];

  @action
  async setUser() {
    this.clearStore();
    const user = await Firebase.auth.currentUser;
    this.id = user.uid;
    await this.getAllUser();
    await this.getRecentChats();
    // console.log(`listUser: ${JSON.stringify(this.listUser)}`);
    // console.log(`RECENTchats: ${JSON.stringify(this.recentChats)}`);

    await Firebase.database
      .ref("/users/" + user.uid)
      .once("value", async snapshot => {
        this.id = user.uid;
        this.avataImage = snapshot.val().avataImage;
        this.follower = snapshot.val().follower;
        this.following = snapshot.val().following;
        this.postId = snapshot.val().postId;
        this.chatId = snapshot.val().chatId;
        this.blockId = snapshot.val().blockId;
      });

    // await Firebase.database
    //   .ref("/profiles/Nj5FRPnZrUWrydJaLr9uQIj1pFf2")
    //   .once("value", snapshot => {
    //     if (snapshot.val()) {
    //       this.id = user.uid;
    //       const profileObj = new Profile();
    //       profileObj.id = snapshot.val().id;
    //       profileObj.fullName = snapshot.val().fullName;
    //       profileObj.gender = snapshot.val().gender;
    //       profileObj.dateOfBirth = snapshot.val().dateOfBirth;
    //       profileObj.location = snapshot.val().location;
    //       profileObj.aboutMe = snapshot.val().aboutMe;
    //       this.profile = profileObj;
    //     }
    //   });
  }

  @action
  clearStore() {
    this.id = "";
    this.avataImage = "";
    this.follower = [];
    this.following = [];
    this.postId = [];
    this.chatId = [];
    this.blockId = [];
    this.profile = null;
    this.recentChats=[
    ];
    this.listUser=[];
  }

  @action async getAllUser() {
    dbUSer = await Firebase.database
      .ref("users")
      .once("value", snapshotUser => {
        snapshotUser.forEach(user => {
          this.listUser.push(user.val());
        });
      });
  }

  @action async getRecentChats() {
    this.recentChats = [];
    await Firebase.database
      .ref("messages/" + this.id)
      .once("value", snapshot => {
        if (snapshot.val()) this.recentChats.push(snapshot.val());
      });
  }

