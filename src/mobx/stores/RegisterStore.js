import { observable, action, computed } from "mobx";

import Firebase from "../../firebase/Firebase";
export default class RegisterStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable email: ?String = "dat@gmail.com";
  @observable password: ?String = "123456";
  @observable confirmPassword: ?String = "123456";
  @observable isLoading: boolean = false;

  @action emailOnChange(email: ?string) {
    this.email = email;
  }

  @action passwordOnChange(password: ?string) {
    this.password = password;
  }

  @action confirmPasswordOnChange(confirmPassword: ?string) {
    this.confirmPassword = confirmPassword;
  }

  @action validEmail(): boolean {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;
    if (re.test(this.email)) return true;
    else return false;
  }

  @action validate(): ?string {
    this.isLoading = true;
    let mess = "";
    if (!this.validEmail()) mess = "Email is invalid \n";
    else if (!this.password || this.password.length < 6)
      mess = mess + "Password is not empty and more than 6 character \n";
    else if (this.password !== this.confirmPassword)
      mess = mess + "Password is not matched";
    return mess;
  }

  @action async register(): ?string {
    let mess = "";
    try {
      await Firebase.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
    } catch (error) {
      mess = error.message;
    }
    return mess;
  }
}
