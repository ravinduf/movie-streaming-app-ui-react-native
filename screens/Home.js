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

import { Profiles, ProgressBar } from '../components'

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

    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width)
    // console.log(dotPosition);
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {dummyData.newSeason.map((item, index) => {

          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
          })

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          })

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: "clamp",
          })

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: SIZES.radius,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            />

            
          )
        })}
      </View>
    )
  }

  const renderContinueWatchingSection = () => {
   
    return (
      <View
        style={{
          marginTop: SIZES.padding,

        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}
        >
          <Text style={{
              color: COLORS.white, ...FONTS.h2
            }}
          >
            Continue Watching...
          </Text>

          <Image 
            source={ icons.right_arrow }
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary
            }}
          />
        </View>

        {/* List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding
          }}
          data={dummyData.continueWatching}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("MovieDetail", { selectedMovie: item })}
              >
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding: 20,
                    marginRight: index == dummyData.continueWatching.length -1 ? SIZES.padding : 0,
                  }}
                >
                  {/* Thumbnail */}
                    <Image 
                      source={item.thumbnail}
                      resizeMode="center"
                      style={{
                        width: SIZES.width / 4,
                        height: SIZES.width / 3,
                        borderRadius: 20,
                      }}
                    />
                  {/* Name */}
                    <Text
                      style={{
                        marginTop: SIZES.base, 
                        color: COLORS.white,
                        ...FONTS.h4
                      }}
                    >
                      {item.name}
                    </Text>
                  {/* Progress Bar */}
                  <ProgressBar 
                    containerStyle={{
                      marginTop: SIZES.radius,
                    }}
                    barStyle={{
                      height: 3
                    }}
                    barPercentage={item.overallProgress}
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          }}

        ></FlatList>
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
        {renderDots()}
        {renderContinueWatchingSection()}
      </ScrollView>
    </View>
  )
}

export default Home;