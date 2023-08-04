/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import userImage from '../../assets/Image/userDefault.png';
import globalStyle from '../../assets/globalStyles';
import React from 'react';
import card from '../../assets/Image/card.png';
import {useSelector} from 'react-redux';
import http from '../../helper/http';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const [user, setUser] = React.useState([]);
  const USER_DEFAULT_IMAGE = Image.resolveAssetSource(userImage).uri;


  const getUser = React.useCallback(async () => {
    const {data} = await http(token).get(`/profile`);
    setUser(data.results);
  }, [token]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <View style={{gap: 50}}>
      <View style={{paddingHorizontal: 20, gap: 20, paddingTop: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
          <Text style={{width: '80%', fontSize: 18, textAlign: 'center'}}>
            Profile
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
          <View style={globalStyle.userImage}>
            <Image
              source={{
                uri: USER_DEFAULT_IMAGE,
              }}
              width={100}
              height={100}
            />
          </View>
          <Text style={{fontSize: 18}}>{user.fullName}</Text>
          <Text>{user.email}</Text>
        </View>
      </View>
      <View style={{gap: 10, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18}}>Card</Text>
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderRadius: 8,
              borderColor: '#02A8A8',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="add" size={30} color="#02A8A8" />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image source={card} width={300} height={100} />
            <Image source={card} width={300} height={100} />
          </View>
        </ScrollView>
      </View>
      <View style={{gap: 20}}>
        <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              height: 50,
              paddingHorizontal: 20,
            }}>
            <AntDesign name="edit" size={30} color="#02A8A8" />
            <Text style={{flex: 1, fontSize: 18}}>Edit Profile</Text>
            <AntDesign name="right" size={30} color="#02A8A8" />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('ChangeProfile')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              paddingHorizontal: 20,
              height: 50,
            }}>
            <AntDesign name="lock" size={30} color="#02A8A8" />
            <Text style={{flex: 1, fontSize: 18}}>Change Profile</Text>
            <AntDesign name="right" size={30} color="#02A8A8" />
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default Profile;
