import SecondScreenStore from "./stores/SecondScreenStore";
import ThirdScreenStore from "./stores/ThirdScreenStore";

import CreatePostStore from "./stores/CreatePostStore";
import MyProfileStore from "./stores/MyProfileStore";
import NewsFeedStore from "./stores/NewsFeedStore";
import PostDetailStore from "./stores/PostDetailStore";
import RegisterStore from "./stores/RegisterStore";
import SignInStore from "./stores/SignInStore";
import SetUpProfileStore from "./stores/SetUpProfileStore";
import UserStore from "./stores/UserStore";

class rootStore {
  secondScreenStore: SecondScreenStore;
  thirdScreenStore: ThirdScreenStore;
  createPostStore: CreatePostStore;
  myProfileStore: MyProfileStore;
  newsFeedStore: NewsFeedStore;
  postDetailStore: PostDetailStore;
  registerStore: RegisterStore;
  signInStore: SignInStore;
  setUpProfileStore: SetUpProfileStore;
  userStore: UserStore;

  constructor() {
    this.secondScreenStore = new SecondScreenStore();
    this.thirdScreenStore = new ThirdScreenStore();
    this.createPostStore = new CreatePostStore();
    this.myProfileStore = new MyProfileStore();
    this.newsFeedStore = new NewsFeedStore();
    this.postDetailStore = new PostDetailStore();
    this.registerStore = new RegisterStore();
    this.signInStore = new SignInStore(this);
    this.setUpProfileStore = new SetUpProfileStore();
    this.userStore = new UserStore();
  }
}

export default function() {
  return new rootStore();
}
