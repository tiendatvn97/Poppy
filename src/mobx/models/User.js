import Profile from "./Profile"
export default class User {
  id: ?string = "";
  avataImage: ?string = "";
  follower: ?(string[]) = [];
  following: ?(string[]) = [];
  postId: ?(string[]) = [];
  chatId: ?(string[]) = [];
  blockId: ?(string[]) = [];
  profile: ?Profile = null;

  static async load(id, avataImage, follower,following, postId, chatId, blockId, profile) {
    const user = new User();
    user.id = id;
    user.avataImage = avataImage;
    user.follower = follower;
    user.following = following;
    user.postId = postId;
    user.chatId = chatId;
    user.blockId = blockId;
    user.profile = profile;
    return user;
  }
}
