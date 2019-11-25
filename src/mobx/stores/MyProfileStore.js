import {observable, action, computed} from "mobx"

export default class MyProfileStore {
    constructor(store) {
        this.rootStore = store;
      }
    
    @observable test: ?String = "";
    
    @action setState(){
    }
}