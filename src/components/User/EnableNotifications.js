import React from 'react';
import { Button, Card, useTheme, Text } from 'react-native-elements';
import { View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addPushToken } from "../../actions/UserActions";
import * as Notifications from 'expo-notifications';
import { customInfiniteErrorAlert, wrongInputsAlert, customLongSuccessAlert } from "../Utils/Alerts";
import Constants from 'expo-constants';

function EnableNotificationsScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.User.user)
    const errorAddPushToken = useSelector(state => state.User.errorAddPushToken);

    React.useEffect(() => {
        if (errorAddPushToken) {
            customInfiniteErrorAlert(errorAddPushToken);
        }
    }, [errorAddPushToken])

    const registerForPushNotificationsAsync = async () => {
        //Check if the user is really on a mobile
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                console.log(" >>> Autorisation déjà obtenue");
            }
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                customInfiniteErrorAlert('Failed to get push token for push notification!');
                return;
            }
            //Now that the permission is accorded, we ask for the token
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            customLongSuccessAlert('Permission ok !');
            dispatch(addPushToken(user.user._id, token));
        } else {
            customErrorAlert('Must use physical device for Push Notifications');
        }
        // Default things needed
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card containerStyle={{ width: '99%', height: '99%' }}>
                <Card.Title>Vous n'avez pas encore autorisé les notifications ?</Card.Title>
                <Text>
                    Cette application a pour principal but de vous envoyer des notifications, ce serait dommage de passer à côté !
                </Text>
                <Button
                    title="Activer les notifications"
                    onPress={() => registerForPushNotificationsAsync()}
                />
            </Card>
        </View>

    );
}

export default EnableNotificationsScreen;