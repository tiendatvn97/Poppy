import { observable, action, computed } from "mobx";

import { StackActions, NavigationActions } from "react-navigation";
export default class NavigationStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable currentNavigation: ?any = null;
  @action goback() {}
  @action async reset(routeName: string) {
    this.currentNavigation.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: routeName
          })
        ]
      })
    );
  }
}
