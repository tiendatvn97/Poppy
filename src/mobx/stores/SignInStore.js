import { observable, action, computed } from "mobx";

import Firebase from "../../firebase/Firebase";
export default class SignInStore {
  @observable email: ?String = "dat@gmail.com";
  @observable password: ?String = "123456";
  @observable isLoading: boolean = false;

  @action emailOnChange(email: ?string) {
    this.email = email;
  }

  @action passwordOnChange(password: ?string) {
    this.password = password;
  }

  @action async SignIn(): ?string {
    let mess = "";
    this.isLoading = true;
    try {
      await Firebase.auth.signInWithEmailAndPassword(this.email, this.password);
      Firebase.userInfo.name=this.email;
    } catch (error) {
      mess = error.message;
    }
    this.isLoading = false;
    return mess;
  }

  @action async SignOut() {
      console.log("signOUt")
    try {
        await Firebase.auth.signOut();
        Firebase.userInfo.name="";
    } catch (e) {
        console.log(e);
    }
  }
}
