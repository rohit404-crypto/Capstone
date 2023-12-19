import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React ,{useState,useEffect}from 'react'

const Home = () => {
  const [userData,setUserData] = useState({
    email: "",
    petname: "",
    petguardian:""
  })
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const parsedUserData = JSON.parse(storedUserData);
        console.log(parsedUserData);
        setUserData({
          email:parsedUserData.email,
          petguardian:parsedUserData.petGuardian,
          petname:parsedUserData.petName
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);
  return (
    <View>
      <Text>Home page</Text>
      <Text>Hello {userData.petname}</Text>
    </View>
  )
}

export default Home