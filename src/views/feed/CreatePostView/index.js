import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Content,
  View,
  Form,
  Item,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  Input
} from "native-base";
import {
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
const widthScreen = Dimensions.get("window").width;

import FullBackHeader from "../../header/FullBackHeader";
import StatusBarCustom from "../../header/StatusBarCustom";

import { observer, inject } from "mobx-react";
@inject("createPostStore")
@observer
export default class CreatePostView extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  constructor(props) {
    super(props);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  state = {
    keyBoardDidShow: false
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow() {
    this.setState({ keyBoardDidShow: true });
  }

  _keyboardDidHide() {
    this.setState({ keyBoardDidShow: false });
  }

  render() {
    const { createPostStore } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <StatusBarCustom/>
          <FullBackHeader
            parent={this}
            title="Create Moment"
            nameRightIcon="closecircleo"
            typeRightIcon="AntDesign"
          />
          <Content
            ref={ref => {
              this.scrollView = ref;
            }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView._root.scrollToEnd({ animated: true });
            }}
          >
            <Image
              style={{
                width: widthScreen - 34,
                height: widthScreen - 34,
                margin: 17,
                resizeMode: "cover"
              }}
              source={{ uri: createPostStore.image.uri }}
            />

            <Form>
              <Item>
                <Input
                  multiline
                  returnKeyType="Done"
                  blurOnSubmit
                  placeholder="Add caption"
                  style={{ fontSize: 16, minHeight: 50 }}
                  value={createPostStore.caption}
                  onChangeText={value => {
                    createPostStore.captionOnChange(value);
                  }}
                ></Input>
                <Icon
                  name="emoticon-devil-outline"
                  type="MaterialCommunityIcons"
                  style={styles.iconForm}
                />
              </Item>
              <Item>
                <Input
                  multiline
                  returnKeyType="Done"
                  blurOnSubmit
                  placeholder="Tag People"
                  style={{ fontSize: 16, minHeight: 50 }}
                  value={createPostStore.peopleTag}
                  onChangeText={value => {
                    createPostStore.peopleTagOnChange(value);
                  }}
                ></Input>
                <Icon
                  name="plussquareo"
                  type="AntDesign"
                  style={styles.iconForm}
                />
              </Item>
              <Item>
                <Input
                  multiline
                  returnKeyType="Done"
                  blurOnSubmit
                  returnKeyType="Done"
                  placeholder="Add Location"
                  value={createPostStore.location}
                  onChangeText={value => {
                    createPostStore.locationOnChange(value);
                  }}
                  style={{ fontSize: 16, minHeight: 50 }}
                ></Input>

                <Icon name="map-pin" type="Feather" style={styles.iconForm} />
              </Item>
            </Form>
          </Content>
          {!this.state.keyBoardDidShow && (
            <Footer
              style={{
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                style={[
                  styles.button,
                  { marginRight: 25 },
                  createPostStore.isSave ? { backgroundColor: "#ff6265" } : null
                ]}
                onPress={() => {
                  this.scrollView._root.scrollToEnd({ animated: true });
                }}
                disabled={createPostStore.isPost || createPostStore.isSave}
              >
                <View style={styles.viewContainButton}>
                  <Icon
                    name="clouddownloado"
                    type="AntDesign"
                    style={
                      createPostStore.isSave
                        ? styles.iconButtonClicked
                        : styles.iconButton
                    }
                  />
                  <Text
                    uppercase={false}
                    style={{
                      color: createPostStore.isSave ? "#ffffff" : "#ff6265"
                    }}
                  >
                    Save
                  </Text>
                </View>
              </Button>
              <Button
                style={[
                  styles.button,
                  createPostStore.isPost ? { backgroundColor: "#ff6265" } : null
                ]}
                onPress={async () => {
                  await createPostStore.createPost();
                  this.props.navigation.goBack();
                }}
                disabled={createPostStore.isPost || createPostStore.isSave}
              >
                <View style={styles.viewContainButton}>
                  <Icon
                    name="ios-send"
                    type="Ionicons"
                    style={
                      createPostStore.isPost
                        ? styles.iconButtonClicked
                        : styles.iconButton
                    }
                  />
                  <Text
                    uppercase={false}
                    style={{
                      color: createPostStore.isPost ? "#ffffff" : "#ff6265"
                    }}
                  >
                    Post
                  </Text>
                </View>
              </Button>
            </Footer>
          )}
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: "40%",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#ff6265",
    borderWidth: 1,
    backgroundColor: "white"
  },
  iconButton: {
    color: "#ff6265",
    marginRight: 5
  },
  iconButtonClicked: {
    color: "#ffffff",
    marginRight: 5
  },
  viewContainButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  iconForm: {
    color: "gray",
    alignSelf: "flex-start",
    marginTop: 12
  }
});
