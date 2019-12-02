
import CreatePostStore from "./stores/CreatePostStore";
import MyProfileStore from "./stores/MyProfileStore";
import NewsFeedStore from "./stores/NewsFeedStore";
import PostDetailStore from "./stores/PostDetailStore";
import RegisterStore from "./stores/RegisterStore";
import SignInStore from "./stores/SignInStore";
import SetUpProfileStore from "./stores/SetUpProfileStore";
import UserStore from "./stores/UserStore";
import ChatStore from "./stores/ChatStore";
import NavigationStore from "./stores/NavigationStore";
import ThirdProfileStore from "./stores/ThirdProfileStore";

class rootStore {
  createPostStore: CreatePostStore;
  myProfileStore: MyProfileStore;
  newsFeedStore: NewsFeedStore;
  postDetailStore: PostDetailStore;
  registerStore: RegisterStore;
  signInStore: SignInStore;
  setUpProfileStore: SetUpProfileStore;
  userStore: UserStore;
  chatStore: ChatStore;
  navigationStore: NavigationStore;
  thirdProfileStore: ThirdProfileStore;

  constructor() {
    this.createPostStore = new CreatePostStore(this);
    this.myProfileStore = new MyProfileStore(this);
    this.newsFeedStore = new NewsFeedStore(this);
    this.postDetailStore = new PostDetailStore(this);
    this.registerStore = new RegisterStore(this);
    this.signInStore = new SignInStore(this);
    this.setUpProfileStore = new SetUpProfileStore(this);
    this.userStore = new UserStore(this);
    this.chatStore = new ChatStore(this);
    this.navigationStore = new NavigationStore(this);
    this.thirdProfileStore = new ThirdProfileStore(this);
  }
}

export default function() {
  return new rootStore();
}
