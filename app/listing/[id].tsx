import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ListingType } from '@/types/listingTypes';
import listingData from '@/data/destinations.json'
import { Feather, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300

const ListingDetails = () => {
  const { id } = useLocalSearchParams();
  const listing: ListingType = (listingData as ListingType[]).find(
    (item) => item.id === id
  )

  const router = useRouter();



  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 30,
            padding: 4,
          }}>
            <View style={{
              backgroundColor: Colors.white,
              padding: 6,
              borderRadius: 50,
            }}>
              <Feather name='arrow-left' size={20} />
            </View>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {}} style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 30,
            padding: 4,
          }}>
            <View style={{
              backgroundColor: Colors.white,
              padding: 6,
              borderRadius: 50,
            }}>
              <Ionicons name='bookmark-outline' size={20} />
            </View>
          </TouchableOpacity>
        )
      }} />
      <View style={styles.container}>
        <ScrollView  contentContainerStyle={{paddingBottom: 150}}>
          <Image source={{ uri: listing.image }} style={styles.image} />
          <View style={styles.contentWrapper}>
            <Text style={styles.listingName}>{listing.name}</Text>
            <View style={styles.listingLocationWrapper}>
              <FontAwesome5 name="map-marker-alt" size={18} color={Colors.primaryColor} />
              <Text style={styles.listingLocationTxt}>{listing.location}</Text>
            </View>

            <View style={styles.highlightWrapper}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.highlightIcon}>
                  <Ionicons name='time' size={18} color={Colors.primaryColor} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Duration</Text>
                  <Text style={styles.highlightTxtVal}>{listing.duration} Days</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={styles.highlightIcon}>
                  <FontAwesome name='users' size={18} color={Colors.primaryColor} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Person</Text>
                  <Text style={styles.highlightTxtVal}>{listing.duration}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={styles.highlightIcon}>
                  <Ionicons name='time' size={18} color={Colors.primaryColor} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Ratings</Text>
                  <Text style={styles.highlightTxtVal}>{listing.rating}/5</Text>
                </View>
              </View>
            </View>
            <Text style={styles.listingDetails}>{listing.description}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => { }} style={[styles.footerBtn, styles.footerBookBtn]}>
          <Text style={styles.footerBtnTxt}>Book Now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.footerBtn}>
          <Text style={styles.footerBtnTxt}>₹{listing.price}</Text>
        </TouchableOpacity>

      </View>
    </>
  )
}

export default ListingDetails

const styles = StyleSheet.create({
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  contentWrapper: {
    padding: 20,
  },
  listingName: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
    letterSpacing: 0.5,
  },
  listingLocationWrapper: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  listingLocationTxt: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.black,
  },
  highlightWrapper: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  highlightIcon: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  highlightTxt: {
    fontSize: 12,
    color: '#999',

  },
  highlightTxtVal: {
    fontSize: 14,
    fontWeight: "600",
  },
  listingDetails: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: width,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerBookBtn: {
    flex: 2,
    backgroundColor: Colors.primaryColor,
    marginRight: 20,
  },
  footerBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  }

})