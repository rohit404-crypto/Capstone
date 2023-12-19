import { View, Text,Button } from 'react-native'
import React from 'react'

const Splash = ({navigation}) => {
  return (
    <View>
      <Text>Splash</Text>
     <Button 
     title='login'
     onPress={()=>navigation.navigate('login')}/>
     <Button 
     title='sign up'
     onPress={()=>navigation.navigate('signup')}/>
    </View>
  )
}

export default Splash