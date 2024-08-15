import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react' 
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
    Google= 'oauth_google',
    
}

const Page = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({strategy: 'oauth_google'});
    // const { startOAuthFlow: appleAuth } = useOAuth({strategy: 'oauth_apple'});
    // const { startOAuthFlow: facebookAuth } = useOAuth({strategy: 'oauth_facebook'});

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            console.log(". ~ file: login.tsx:31 ~ createdSessionId:", createdSessionId);

            if (createdSessionId) {
                setActive!({ session: createdSessionId })
                router.back(); 
            } 
            }catch (err) {
                console.error('OAuth error', err);
        }
    };

    return (
        <View style={styles.container}>
           
            <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                <Ionicons name='logo-google' size={24} style={defaultStyles.btnIcon} />
                <Text style={styles.btnOutlineText}>Signin with Google</Text>
            </TouchableOpacity>
            <View style={styles.seperatorView}>
            <View style={{
                flex: 1,
                borderBlockColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
            
            <View style={{
                flex: 1,
                borderBlockColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
           </View>

            
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
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb',        
    },
})
export default Page