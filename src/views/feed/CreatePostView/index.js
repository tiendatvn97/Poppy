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

import DrawerHeader from "../../header/DrawerHeader";

export default class CreatePostView extends Component {
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
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <DrawerHeader parent ={this} />
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
              source={require("../../../icons/1.jpg")}
            />

            <Form>
              <Item>
                <Input
                  multiline
                  returnKeyType="Done"
                  blurOnSubmit
                  placeholder="Add caption"
                  style={{ fontSize: 12, minHeight: 50 }}
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
                  style={{ fontSize: 12, minHeight: 50 }}
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
                  style={{ fontSize: 12, minHeight: 50 }}
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
                style={[styles.button, { marginRight: 25 }]}
                onPress={() => {
                  this.scrollView._root.scrollToEnd({ animated: true });
                }}
              >
                <View style={styles.viewContainButton}>
                  <Icon
                    name="clouddownloado"
                    type="AntDesign"
                    style={styles.iconButton}
                  />
                  <Text uppercase={false} style={{ color: "#ff6265" }}>
                    Save
                  </Text>
                </View>
              </Button>
              <Button style={styles.button}>
                <View style={styles.viewContainButton}>
                  <Icon
                    name="ios-send"
                    type="Ionicons"
                    style={styles.iconButton}
                  />
                  <Text uppercase={false} style={{ color: "#ff6265" }}>
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
