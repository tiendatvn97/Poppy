import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";
export default class SignInStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable email: ?String = "tiendatvn97@gmail.com";
  @observable password: ?String = "123456";
  @observable isLoading: boolean = false;
  @observable isReseting: boolean = false;
  @observable emailForResetPws: ?String;

  @action emailOnChange(email: ?string) {
    this.email = email;
  }
  @action emailForResetPwsOnChange(email: ?string) {
    this.emailForResetPws = email;
  }

  @action passwordOnChange(password: ?string) {
    this.password = password;
  }

  @action async SignIn(): ?string {
    let mess = "";
    this.isLoading = true;
    try {
      await Firebase.auth.signInWithEmailAndPassword(this.email, this.password);
      const user = await Firebase.auth.currentUser;
      if (!user.emailVerified) {
        mess = "Email is not verified";
        await Firebase.auth.signOut();
      } else {
        await this.rootStore.userStore.setUser();
      }
      // Firebase.userInfo.name=this.email;
    } catch (error) {
      mess = error.message;
    }
    this.isLoading = false;
    return mess;
  }

  @action async SignOut() {
    try {
      await Firebase.auth.signOut();
      // Firebase.userInfo.name="";
      // Firebase.userStore.avatar=""
    } catch (e) {
      console.log(e);
    }
  }
  @action resetPassword(email: ?string) {
   
    var auth = Firebase.auth;
    this.isReseting = true;
    auth
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        console.log("reset successfull");
        this.isReseting = false;
      })
      .catch(function(error) {
        // An error happened.
        onsole.log("reset false");
      });
  }
}
