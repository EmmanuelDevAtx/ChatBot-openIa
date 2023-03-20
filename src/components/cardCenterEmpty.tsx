import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import Rive from 'rive-react-native';

interface cardEmpty{
    styles: {},
    resourceName: string,
    styleBackgroundCard: {}
}
export const CardCenterEmpty=(cardData: cardEmpty)=>{
    return(
        <Card style={cardData.styles}>
             <LinearGradient colors={['#2F3843','#394451']} style={cardData.styleBackgroundCard}>
         <Card.Content >
          <Rive
            resourceName={cardData.resourceName}
            style={{width: 200, height: 200, alignSelf:'center'}}
            />
         </Card.Content>
         </LinearGradient>
            </Card>
    );
}