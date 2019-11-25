import {observable, action, computed} from "mobx"

export default class PostDetailStore {
    @observable loveList: ?string[] =[];
    @observable shareList: ?string[] = [];
    @observable commentList: ?string[] = [];
    @observable postInfo: ?string[] = [];
   
    @action clearStore(){
        this.loveList = [];
        this.shareList = [];
        this.commentList = [];
    }

    
}