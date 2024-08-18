import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';
import { setItem } from '@/utils/asyncStorage';
import { Checkbox } from 'react-native-paper';
import LottieView from 'lottie-react-native';


const { width, height } = Dimensions.get('window');

interface DoneButtonProps {
  isLastStep?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export default function onboardingscreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleDone = () => {
    if (selectedRole && isChecked) {
      setItem('role', selectedRole);
      setItem('onboarded', '1');
      router.replace('/maps');
    }
  };

  const DoneButton: React.ComponentType<DoneButtonProps> = (props) => {
    const disabled = !selectedRole || !isChecked;

    return (
      <TouchableOpacity
        style={[styles.doneButton, disabled && styles.disabledButton]}
        {...props}
        disabled={disabled}
      >
        <Text style={{ color: disabled ? '#8E8E93' : '#FFFFFF' }}>Done</Text>
      </TouchableOpacity>
    );
  };

  const RoleSelection = () => (
    <View style={styles.roleContainer}>
      <TouchableOpacity
        style={[styles.roleButton, selectedRole === 'Client' && styles.selectedButton]}
        onPress={() => setSelectedRole('Client')}
      >
        <Text style={styles.roleButtonText}>Client</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.roleButton, selectedRole === 'Provider' && styles.selectedButton]}
        onPress={() => setSelectedRole('Provider')}
      >
        <Text style={styles.roleButtonText}>Provider</Text>
      </TouchableOpacity>
    </View>
  );

  const TermsAndConditions = () => (
    <View style={styles.termsContainer}>
      <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => setIsChecked(!isChecked)}
        color='#0A84FF'
        uncheckedColor='#0A84FF'
      />
      <TouchableOpacity onPress={() => router.push('/terms')}>
        <Text style={styles.termsText}>I agree to the set terms and conditions</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        showSkip={false}
        DoneButtonComponent={DoneButton}
        bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pageIndexCallback={(index) => console.log(index)}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        pages={[
          {
            backgroundColor: '#1C1C1E',
            image: (
              <View >
                 <Text style={styles.lottleText}>App logo</Text>
              </View>
            ),
            title: 'UgServ',
            subtitle: 'Leading Service Provider App in Uganda',
          },
          {
            backgroundColor: '#1C1C1E',
            image: (
              <View style={styles.lottle}>
                 <LottieView source={require('@/assets/animations/usertype.json')} autoPlay loop style={styles.lottle} />
              </View>
            ),
            title: 'Select Your Role',
            subtitle: <RoleSelection />,
          },
          {
            backgroundColor: '#1C1C1E',
            image: (
              <View style={styles.lottle}>
                <LottieView source={require('@/assets/animations/tandc2.json')} autoPlay loop style={styles.lottle} />
              </View>
            ),
            title: 'Agree to Terms',
            subtitle: <TermsAndConditions />,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  lottle: {
    width: width * 0.9,
    height: width ,
  },
  lottleText: {
    color: '#FFFFFF',
  },
  doneButton: {
    padding: 20,
    backgroundColor: '#0A84FF',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  disabledButton: {
    backgroundColor: '#3A3A3C',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  roleButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#0A84FF',
    borderRadius: 25,
    width: width * 0.35,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#0A84FF',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  termsText: {
    marginLeft: 10,
    color: '#0A84FF',
    textDecorationLine: 'underline',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8E8E93',
  },
});