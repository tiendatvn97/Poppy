import {observable, computed, action} from 'mobx'
export default class SecondScreenStore {
    @observable bgColor = "blue";
    
    @action reset() {
        this.bgColor = 'blue';
    }

    @action setBgColor(bgColor) {
        this.bgColor = bgColor;
    }

}