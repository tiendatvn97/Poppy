import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";

export default class PostDetailStore {
  @observable loveList: ?(string[]) = [];
  @observable shareList: ?(string[]) = [];
  @observable commentList: ?(string[]) = [];
  @observable postInfo: ?any = null;
  @observable hostUser: ?(string[]) = [];
  @observable commentContent: ?string = "";

  constructor(store) {
    this.rootStore = store;
  }

  @action clearStore() {
    this.loveList = [];
    this.shareList = [];
    this.commentList = [];
  }

  @action async getUserInfo(id: ?string) {
    let result = null;
    ("");
    await Firebase.database.ref("users/" + id).once("value", data => {
      result = data.val();
    });

    return result;
  }

  @action initialize() {}

  @action pluralCheck(s: ?number) {
    if (s == 1) {
      return " ago";
    } else {
      return "s ago";
    }
  }

  @action
  timeConverter = timestamp => {
    var date = new Date(timestamp);
    var seconds = Math.floor((new Date() - date) / 1000);
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

  @action
  commentContentOnChange(commentContent: ?string) {
    this.commentContent = commentContent;
  }
  @action updateComment() {
    console.log("den day r")

    if (!this.commentContent.trim(" ")) return;
    console.log("den day r")
    commentId = Firebase.database.ref(`comments/${this.postInfo.postId}`).push()
      .key;
      console.log("commentId" + commentId)
    updates = {};
    const comment = {
      userId: this.rootStore.userStore.id,
      commentId: commentId,
      timeCreate: Firebase.firebase.database.ServerValue.TIMESTAMP,
      timeEdit: Firebase.firebase.database.ServerValue.TIMESTAMP,
      content: this.commentContent
    };

    updates[`comments/${this.postInfo.postId}/${commentId}`] = comment;
    Firebase.database.ref().update(updates);
    this.commentContent = ""
  }
}
