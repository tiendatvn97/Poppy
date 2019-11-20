import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";

export default class ChatStore {
  @observable hostChat: ?String = "";
  @observable partnerChat: ?String = "";
  @observable textMessage: ?String = "";

  @observable messageList: ?any = [];

  @action
  textMessageOnChange(textMessage: ?string) {
    this.textMessage = textMessage;
  }

  @action
  async setValue(hostChat: ?String, partnerChat: ?string) {
    this.hostChat = hostChat;
    this.partnerChat = partnerChat;
  }

  @action sendMessage() {
    msgId = Firebase.database
      .ref("messages")
      .child(this.hostChat)
      .child(this.partnerChat)
      .push().key;
    let updates = {};
    let message = {
      content: this.textMessage,
      time: Firebase.firebase.database.ServerValue.TIMESTAMP,
      from: this.hostChat
    };
    updates[
      "messages/" + this.hostChat + "/" + this.partnerChat + "/" + msgId
    ] = message;
    updates[
      "messages/" + this.partnerChat + "/" + this.hostChat + "/" + msgId
    ] = message;
    Firebase.database.ref().update(updates);
    this.textMessage = "";
  }
}
