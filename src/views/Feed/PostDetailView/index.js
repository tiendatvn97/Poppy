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
// import Icons from "react-native-vector-icons"
import {
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import Image from "react-native-scalable-image";
import DrawerHeader from "../../header/DrawerHeader";
const widthScreen = Dimensions.get("window").width;
export default class PostDetailView extends Component {
  render() {
    return (
      <Container>
        <DrawerHeader parent ={this} />
        <Content>
          <Card transparent>
            <CardItem
              style={{
                paddingLeft: 0,
                paddingTop: 5,
                paddingRight: 10
              }}
              transparent
            >
              <Left style={{}}>
                <Thumbnail
                  style={{ alignSelf: "center", width: 45, height: 45 }}
                  large
                  source={require("../../../icons/2.jpg")}
                />
                <Body style={{}}>
                  <Text style={{ fontSize: 12, padding: 2 }}>Dat 6 Mui</Text>
                  <Text style={{ fontSize: 10, color: "gray" }}>
                    10 mins ago
                  </Text>
                </Body>
              </Left>
              <Right>
                <Button transparent>
                  <Icon type="AntDesign" name="hearto" />
                </Button>
              </Right>
            </CardItem>

            <Image
              source={require("../../../icons/2.jpg")}
              width={widthScreen}
            />

            <CardItem style={{}}>
              <Left>
                <Icon name="map-pin" type="Feather" size={10} />
                <Text style={styles.textNote}>10 mins ago</Text>
              </Left>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left
                style={{ justifyContent: "center", alignItems: "center" }}
                bordered
              >
                <Icon type="AntDesign" name="hearto" />
                <Text>214</Text>
              </Left>
              <Left style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon type="AntDesign" name="sharealt" />
                <Text>214</Text>
              </Left>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem transparent>
              <Left>
                <Text style={styles.textNote}>21 Comments</Text>
              </Left>
              <Left style={{ justifyContent: "flex-end" }}>
                <Text style={[styles.textNote, { color: "#ff6265" }]}>
                  View All
                </Text>
              </Left>
            </CardItem>
            <CardItem transparent style={{ paddingTop: 0 }}>
              <Left>
                <Thumbnail
                  source={require("../../../icons/3.jpg")}
                  small
                  style={{ alignSelf: "flex-start" }}
                />
                <Body>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>To tien dat</Text>
                    <Text style={styles.textNote}>3 mins ago</Text>
                  </View>
                  <Text style={{ fontSize: 10 }}>
                    node_modules\metro\src\lib\polyfills\require.js:331:6 in
                    oadModuleImplementation
                    node_modules\metro\src\lib\polyfills\require.js:331:6 in
                    loadModuleImplementation
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem transparent style={{ paddingTop: 0 }}>
              <Left>
                <Thumbnail
                  source={require("../../../icons/2.jpg")}
                  small
                  style={{ alignSelf: "flex-start" }}
                />
                <Body>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Minh anh</Text>
                    <Text style={styles.textNote}>3 mins ago</Text>
                  </View>
                  <Text style={{ fontSize: 10 }}>
                    node_modules\metro\src\lib\polyfills\require.js:331:6 in
                    oadModuleImplementation
                    node_modules\metro\src\lib\polyfills\require.js:331:6 in
                    loadModuleImplementation
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
        <KeyboardAvoidingView behavior="padding">
          <Card style={{ marginBottom: 0, borderTopWidth: 1.5 }}>
            <Form>
              <Item>
                <Input
                  placeholder="Write comment..."
                  style={{ fontSize: 12 }}
                />
                <Icon name="emoticon-devil" type="MaterialCommunityIcons" />
                <View style={styles.sendIcon}>
                  <Icon
                    name="ios-send"
                    style={{ paddingRight: 0, color: "white" }}
                  />
                </View>
              </Item>
            </Form>
          </Card>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center"
    // alignSelf:"center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  textNote: {
    fontSize: 10,
    color: "gray"
  },
  sendIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ff6265",
    justifyContent: "center",
    alignItems: "center"
  }
});
