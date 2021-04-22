import React from 'react';
import { Icon } from 'react-native-elements';

const iconList = [
    {label: 'Bacterie', value: 'bacteria', icon: () => <Icon name="bacteria" type="material-community" size={18} />, },
    {label: 'Feuille', value: 'barley', icon: () => <Icon name="barley" type="material-community" size={18} />, },
    {label: 'Abeille', value: 'bee', icon: () => <Icon name="bee" type="material-community" size={18} />, },
    {label: 'Abeille-Fleur', value: 'bee-flower', icon: () => <Icon name="bee-flower" type="material-community" size={18} />, },
    {label: 'Bio', value: 'bio', icon: () => <Icon name="bio" type="material-community" size={18} />, },
    {label: 'Arbre', value: 'pine-tree', icon: () => <Icon name="pine-tree" type="material-community" size={18} />, },
    {label: 'Poubelle', value: 'delete', icon: () => <Icon name="delete" type="material-community" size={18} />, },
    {label: 'Goutte', value: 'water', icon: () => <Icon name="water" type="material-community" size={18} />, },
    {label: 'Température', value: 'thermometer', icon: () => <Icon name="thermometer" type="material-community" size={18} />, },
]

export default iconList