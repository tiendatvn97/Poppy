import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";

export default class NewsFeedStore {
  @observable postSelected: ?String = "";
  @observable listPost: ?(any[]) = [];

  constructor(store) {
    this.rootStore = store;
  }

  @action clearStore() {
    this.postSelected = "";
    this.listPost = [];
  }

  @action async getUserInfo(id: ?string) {
    let result = null;
    await Firebase.database.ref("users/" + id).once("value", data => {
      result = data.val();
    });
    return result;
  }
}
