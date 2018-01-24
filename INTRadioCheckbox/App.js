
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import RadioCheckBox from './app/component/INTRadioCheckbox/RadioCheckBox';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        message:'',
    };

}

  onSelectionChange(option)
  {
   
    this.setState({
      message: option.label + " value change"
    });
  }
  onSelectAllClick()
  {
    this.refs.radioCheckbox.selectAllOptions();
  }
  onClearClick()
  {
    this.refs.radioCheckbox.clearAllSelection();
  }
  onGetAllClick()
  {
    this.refs.radioCheckbox.getSelectedOptions((options)=>{

      console.log("onGetAllClick",options);
      
      var message='';
      for(let i=0;i<options.length;i++)
      {
        if(options[i]!=undefined)
        {
          message=message + options[i].label+'\n';
        }
        
      }
      this.setState({message:message});
      
    });
  }
  setSelected()
  {
    var selected=[];
    selected.push(1);
    selected.push(3);
    this.refs.radioCheckbox.setSelectedOptions(selected);
  }
  render() {
    return (
      <View style={{ flex: 1, margin: 10, marginTop: 30 , backgroundColor:'white' }}>

<RadioCheckBox checkOptions={[
          { label: 'Checkbox1',selected:0},
          { label: 'Checkbox2',selected:1 },
          { label: 'Checkbox3',selected:0},
          { label: 'Checkbox4',selected:1 }
        ]} 
        ref={"radioCheckbox"}
        maxSelected={1}
        onSelectionChange={(option)=>this.onSelectionChange(option)}></RadioCheckBox>
      
        <Text style={{marginTop:40,textAlign:'center'}}>{this.state.message}</Text>

        <TouchableOpacity onPress={()=>this.onSelectAllClick()}><Text style={{marginTop:40,textAlign:'center'}}>Select All</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onClearClick()}><Text style={{marginTop:40,textAlign:'center'}}>Clear</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onGetAllClick()}><Text style={{marginTop:40,textAlign:'center'}}>Get Selected</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setSelected()}><Text style={{marginTop:40,textAlign:'center'}}>Set Selected</Text></TouchableOpacity>
      </View>
    );
  }
}