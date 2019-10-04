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
import { StyleSheet, Alert, Dimensions, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const widthScreen = Dimensions.get("window").width;

export default class CreatePostView extends Component {
  render() {
    return (
      <Container>
        <Content>
          <KeyboardAwareScrollView
            innerRef={ref => {
              this.scroll = ref;
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
                  onFocus={(event) => {
                    this._scrollToInput(
                      ReactNative.findNodeHandle(event.target)
                    );
                  }}
                ></Input>
                <Icon
                  name="emoticon-devil-outline"
                  type="MaterialCommunityIcons"
                />
              </Item>
            </Form>
          </KeyboardAwareScrollView>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});
