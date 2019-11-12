import {observable, action, computed} from "mobx"

export default class MyProfileStore {
    @observable test: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}