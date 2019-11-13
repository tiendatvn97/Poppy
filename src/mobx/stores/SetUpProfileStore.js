import { observable, action, computed } from "mobx";

export default class SetUpProfileStore {
  @observable email: ?String = "dat@gmail.com";
  @observable password: ?String = "123456";
  @observable isLoading: boolean = false;
}
