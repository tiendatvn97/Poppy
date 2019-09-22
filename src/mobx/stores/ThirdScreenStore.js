import {observable, computed, action} from 'mobx'
export default class ThirdScreenStore {
    @observable bgColor = "pink";
    
    @action reset() {
        this.bgColor = 'yellow';
    }

    @action setBgColor(bgColor) {
        this.bgColor = bgColor;
    }
}