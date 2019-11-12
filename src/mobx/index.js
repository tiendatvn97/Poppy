import SecondScreenStore from "./stores/SecondScreenStore";
import ThirdScreenStore from "./stores/ThirdScreenStore";

import CreatePostStore from "./stores/CreatePostStore";
import MyProfileStore from "./stores/MyProfileStore";
import NewsFeedStore from "./stores/NewsFeedStore";
import PostDetailStore from "./stores/PostDetailStore";
import RegisterStore from "./stores/RegisterStore";
import SignInStore from "./stores/SignInStore";

class rootStore {
  secondScreenStore: SecondScreenStore;
  thirdScreenStore: ThirdScreenStore;
  createPostStore: CreatePostStore;
  myProfileStore: MyProfileStore;
  newsFeedStore: NewsFeedStore;
  postDetailStore: PostDetailStore;
  registerStore: RegisterStore;
  signInStore: SignInStore;

  constructor() {
    this.secondScreenStore = new SecondScreenStore();
    this.thirdScreenStore = new ThirdScreenStore();
    this.createPostStore = new CreatePostStore();
    this.myProfileStore = new MyProfileStore();
    this.newsFeedStore = new NewsFeedStore();
    this.postDetailStore = new PostDetailStore();
    this.registerStore = new RegisterStore();
    this.signInStore = new SignInStore();
  }
}

export default function() {
  return new rootStore();
}
