import React from 'react';
import {View} from 'react-native';
import { ActivityIndicator} from 'react-native-paper';
//import { useAccounts } from '../context';

export const Waiting = ()=>{
    //const { colorScheme } = useAccounts();
    return (
        <View className="flex-row justify-center items-center">
            <ActivityIndicator size={'large'} 
            //color={colorScheme=='dark'? '#475569':'#818cf8'}
            />
        </View>
    );
}

