import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";
import uuid4 from "uuid/v4";
export default class CreatePostStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable caption: ?String = "";
  @observable peopleTag: ?(String[]) = [];
  @observable location: ?string = "";
  @observable image: ?any = null;
  @observable isPost: boolean = false;
  @observable isSave: boolean = false;

  @action
  clearStore() {
    this.caption = "";
    this.peopleTag = [];
    this.location = "";
    this.image = null;
  }

  @action
  captionOnChange(caption: ?string) {
    this.caption = caption;
  }
  @action
  peopleTagOnChange(peopleTag: ?string) {
    this.peopleTag = peopleTag;
  }
  @action
  locationOnChange(location: ?string) {
    this.location = location;
  }

  @action
  async createPost() {
    if (this.image) {
      const fileExtention = this.image.uri.split(".").pop();
      console.log(`EXT: ${fileExtention}`);

      var uuid = uuid4();
      const fileName = `${uuid}.${fileExtention}`;
      const response = await fetch(this.image.uri);
      const blob = await response.blob();
      console.log("blob")
      var storageRef = Firebase.storage.ref(`posts/image/${fileName}`);
      console.log("storageRef")
      storageRef.put(blob).on(
        Firebase.firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot:" + snapshot.state);
          console.log(
            "progress:" +
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
            await this.addPost(downloadUrl);
          });
        }
      );
    }
  }

  @action async addPost(urlImage: ?string) {
    this.isPost = true;
    const postId = Firebase.database
      .ref("postGroup/postByUser")
      .child(this.rootStore.userStore.id)
      .push().key;
    var postData = {
      postId: postId,
      userId: this.rootStore.userStore.id,
      image: urlImage,
      timeEdit: Firebase.firebase.database.ServerValue.TIMESTAMP,
      timeCreate: Firebase.firebase.database.ServerValue.TIMESTAMP,
      content: this.caption,
      tag: this.peopleTag,
      location: this.location,
      loves: [],
      shares: []
    };

    // const postStatus = {
    //   published: postData.timeEdit
    // }

    updates = {};
    updates[
      "postGroup/postByUser/" + this.rootStore.userStore.id + "/" + postId
    ] = postData;
    updates["postGroup/postList/" + postId + "/published" ] =
      postData.timeEdit;
    await Firebase.database.ref().update(updates);
    this.isPost = false;
  }
}
