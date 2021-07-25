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

import { Profiles } from '../components'

const Home = ({ navigation }) => {

  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

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

  const renderNewSeasonSection = () => {
    return (
      <Animated.FlatList 
        horizontal
        pagingEnabled
        snapToAlignment
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: SIZES.radius
        }}
        data={dummyData.newSeason}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: newSeasonScrollX }}}
        ], { useNativeDriver: false})}

        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MovieDetail", { selectedMovie: item })}
            >
              <View
                style={{ 
                  width: SIZES.width,
                  alignItems: 'center', 
                  justifyContent: 'center',
                }}
              >
                <ImageBackground
                  source={item.thumbnail}
                  resizeMode="contain"
                  style={{
                    // width: SIZES.width * 0.65,
                    // height: SIZES.height * 0.65,
                    width: "100%",
                    height: SIZES.height * 0.70,
                    justifyContent: 'flex-end',
                  }}
                  imageStyle={{
                    borderRadius: 30
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 60,
                      width: "90%",
                      marginBottom: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    {/* Play Now */}
                      <View
                        style={{
                          flex: 1, 
                          marginTop: 15,
                          flexDirection: 'row',
                          alignItems: 'center', 
                          justifyContent: 'flex-start'
                        }}
                      >
                        <View
                          style={{
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            marginLeft: 40,
                            backgroundColor: COLORS.transparentWhite,
                          }}
                        >
                          <Image
                            source={icons.play}
                            resizeMode="contain"
                            style={{
                              width: 15,
                              height: 15,
                              tintColor: COLORS.white,
                            }}
                          >

                          </Image>
                        </View>
                          <Text 
                            style={{
                              marginLeft: SIZES.base,
                              color: COLORS.white,
                              ...FONTS.h3
                            }}
                          >
                            Play Now
                          </Text>
                      </View>


                    {/* Still watching */}
                    {item.stillWatching.length > 0 && (
                      <View
                        style={{
                          justifyContent: 'center',
                          marginTop: 15,
                        }}
                      >
                        <Text style={{color: COLORS.white, ...FONTS.h3 }}>Still Watching</Text>
                        <Profiles profiles={item.stillWatching}/>
                      </View>
                    )}
                  </View>

                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          )
        }}
      />
    )
  }

  const renderDots = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
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

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          // height: SIZES.height * 0.50,
        }}
      >
        {renderNewSeasonSection()}
      </ScrollView>
    </View>
  )
}

export default Home;