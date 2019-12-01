import { observable, action, computed } from "mobx";
import Firebase from "../../firebase/Firebase";

export default class ChatStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable hostChat: ?String = "";
  @observable partnerChat: ?String = "";
  @observable textMessage: ?String = "";

  @observable messageList: ?any = [];
  @observable historyChat: ?(any[]) = [];

  @action
  textMessageOnChange(textMessage: ?string) {
    this.textMessage = textMessage;
  }

  @action
  async setValue(hostChat: ?String, partnerChat: ?string) {
    this.hostChat = hostChat;
    this.partnerChat = partnerChat;
  }

  @action async sendMessage() {
    if (!this.textMessage.trim(" ")) return;
    msgId = Firebase.database
      .ref("messages")
      .child(this.hostChat)
      .child(this.partnerChat)
      .push().key;
    let updates = {};
    let message = {
      id: msgId,
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
    try {
      Firebase.database.ref().update(updates);
      this.updateHistoryChat(this.partnerChat, message.content, Date.now());
    } catch (e) {
      console.log(`error update message: ${e}`);
    }
    this.textMessage = "";
  }

  @action
  convertTime(time: ?string) {
    const date = new Date(time);
    const now = new Date();

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const dayFormat = day < 10 ? "0" : "" + day;
    const monthFormat = month < 10 ? "0" : "" + month;

    var result = date.getHours() + ":";
    result = result + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    if (
      year === now.getFullYear() &&
      month === now.getMonth() &&
      day !== now.getDate()
    ) {
      result = `${dayFormat}:${result}`;
    }
    if (year === now.getFullYear() && month !== now.getMonth()) {
      result = `${monthFormat}:${dayFormat}:${result}`;
    }
    if (year !== now.getFullYear()) {
      result = `${year}:${monthFormat}:${dayFormat}:${result}`;
    }
    return result;
  }
  @action updateHistoryChat(userId: ?String, content: ?String, time: ?string) {
    const index = this.historyChat.map(item => item.userId).indexOf(userId);
    const mess = {
      userId: userId,
      content: content,
      time: time
    };
    if (index !== -1) {
      this.historyChat[index] = mess;
    } else this.historyChat.push(mess);
  }
}
