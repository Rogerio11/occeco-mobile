import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { modifyAccountType, searchAccountByMail } from "../../actions/UserActions";
import { Card, CheckBox } from 'react-native-elements';
import { acc } from 'react-native-reanimated';

function ModifyAccountType({ navigation }) {
    const dispatch = useDispatch();
    const [emailToFind, setEmailToFind] = React.useState("");
    const [partnerAccount, setPartnerAccount] = React.useState(false);
    const accountSearched = useSelector(state => state.ModifyType.accountSearched);
    
    React.useLayoutEffect(() => {
        if (accountSearched) {
            setPartnerAccount(accountSearched.accountType === "partner");
        }
    });

    const changeAccountType = async () => {
        var aType = "client"
        if (!partnerAccount){
            aType = "partner"
        }
        dispatch(modifyAccountType(accountSearched._id, aType));
    };

    const searchAccount = () => {
        dispatch(searchAccountByMail(emailToFind));
    };

    return (
        <View>
            <Card>
                <h2> Formulaire de modification d'un compte</h2>
                <TextInput
                    placeholder="put a mail here"
                    value={emailToFind}
                    onChangeText={setEmailToFind}
                />
                <Button title="Rechercher" onPress={searchAccount} />

                {/* S'affiche uniquement si accountSearched est non nul et correspond au compte recherché*/}
                {accountSearched && emailToFind == accountSearched.accountMail && <View>
                    <h4> {accountSearched.accountMail} est un compte {accountSearched.accountType} </h4>
                    {
                        (accountSearched.accountType === "admin")
                            ? (<Card>
                                <Text>Ce compte est administrateur, vous ne pouvez pas le modifier</Text>
                            </Card>
                            )
                            : (<Card>
                                <Text>Modifier le type de compte ?</Text>
                                <CheckBox
                                title='Compte partenaire'
                                checked={partnerAccount}
                                onPress={() => changeAccountType()}
                                />
                            </Card>
                            )
                    }
                </View>
                }
            </Card>
        </View>
    );
}

export default ModifyAccountType;