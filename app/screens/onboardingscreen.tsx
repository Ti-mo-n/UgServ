import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';
import { setItem } from '@/utils/asyncStorage';
// import LottieView from 'lottie-react-native';

const {width, height}= Dimensions.get('window');

export default function onboardingscreen() {
    const router = useRouter();

    const handleDone= () => {
        router.replace('/maps');
        setItem('onboarded', '1');
    }

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
            <Text>Done</Text>
        </TouchableOpacity>
        )        
    }
    return  (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                bottomBarHighlight={false}
                containerStyles={{paddingHorizontal: 15}}
                pages={[
                    {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottle}>
                            <Text>Hello world</Text>
                            {/* <LottieView source={require('../path/to/animation.json')} autoPlay loop /> */}
                        </View>
                    ),
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Text>Hello world</Text>
                            </View>
                        ),
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                        },
                        {
                            backgroundColor: '#fff',
                            image: (
                                <View>
                                    <Text>Hello world</Text>
                                </View>
                            ),
                            title: 'Onboarding',
                            subtitle: 'Done with React Native Onboarding Swiper',
                            },
                    ]}
            />          
        </View>
        // <View>
        //     <Text>onboarding</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottle: {
        width: width*0.09,
        height: width*0.09
    },
    doneButton: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 100 ,
        borderBottomLeftRadius: 100 ,
    }
})