import { observable, computed, action } from "mobx";
import Firebase from "../../firebase/Firebase";
import Profile from "../models/Profile";
import User from "../models/User";

export default class UserStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable id: ?string = "";
  @observable avatarImage: ?string = "";
  @observable email: ?string = "";
  @observable follower: ?(string[]) = [];
  @observable following: ?(string[]) = [];
  @observable postId: ?(string[]) = [];
  @observable chatId: ?(string[]) = [];
  @observable blockId: ?(string[]) = [];
  @observable profile: ?Profile = null;

  @observable recentChats: ?(any[]) = [];
  @observable listUser: ?User = [];
  @computed
  get getAvatar() {
    return this.avatarImage;
  }

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
        // Firebase.userInfo = snapshot.val().profiles.fullName;
        // Firebase.avatar = snapshot.val().avatarImage;
        this.id = user.uid;
        this.avatarImage = snapshot.val().avatarImage;
        this.email = snapshot.val().email;
        this.follower = snapshot.val().follower;
        this.following = snapshot.val().following;
        this.postId = snapshot.val().postId;
        this.chatId = snapshot.val().chatId;
        this.blockId = snapshot.val().blockId;
        this.profile = snapshot.val().profiles;
      });
  }

  @action
  clearStore() {
    this.id = "";
    this.avatarImage = "";
    this.email = "";
    this.follower = [];
    this.following = [];
    this.postId = [];
    this.chatId = [];
    this.blockId = [];
    this.profile = null;
    this.recentChats = [];
    this.listUser = [];
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
  @action pluralCheck(s: ?number) {
    if (s == 1) {
      return " ago";
    } else {
      return "s ago";
    }
  }

  @action
  timeCoverter = timestamp => {
    var date = new Date(timestamp);
    var seconds = Math.floor((new Date() - date)/1000 );
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " year" + this.pluralCheck(interval);
    }
    var interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " month" + this.pluralCheck(interval);
    }
    var interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " day" + this.pluralCheck(interval);
    }
    var interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hour" + this.pluralCheck(interval);
    }
    var interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minute" + this.pluralCheck(interval);
    }
    return Math.floor(seconds) + " second" + this.pluralCheck(interval);
  };
}
