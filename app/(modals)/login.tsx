import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react' 
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
    Google = 'oauth_google',
}

const Page = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({strategy: 'oauth_google'});

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            if (createdSessionId) {
                setActive!({ session: createdSessionId })
                router.back(); 
            } 
        } catch (err) {
            console.error('OAuth error', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign into My Application</Text>
            <Text style={styles.subtitle}>Welcome back! Please sign in to continue</Text>
            
            <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                <Ionicons name='logo-google' size={20} color="#fff" style={styles.btnIcon} />
                <Text style={styles.btnOutlineText}>Continue with Google</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E', // Dark background
        padding: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF', // White text
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93', // Light gray text
        marginBottom: 30,
    },
    btnOutline: {
        backgroundColor: '#0A84FF', // Blue button
        height: 50,
        borderRadius: 25, // More rounded corners
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        width: '100%',
    },
    btnOutlineText: {
        color: '#FFFFFF', // White text
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    btnIcon: {
        marginRight: 10,
    },
})

export default Page