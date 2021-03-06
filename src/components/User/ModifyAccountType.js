import React from 'react';

import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { modifyAccountType, searchAccountByMail } from "../../actions/UserActions";
import { Card, CheckBox, Button, Text, Input, Icon, useTheme, Divider } from 'react-native-elements';
import { wrongInputsAlert } from "../Utils/Alerts";


function ModifyAccountType({ navigation }) {
    const user = useSelector(state => state.User); // Auth
    const dispatch = useDispatch();
    const [emailToFind, setEmailToFind] = React.useState("");
    const [partnerAccount, setPartnerAccount] = React.useState(false);
    const accountSearched = useSelector(state => state.ModifyType.accountSearched);
    const errorGetByMail = useSelector(state => state.User.errorGetByMail);
    const errorChangeType = useSelector(state => state.User.errorChangeType);
    const { theme } = useTheme();

    React.useLayoutEffect(() => {
        if (accountSearched) {
            setPartnerAccount(accountSearched.accountType === "partner");
        }
    });

    const changeAccountType = async () => {
        var aType = "client"
        if (!partnerAccount) {
            aType = "partner"
        }
        dispatch(modifyAccountType(accountSearched._id, aType));
    };

    const searchAccount = () => {
        if (!emailToFind) {
            wrongInputsAlert()
        } else {
            dispatch(searchAccountByMail(emailToFind));
        }
    };

    const styles = StyleSheet.create({
        highlightedText: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: "center"
        },
    });

    return (
        <View>
            <Card>
                <Icon
                    name='user-cog'
                    type='font-awesome-5'
                    color='purple'
                />
                <Text h3> Gérer les partenaires</Text>
                <Input
                    placeholder="put a mail here"
                    leftIcon={{ type: 'feather', name: 'mail' }}
                    value={emailToFind}
                    onChangeText={setEmailToFind}
                />
                <Button title="Rechercher" onPress={searchAccount} />
                {errorGetByMail && <Text style={theme.errorText}> {errorGetByMail} </Text>}

            </Card>


            {/* S'affiche uniquement si accountSearched est non nul et correspond au compte recherché*/}
            {accountSearched && emailToFind.toLowerCase() == accountSearched.accountMail && <Card>
                <View>
                    {(accountSearched.accountType == 'partner' || accountSearched.accountType == 'admin')
                        ? <Text style={styles.highlightedText}> {accountSearched.accountMail}{"\n"}est un compte partenaire !</Text>
                        : <Text style={styles.highlightedText}> {accountSearched.accountMail}{"\n"}n'est pas un compte partenaire !</Text>
                    }
                    <Divider />
                    {
                        (accountSearched.accountType === "admin")
                            ? (<View>
                                <Text>Ce compte est administrateur, vous ne pouvez pas le modifier</Text>
                            </View>
                            )
                            : (<View>
                                <Text>Modifier le type de compte ?</Text>
                                <CheckBox
                                    title='Compte partenaire'
                                    checked={partnerAccount}
                                    onPress={() => changeAccountType()}
                                />
                                {errorChangeType && <Text style={theme.errorText}> {errorChangeType} </Text>}
                            </View>
                            )
                    }
                </View>
            </Card>
            }
        </View>
    );
}

export default ModifyAccountType;