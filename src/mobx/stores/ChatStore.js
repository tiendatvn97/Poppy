import {observable, action, computed} from "mobx"

export default class ChatStore {
    @observable user: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}