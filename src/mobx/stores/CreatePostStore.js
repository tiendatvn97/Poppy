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
    // console.log("url image: " + JSON.stringify(this.image.base64));
    if (this.image) {
      const fileExtention = this.image.uri.split(".").pop();
      console.log(`EXT: ${fileExtention}`);

      var uuid = uuid4();
      const fileName = `${uuid}.${fileExtention}`;
      const response = await fetch(this.image.uri);
      const blob = await response.blob();
      var storageRef = Firebase.storage.ref(`posts/image/${fileName}`);

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
          storageRef.getDownloadURL().then(downloadUrl => {
            console.log("File avalable at: " + downloadUrl);
            this.addPost(downloadUrl);
          });
        }
      );
    }
  }

  @action async addPost(urlImage: ?string) {
    const postId = Firebase.database
      .ref("posts")
      .child(this.rootStore.userStore.id)
      .push().key;
    var postData = {
      uid: postId,
      image: urlImage,
      time: Firebase.firebase.database.ServerValue.TIMESTAMP,
      content: this.caption,
      tag: this.peopleTag,
      location: this.location
    };

    updates = {};
    updates["posts/" + this.rootStore.userStore.id + "/" + postId] = postData;
    await Firebase.database.ref().update(updates);
  }
}
