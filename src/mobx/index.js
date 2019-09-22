import SecondScreenStore from "./stores/SecondScreenStore"
import ThirdScreenStore from "./stores/ThirdScreenStore"

class rootStore {
    secondScreenStore: SecondScreenStore;
    thirdScreenStore: ThirdScreenStore;
    constructor(){
        this.secondScreenStore = new SecondScreenStore();
        this.thirdScreenStore = new ThirdScreenStore();
    }
}

export default function() {
    return new rootStore();
}