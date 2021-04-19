import React from 'react';
import { FlatList, Button, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { modifyAccountType, searchAccountByMail, getAllAccounts } from "../../actions/UserActions";
import { Card } from 'react-native-elements'

function AllAccountsScreen({ navigation }) {
    const dispatch = useDispatch();
    const [emailToFind, setEmailToFind] = React.useState("");
    const [accountSearched, setAccountSearched] = React.useState();
    const [typeChoosen, setTypeChoosen] = React.useState();

    const changeAccountType = () => {
        console.log("changeAccountType - ", accountSearched._id, typeChoosen);
        dispatch(modifyAccountType(accountSearched._id, typeChoosen));
    };

    const searchAccount = () => {
        console.log("AllAccounts - searchAccount : ", emailToFind)
        dispatch(searchAccountByMail(emailToFind));
    };

    React.useEffect(() => {
        dispatch(getAllAccounts());
    }, []);

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


            <h1> state accountSearched userType : {accountSearched ? accountSearched.accountType : null} </h1>

            {/* <Card>
                <h2> Voici la liste des comptes</h2>
                <FlatList
                    data={accountsSimulatedArray}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                // extraData={selectedId} // Add a state selected to update whitout recharging the page
                />
            </Card> */}
        </View>
    );

      /**
     * View of a list element
     */
    // const renderItem = ({ item }) => (
    //     <View style={{ flexDirection: 'row' }}>
    //         <Text> {item.accountMail} </Text>
    //         <Text> {item.accountType} </Text>
    //         <Button title="Rendre partenaire" onPress={() => changeAccountType(item._id, "partner")} />
    //     </View>
    // );
}

export default AllAccountsScreen;