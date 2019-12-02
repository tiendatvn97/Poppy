import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";
export default class ThirdProfileStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable hostId: ?String = "";
  @observable thirdUser: ?any = null;
  @observable following: ?(string[]) = [];
  @observable follower: ?(string[]) = [];
  @observable isFollow: boolean = false;
  @observable indexOfFollow: ?number = null;
  @action refresh() {
    this.follower = this.thirdUser.follower;
    this.following = this.rootStore.userStore.following;
    const index = this.rootStore.userStore.following.indexOf(
      `${this.thirdUser.id}`
    );
    if (index === -1) {
      this.isFollow = true;
    } else {
      this.isFollow = false;
    }
  }
  @action followAction() {
    this.rootStore.userStore.following.push(this.thirdUser.id);
    this.follower.push(this.rootStore.userStore.id);
    this.isFollow = false;
    this.update();
  }
  @action update() {
    updates = {};
    updates[`users/${this.rootStore.userStore.id}/following`] = this.following;
    updates[`users/${this.thirdUser.id}/follower`] = this.follower;
    try {
      Firebase.database.ref().update(updates);
    } catch (e) {}
  }

  @action unFollowAction() {
    const indexFollowing = this.rootStore.userStore.following.indexOf(
      `${this.thirdUser.id}`
    );
    const indexFollower = this.follower.indexOf(
      `${this.rootStore.userStore.id}`
    );
    if (indexFollower !== -1) {
      this.follower.splice(indexFollower, 1);
    }
    if (indexFollowing === -1) {
      this.isFollow = true;
    } else {
      this.rootStore.userStore.following.splice(indexFollowing, 1);
      this.isFollow = true;
    }
    this.update();
  }
}
