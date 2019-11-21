import {observable, action, computed} from "mobx"

export default class NewsFeedStore {
    constructor(store) {
        this.rootStore = store;
      }
    
    @observable test: ?String = "";
    
    @action setState(){
        console.log("set state")
    }
}