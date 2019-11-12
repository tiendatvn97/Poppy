import {observable, action, computed} from "mobx"

import Firebase from "../../firebase/Firebase"
export default class SignInStore {
    @observable email: ?String = "";
    @observable password: ?String = "";

    @action emailOnChange(email: ?string) {
        this.email = email;
    }

    @action passwordOnChange(password: ?string) {
        this.password = password;
    }

    @action SignIn(){
        this.email = "bcd"
    }
}