import {observable, action, computed} from "mobx"

export default class CreatePostStore {
    @observable test: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}