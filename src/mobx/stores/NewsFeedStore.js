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

  @action
  @action
  async getUserInfo(id: ?string) {
    let result = null;
    await Firebase.database.ref("users/" + id).once("value", data => {
      result = data.val();
    });
    return result;
  }

  @action updateToFirebase(
    authPost: ?String,
    postId: ?String,
    loves: ?(any[])
  ) {
    updates = {};
    updates[`postGroup/postByUser/${authPost}/${postId}/loves`] = loves;
    try {
      Firebase.database.ref().update(updates);
    } catch (error) {
      console.log("update love state error: " + error.message);
    }
  }
  @action unLoveAction(postInfo: ?any) {
    if (postInfo) {
      let loves = postInfo.loves || [];
      const index = loves.indexOf(this.rootStore.userStore.id);
      if (index !== -1) {
        loves.splice(index, 1);
        this.updateToFirebase(postInfo.userId, postInfo.postId, loves);
      }
    }
  }

  @action loveAction(postInfo: ?any) {
    if (postInfo) {
      let loves = postInfo.loves || [];

      if (!loves.includes(this.rootStore.userStore.id)) {
        loves.push(this.rootStore.userStore.id);
        this.updateToFirebase(postInfo.userId, postInfo.postId, loves);
      }
    }
  }
}
