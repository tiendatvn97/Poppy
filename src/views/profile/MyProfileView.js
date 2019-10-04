import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
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
  KeyboardAvoidingView,
  FlatList,
  Image
} from "react-native";

const widthScreen = Dimensions.get("window").width;

export default class MyProfileView extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card style={{ elevation: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={require("../../icons/3.jpg")} />
                <Body>
                  <Text> William Franklin </Text>
                  <Text style={styles.textNote}> M, 27, Atlanta, Ga</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card style={styles.cardAbout}>
            <CardItem Body>
              <Body>
                <Text style={{ marginBottom: 10 }}>About</Text>
                <Text style={styles.textNote}>
                  So strongly and metaphysically did I conceive of my situation
                  then, that while ear. So strongly and metaphysically did I
                  conceive of my situation
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.cardRate}>
            <CardItem>
              <Body>
                <Text style={{ marginVertical: 5 }}>Stars</Text>
                <Item style={styles.itemRate}>
                  <Body style={styles.bodyRate}>
                    <Text style={styles.textRateNuber}>8</Text>
                    <Text style={styles.textNote}>MOMENTS</Text>
                  </Body>
                  <Body style={styles.bodyRate}>
                    <Text style={styles.textRateNuber}>16</Text>
                    <Text style={styles.textNote}>FOLLOWERS</Text>
                  </Body>
                  <Body style={[styles.bodyRate, { flex: 0.7 }]}>
                    <Text style={styles.textRateNuber}>34</Text>
                    <Text style={styles.textNote}>FOLLOWING</Text>
                  </Body>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Text style={{ marginLeft: 17, marginTop: 17 }}>Moments</Text>
          <FlatList
            style={{ padding: 17 }}
            data={DATA}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Image style={styles.imageFlatList} source={item.image} />
                <View style={{ height: 17, width: widthScreen }}></View>
              </View>
            )}
          />
        </Content>
        <Button
          style={{
            width: 55,
            height: 55,
            alignSelf: "center",
            borderRadius: 27.5,
            position: "absolute",
            right: 10,
            bottom: 10,
            backgroundColor: "#ff6265"
          }}
        >
          <Icon name="video-camera" type="Entypo"></Icon>
        </Button>
      </Container>
    );
  }
}
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("../../icons/1.jpg")
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    image: require("../../icons/2.jpg")
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    image: require("../../icons/3.jpg")
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("../../icons/3.jpg")
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    image: require("../../icons/2.jpg")
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    image: require("../../icons/1.jpg")
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("../../icons/1.jpg")
  }
];

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
  bodyRate: {
    flex: 1,
    alignItems: "flex-start",
    alignSelf: "flex-start"
  },
  textRateNuber: {
    color: "#ff6265"
  },
  imageFlatList: {
    borderRadius: 8,
    width: widthScreen / 3 - 17,
    height: widthScreen / 3 - 17,
    resizeMode: "cover"
  },
  itemRate: {
    borderBottomWidth: 0,
    flex: 1,
    flexDirection: "row",
    marginRight: 0,
    marginBottom: 0
  },
  cardRate: {
    marginTop: 0,
    marginBottom: 0,
    elevation: 1.5,
    marginHorizontal: 0
  },
  cardAbout: {
    marginHorizontal: 0,
    paddingVertical: 4,
    marginBottom: 0,
    borderColor: "#e6e6e6",
    shadowRadius: 0.2,
    elevation: 1.5
  }
});
