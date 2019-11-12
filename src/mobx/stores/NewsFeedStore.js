import {observable, action, computed} from "mobx"

export default class NewsFeedStore {
    @observable test: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}