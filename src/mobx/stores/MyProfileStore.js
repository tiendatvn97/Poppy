import { observable, action, computed } from "mobx";
import uuid4 from "uuid/v4";
import Firebase from "../../firebase/Firebase";

export default class MyProfileStore {
  @observable avatar: ?any = null;
  constructor(store) {
    this.rootStore = store;
  }

  @action changeAvatar() {}
  @action clearStore() {
    this.avatar = null;
  }

  @action
  async uploadAvatar(avatar: ?any) {
    if (avatar) {
      const fileExtention = avatar.uri.split(".").pop();
      var uuid = uuid4();
      const fileName = `${uuid}.${fileExtention}`;
      const response = await fetch(avatar.uri);
      const blob = await response.blob();
      var storageRef = Firebase.storage.ref(`avatars/images/${fileName}`);
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
            await this.pushUrlAvatar(downloadUrl);
          });
        }
      );
    }
  }

  @action async pushUrlAvatar(urlImage: ?string) {
    updates = {};
    updates[`users/${this.rootStore.userStore.id}/avatarImage`] = urlImage;
    await Firebase.database.ref().update(updates);
    this.rootStore.userStore.avatarImage = urlImage;
  }
}
