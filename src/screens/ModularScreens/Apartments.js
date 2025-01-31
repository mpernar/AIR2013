import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/DesignConstants';
import { AddDataOnAPI, EditDataOnAPI } from '../../backend/ApiConnection';

export default class App extends React.Component {

  constructor(props) {
    const { propertyId } = props.navigation.getParam('propertyId');
    const { name } = props.navigation.getParam('name');
    const { location } = props.navigation.getParam('location');

    super(props);
    this.state = {
      propertyId: propertyId,
      name: name,
      location: location
    }

    this.handleChangedTextName = this.handleChangedTextName.bind(this)
    this.handleChangedTextLocation = this.handleChangedTextLocation.bind(this)
  }

  urlProperties = 'https://air2020api.azure-api.net/api/Properties'

  handleChangedTextName(newText) {
    this.setState({
      name: newText
    })

    console.log(this.state.name)
  }

  handleChangedTextLocation(newText) {
    this.setState({
      location: newText
    })

    console.log(this.state.location)
  }

  render() {
    const { propertyId } = this.state;

    return (
      <View style={styles.View}>
        <View style={styles.Naslov}>
          <Text style={styles.settingsText}>Uredi</Text>
          <Text style={styles.settingsTextName}>apartman</Text>
        </View>
        <View style={styles.marginaSlikeIokvir1}>
          <View style={styles.margineTeksta1}>
            <Text style={styles.tekstIzbornika}>Naziv apartmana </Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Unesite naziv apartmana"
              defaultValue={this.state.name}
              onChangeText={this.handleChangedTextName}
            ></TextInput>
          </View>
        </View>

        <View style={styles.marginaSlikeIokvir3}>
          <View style={styles.margineTeksta3}>
            <Text style={styles.tekstIzbornika}> Lokacija </Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Unesite lokaciju"
              defaultValue={this.state.location}
              onChangeText={this.handleChangedTextLocation}
            ></TextInput>
          </View>
        </View>



        <View style={styles.marginaSlikeIokvir4}>
          <TouchableOpacity
            style={styles.dodajUkloniStavke}
            onPress={() => {
              if (propertyId !== undefined) {
                this.props.navigation.navigate('AddEditRooms', { selectedPropertyId: propertyId })
              }
              else{
                ToastAndroid.show("Nije moguće dodati sobu nepostojećem apartmanu!", ToastAndroid.SHORT);
              }
            }}
          >
            <View style={styles.margineTeksta4}>
              <FontAwesomeIcons name="bed" size={19}>
                <Text style={styles.tekstIzbornika}> Dodaj ili ukloni sobe </Text>
              </FontAwesomeIcons>
              <View style={styles.arrow}>
                <MaterialIcons name="arrow-forward-ios" size={25}></MaterialIcons>
              </View>
            </View>
          </TouchableOpacity>
        </View>



        <View style={styles.txtButtonIcon}>
          <View style={styles.btn1}>
            <TouchableOpacity
              style={styles.btnBorder1}
              onPress={async () => {
                let bodyAdd = JSON.stringify({name: this.state.name, location: this.state.location})
                let bodyEdit = JSON.stringify({propertyId: propertyId, name: this.state.name, location: this.state.location});
                console.log(bodyAdd)
                console.log(bodyEdit)
                if (propertyId === undefined) {
                  await AddDataOnAPI(this.urlProperties, bodyAdd)
                  ToastAndroid.show("Apartman je uspješno dodan!", ToastAndroid.SHORT);
                } else {
                  await EditDataOnAPI(this.urlProperties + '/' + propertyId, bodyEdit)
                  ToastAndroid.show("Apartman je uspješno promijenjen!", ToastAndroid.SHORT);
                }
                this.props.navigation.navigate("AddEditApartments")
              }}
            >
              <EntypoIcon
                name="save"
                size={22}
                style={styles.SaveIkona}
              ></EntypoIcon>
              <Text style={styles.btnText1}>SPREMI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    height: 800,
  },
  Naslov: {
    width: "80%",
    marginBottom: 40,
  },
  mainView: {
    flexDirection: "row",
    width: "100%",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsText: {
    fontSize: 30,
    fontWeight: "normal",
  },
  settingsTextName: {
    fontSize: 30,
    fontWeight: "700",
    bottom: 7,
  },
  tekstIzbornika: {
    fontWeight: "bold",
    fontSize: 18,
    left: 28,
    top: -5,
  },
  margineTeksta1: {
    marginBottom: 0,
    marginTop: 0,
    marginLeft: -15,
    bottom: 10,
  },
  margineTeksta2: {
    marginBottom: 0,
    marginTop: 0,
    marginLeft: -15,
    bottom: 10,
  },
  margineTeksta3: {
    marginBottom: 0,
    marginTop: 0,
    marginLeft: -15,
    bottom: 10,
  },
  margineTeksta4: {
    marginBottom: 187,
    marginTop: 0,
    marginLeft: 12,
    bottom: -93,
  },

  arrow: {
    left: 300,
    bottom: 22,
  },
  marginaSlikeIokvir1: {
    marginTop: 125,
    borderColor: "grey",
    height: 40,
    justifyContent: "center",
    bottom: 110,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    height: 40,
  },
  marginaSlikeIokvir2: {
    marginTop: 100,
    borderColor: "grey",
    height: 40,
    justifyContent: "center",
    bottom: 110,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    height: 40,
  },
  marginaSlikeIokvir3: {
    marginTop: 100,
    borderColor: "grey",
    height: 40,
    justifyContent: "center",
    bottom: 160,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    height: 40,
  },
  marginaSlikeIokvir4: {
    marginTop: 100,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "grey",
    height: 40,
    justifyContent: "center",
    bottom: 210,
    width: "100%",
  },
  btn1: {
    left: 200,
    top: 60,
    height: 110,
  },
  btnBorder1: {
    top: 32.5,
    borderColor: colors.black,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    width: "41%",
    height: "43%",
    bottom: 60,
    left: 11,
  },
  btnText1: {
    fontWeight: "bold",
    fontSize: 15,
    left: 45,
    bottom: 20,
  },
  TextInput: {
    left: 15,
    top: -8,
    fontSize: 18,
    justifyContent: "center",
    bottom: 30,
    width: 347,
  },
  SaveIkona: {
    bottom: -2,
  },
});
