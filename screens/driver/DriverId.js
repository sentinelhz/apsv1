/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {IconFeather} from '@expo/vector-icons';
import {COLORS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchDriverData,
    resetPhotos,
    updateDriver,
} from '../../redux/User/user.actions';

const mapState = ({user}) => ({
    driverData: user.driverData,
    driverDataSuccess: user.driverDataSuccess,
    errors: user.errors,
});

const CreditId = ({navigation}) => {
  const {driverData, driverDataSuccess, errors} = useSelector(mapState);
  const dispatch = useDispatch();
  console.log('Start LINE 28');
  console.log('driverData: ', driverData);
  console.log('driverDataSuccess: ', driverDataSuccess);
  console.log('errors: ', errors);

  const {createdAt, front, back} = driverData;

  useEffect(() => {
    dispatch(fetchDriverData());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <IconFeather
            name="arrow-left"
            size={25}
            color={COLORS.main}
            style={styles.icon_style}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Identification</Text>
        </View>
        <View style={styles.VerifyContent}>
          {/* Driver Card Start */}
          <View style={styles.sectionContent}>
            <Text style={styles.section}>Driver Card</Text>
            <View style={styles.cardRender}>
              <View style={styles.cardRender2}>
                {driverData.name ? (
                  <Text style={styles.caardTitle}>{driverData.name}</Text>
                ) : null}
                <Text style={styles.caardDate}>
                  {createdAt}
                </Text>
                <View>
                  <View style={styles.imagesContainer}>
                    <View style={styles.imageContainer2}>
                      <Image
                        style={styles.frontImage}
                        source={{
                          uri: driverData.front,
                        }}
                      />
                      <Text style={styles.bottomImageText}>Front</Text>
                    </View>
                    <View style={styles.imageContainer2}>
                      <Image
                        style={styles.frontImage}
                        source={{
                          uri: driverData.back,
                        }}
                      />
                      <Text style={styles.bottomImageText}>Back</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.cardRender3}
                onPress={() => navigation.navigate('DriverFrontPhoto')}>
                <Text style={styles.btnRetake}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(updateDriver(front, back));
              dispatch(resetPhotos())
              console.log('Saved !!');
              navigation.navigate('Identification')
            }}>
            <Text style={styles.signup}>Save</Text>
          </TouchableOpacity>
          {/* Driver Card End */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreditId;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
      },
      container: {
        flex: 1,
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.main,
        paddingVertical: 5,
        paddingLeft: 10,
      },
      headerTitle: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 10,
        marginLeft: 120,
      },
      sectionContent: {
        paddingTop: 10,
      },
      sectionContent1: {
        paddingTop: 40,
      },
      buttonBorder: {
        borderColor: COLORS.main,
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      VerifyContent: {
        padding: 20,
        paddingTop: 0,
      },
      section: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.main,
        paddingTop: 20,
        paddingBottom: 10,
      },
      cameraIcon: {
        fontSize: 25,
      },
      rightText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.main,
        paddingLeft: 20,
      },
      image: {
        width: 200,
        height: 200,
      },
      driverStyle: {
        opacity: 1,
      },
      creditStyle: {
        opacity: 0.6,
      },
      insureanceStyle: {
        opacity: 0.6,
      },
      cardRender: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'grey',
      },
      cardRender2: {
        padding: 30,
      },
      imagesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        marginTop: 15,
      },
      frontImage: {
        width: 130,
        height: 70,
        borderRadius: 8,
        margin: 0,
      },
      bottomImageText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0,
      },
      imageContainer2: {
        overflow: 'hidden',
      },
      caardDate: {
        fontSize: 16,
      },
      caardTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 10,
      },
      cardRender3: {
        borderTopWidth: 1,
        borderColor: 'grey',
      },
      btnRetake: {
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
      },
      inputField: {
        paddingTop: 10,
        padding: 5,
        width: '100%',
      },
      label: {
        textAlign: 'left',
        fontSize: 16,
        color: COLORS.main,
        marginVertical: 10,
      },
      input: {
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 0.5,
        color: COLORS.main,
        borderColor: COLORS.main,
        paddingTop: 5,
        paddingLeft: 20,
        width: '100%',
      },
      signup: {
        backgroundColor: COLORS.main,
        color: 'white',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 4,
        marginHorizontal: 0,
        marginVertical: 10,
        fontWeight: '600',
      },
});
