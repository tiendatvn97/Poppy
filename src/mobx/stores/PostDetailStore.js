import {observable, action, computed} from "mobx"

export default class PostDetailStore {
    @observable test: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}