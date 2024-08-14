import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react' 
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
    useWarmUpBrowser();
    return (
        <View style={styles.container}>
           <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, {marginBottom: 30}]}/>
           <TouchableOpacity style={defaultStyles.btn}>
            <Text style={defaultStyles.btnText}>Continue</Text>
           </TouchableOpacity>
           <View style={styles.seperatorView}>
            <View style={{
                flex: 1,
                borderBlockColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
            <Text style={styles.seperator}>or</Text>
            <View style={{
                flex: 1,
                borderBlockColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
           </View>
           <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26
    },
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey,
    }
})
export default Page