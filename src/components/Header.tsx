import { Appbar,Avatar } from "react-native-paper";
import {TouchableOpacity,Platform,Text, View} from 'react-native'
import * as NavigationBar from 'expo-navigation-bar';
//import * as wallet from '../wallet';
import {useColorScheme } from "nativewind";

type Props = {
  goBack?: () => void;
  title?: string;
};

export const Header = ({goBack,title}:Props) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const changeColor = async() => {
    toggleColorScheme();
    if (Platform.OS==='ios') return;
    await NavigationBar.setBackgroundColorAsync(
      (colorScheme === 'dark')?'#1e293b':'#a5b4fc');
  }

  if (title === undefined) title = ''

  return(
    <Appbar.Header  className={`justify-between bg-indigo-300  dark:bg-slate-800 ml-2 mr-4`}>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={goBack}>
          {goBack &&
            <Avatar.Icon size={48} icon="arrow-left" className="bg-indigo-300 dark:bg-slate-800"/>
          }
        </TouchableOpacity>  
        <Text className=" text-slate-800 dark:text-slate-300 font-bold ml-2"
        >{title}</Text>
      </View>
      <TouchableOpacity onPress={changeColor}> 
        <Avatar.Text  size={32} label={colorScheme === "dark" ? "🌙" : "🌞"}
          className="bg-yellow-100 dark:bg-slate-800"
        />
      </TouchableOpacity>       
    </Appbar.Header>

  )
};

 ;
