import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';
import { setItem } from '@/utils/asyncStorage';
import { Checkbox } from 'react-native-paper'; // You may need to install react-native-paper if not already installed

const { width, height } = Dimensions.get('window');

interface DoneButtonProps {
  isLastStep?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export default function onboardingscreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox

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
        <Text style={{ color: disabled ? '#ccc' : '#000' }}>Done</Text>
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
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottle}>
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
            title: 'Select Your Role',
            subtitle: <RoleSelection />,
          },
          {
            backgroundColor: '#fff',
            image: (
              <View>
                <Text>Hello world</Text>
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
    backgroundColor: 'white',
  },
  lottle: {
    width: width * 0.09,
    height: width * 0.09,
  },
  doneButton: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  roleButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: width * 0.35,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#d3d3d3',
  },
  roleButtonText: {
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  termsText: {
    marginLeft: 10,
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
});
