import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  FlatList,
  Animated,
  ScrollView
} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants'

const Home = ({ navigation }) => {

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Profile */}
        <TouchableOpacity 
          style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50
          }}
          onPress={() => console.log('Profile')}
        >
          <Image 
            source={images.profile_photo}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>

        {/* Screen Mirror */}
        <TouchableOpacity 
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
          }}
          onPress={() => console.log("Screen Mirror")}
        >
          <Image 
            source={icons.airplay}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View
      style={{ 
        flex: 1, 
        backgroundColor: COLORS.black
      }}
    >
      {renderHeader()}
    </View>
  )
}

export default Home;