import {observable, action, computed} from "mobx"

export default class RegisterStore {
    @observable test: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}