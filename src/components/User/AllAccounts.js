import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { modifyAccountType, searchAccountByMail, getAllAccounts } from "../../actions/UserActions";
import { Card } from 'react-native-elements'

function AllAccountsScreen({ navigation }) {
    const dispatch = useDispatch();
    const [emailToFind, setEmailToFind] = React.useState("");
    const [typeChoosen, setTypeChoosen] = React.useState();
    const accountSearched = useSelector(state => state.ModifyType.accountSearched);

    const changeAccountType = () => {
        console.log("changeAccountType - ", accountSearched._id, typeChoosen);
        if (typeChoosen != "admin") {
            dispatch(modifyAccountType(accountSearched._id, typeChoosen));
        } else {
            console.log("error : cant create admin")
        }
    };

    const searchAccount = () => {
        console.log("AllAccounts - searchAccount : ", emailToFind)
        dispatch(searchAccountByMail(emailToFind));
    };

    /*
    React.useEffect(() => {
    }, []);
    */

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

                {/* S'affiche uniquement si accountSearched est non nul */}
                {accountSearched && <View>
                    <h4> {accountSearched.accountMail} est un compte {accountSearched.accountType} </h4>
                    {
                        (accountSearched.accountType == "admin")
                            ? (<Card>
                                <Text>Ce compte est administrateur, vous ne pouvez pas le modifier</Text>
                            </Card>
                            )
                            : (<Card>
                                <Text>Modifier le type de compte ?</Text>
                                <TextInput
                                    placeholder="partner or client"
                                    value={typeChoosen}
                                    onChangeText={setTypeChoosen}
                                />
                                <Button title="Valider" onPress={changeAccountType} />
                            </Card>
                            )
                    }
                </View>
                }
            </Card>
        </View>
    );
}

export default AllAccountsScreen;