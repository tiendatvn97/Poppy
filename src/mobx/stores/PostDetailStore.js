import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";

export default class PostDetailStore {
  @observable loveList: ?(string[]) = [];
  @observable shareList: ?(string[]) = [];
  @observable commentList: ?(string[]) = [];
  @observable postInfo: ?any = null;
  @observable hostUser: ?(string[]) = [];

  @action clearStore() {
    this.loveList = [];
    this.shareList = [];
    this.commentList = [];
  }

  @action async getUserInfo(id: ?string) {
    let result = null;
    await Firebase.database.ref("users/" + id).once("value", data => {
      result = data.val();
    });

    return result;
  }

  @action initialize() {}
}
