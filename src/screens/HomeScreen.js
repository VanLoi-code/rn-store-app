import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

import RenderItem from '../components/RenderItem';
import DevicesComponent from '../components/DevicesComponent';
import {BASE_URL} from '../api/URL';
import {CHILEAN_FIRE, KENYAN_COPPER, COIN} from '../components/Colors';

const HomeScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [listProduct5, setListProduct5] = useState([]);
  const [listProduct11, setListProduct11] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(route?.params?.update);

  useEffect(() => {
    fetchData();
  }, [isFocused, isUpdate]);

  const fetchData = async () => {
    try {
      let data = await axios.get(`${BASE_URL}/api/getAllItem`);
      if (data.data) {
        let dataIp5 = [];
        let dataIp11 = [];
        data.data.map((item, index) => {
          item.category === 'Iphone 5'
            ? dataIp5.push(item)
            : dataIp11.push(item);
        });
        setListProduct5(dataIp5);
        setListProduct11(dataIp11);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 4}}>
          <Image
            style={{height: 200, width: '100%'}}
            source={require('../assets/-iphone-11-thumbvideo.jpg')}
            resizeMode="cover"
          />
        </View>

        <View style={{width: '100%', height: 1}} />

        <View style={{flex: 6}}>
          <View>
            <DevicesComponent
              title="Iphone 5"
              style={{color: CHILEAN_FIRE, fontSize: 17}}
            />
            {loading ? (
              <ActivityIndicator size="large" color={CHILEAN_FIRE} />
            ) : (
              <FlatList
                data={listProduct5}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                // ItemSeparatorComponent={() => (
                //   <View style={{width: '100%', height: 1}}></View>
                // )}
                renderItem={({item}) => {
                  return <RenderItem item={item} navigation={navigation} />;
                }}
              />
            )}
          </View>
          <View>
            <DevicesComponent
              title="Iphone 11"
              style={{color: CHILEAN_FIRE, fontSize: 17}}
            />
            {loading ? (
              <ActivityIndicator size="large" color={CHILEAN_FIRE} />
            ) : (
              <FlatList
                data={listProduct11}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                // ItemSeparatorComponent={() => (
                //   <View style={{width: '100%', height: 1}}></View>
                // )}
                renderItem={({item}) => {
                  return <RenderItem item={item} navigation={navigation} />;
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
