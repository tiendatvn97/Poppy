import {observable, action, computed} from "mobx"

export default class SignInStore {
    @observable test: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}