import * as LocalAuthentication from 'expo-local-authentication'
import * as React from 'react';
import {Waiting} from '../components/Waiting';
import {AuthenticationScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { View,Text} from "react-native";
import {Button,Avatar,Switch} from 'react-native-paper'
import * as asyncStore from '../storage/asyncStore';

export const AuthenticationScreen = ({ route, navigation }: AuthenticationScreenProps) =>{
    const [isSwitchOn, setIsSwitchOn] = React.useState(true);
    const [sign, setSign] = React.useState('');

    enum EResult {
        CANCELLED = 'CANCELLED',
        DISABLED = 'DISABLED',
        ERROR = 'ERROR',
        SUCCESS = 'SUCCESS',
      }
    
    const [facialRecognitionAvailable, setFacialRecognitionAvailable] = React.useState(false);
    const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
    const [irisAvailable, setIrisAvailable] = React.useState(false);
    const [isloading, setIsLoading] = React.useState(false);
    const [result, setResult] = React.useState<EResult>();
    
    const checkSupportedAuthentication = async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types && types.length) {
        setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
        setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
        setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
        }
    };
    
    const authenticate = async () => {
   
        try {
        const results = await LocalAuthentication.authenticateAsync();
    
        if (results.success) {
            setResult(EResult.SUCCESS);
            await asyncStore.setLoginMode(isSwitchOn?'sign':'unsign');
            navigation.navigate("OnBoarding")
        } else if (results.error === 'unknown') {
            setResult(EResult.DISABLED);
        } else if (
            results.error === 'user_cancel' ||
            results.error === 'system_cancel' ||
            results.error === 'app_cancel'
        ) {
            setResult(EResult.CANCELLED);
        }
        } catch (error) {
        setResult(EResult.ERROR);
        }
    };
    

    React.useEffect(()=>{
        const asyncRun = async()=>{
            setIsLoading(true);
            const mode = await asyncStore.getLoginMode();
            setSign(mode); 
            
            if(mode == 'unsign') {
                navigation.navigate("OnBoarding");
            }

            if(mode == 'sign') {
                authenticate();
            }
            setIsLoading(false);
        }
        asyncRun();
    },[])
 
    let resultMessage;
    switch (result) { 
        case EResult.CANCELLED:
        resultMessage = 'Authentication process has been cancelled';
        break;
        case EResult.DISABLED:
        resultMessage = 'Biometric authentication has been disabled';
        break;
        case EResult.ERROR:
        resultMessage = 'There was an error in authentication';
        break;
        case EResult.SUCCESS:
        resultMessage = 'Successfully authenticated';
        break;
        default:
        resultMessage = '';
        break;
    }
    
    let description;
    if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
        description = 'Authenticate with Face ID, touch ID or iris ID';
    } else if (facialRecognitionAvailable && fingerprintAvailable) {
        description = 'Authenticate with Face ID or touch ID';
    } else if (facialRecognitionAvailable && irisAvailable) {
        description = 'Authenticate with Face ID or iris ID';
    } else if (fingerprintAvailable && irisAvailable) {
        description = 'Authenticate with touch ID or iris ID';
    } else if (facialRecognitionAvailable) {
        description = 'Authenticate with Face ID';
    } else if (fingerprintAvailable) {
        description = 'Authenticate with touch ID ';
    } else if (irisAvailable) {
        description = 'Authenticate with iris ID';
    } else {
        description = 'No biometric authentication methods available';
    }

    const handleSwitch = () =>{
        setIsSwitchOn(!isSwitchOn);  
    }
   
    return (
     sign == ''
      ?<Waiting/>
      :<View className="mt-10 center-y h-full">
          <View>
            <Avatar.Image size={240} source={require("../../assets/icon.png")} />
          </View> 
          <Text className="text-2xl font-semibold mt-5"
          > 隐私保护 </Text>

          <Text className="text-lg mt-8"
          > 使用指纹识别 </Text>
          <Text
            className="text-lg"
          > 保护你的隐私 </Text>

          
          <View className="mx-16 mt-10">
            <View className="between-x w-full bg-primary/70 rounded-full">
            
                <View className="center-x">
                    <Avatar.Icon size={56} icon="fingerprint" className="bg-primary/10" /> 
                    {!isSwitchOn &&  <Avatar.Text size={56} label="X" className="bg-primary/10 -ml-14" /> }
                </View>
                
                <Button mode="contained" className="bg-primary/10"
                    onPress={() => handleSwitch()}>
                    指纹识别
                </Button>
    
                <Switch color='#ffffff' 
                    value={isSwitchOn} 
                    onValueChange={()=>handleSwitch()}
                /> 
            </View>

            <Button className="bg-primary/90 mt-10 mb-20 rounded-full"
                mode="contained" onPress={() => authenticate()}>
                下一步
            </Button>  
          </View>         
        </View>
    );
}

