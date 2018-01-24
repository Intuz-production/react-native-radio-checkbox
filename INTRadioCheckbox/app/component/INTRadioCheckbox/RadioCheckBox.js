// Copyright (C) 2018 INTUZ. 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
// THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';
import React, {Component} from "react";
import {View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import styles from './styles'
import PropTypes from 'prop-types';

const propTypes = {
    checkOptions: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    listStyle: View.propTypes.style,
    optionLabel:Text.propTypes.style,
    optionStyle: Text.propTypes.style,
    maxSelected: PropTypes.number,
    onSelectionChange: PropTypes.func,
    isHorizontal: PropTypes.bool,
    optionIndicator:View.propTypes.style,
    checkIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    unCheckIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

const defaultProps = {
    checkOptions: [],
    disabled: false,
    listStyle: {},
    optionStyle: {},
    onSelectionChange(option) {},
    isHorizontal: false,
    optionLabel:{},
    optionIndicator:{},
    checkIcon: require('../../images/ic_check.png'),
    unCheckIcon: require('../../images/ic_uncheck.png'),
};

export default class RadioCheckBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedList: []
        };
    }

    /**
     * To manage selected list
     */
    setSelectedList()
    {
        const selectedList = [];
        for (let i = 0; i < this.props.checkOptions.length; i++) {
            if (this.props.checkOptions[i].selected == 1) {
                if (this.props.maxSelected != undefined) {
                    if (selectedList.length < this.props.maxSelected) {
                        selectedList.push(i);
                    }
                } else {
                    selectedList.push(i);
                }
            }
        }
        this.setState({selectedList: selectedList});
    }

    componentWillReceiveProps(nextProps) {}

    /**
     * To clear all selected options
     */
    clearAllSelection()
    {
        this.setState({selectedList: []})
    }

    /**
     * To select all options
     */
    selectAllOptions()
    {
        const selectedList = [];
        for (let i = 0; i < this.props.checkOptions.length; i++) {
            selectedList.push(i);
        }
        this.setState({selectedList: selectedList});
    }

    /**
     * Select options based on provided index list
     * @param {Array of selected index} selectedIndexes 
     */
    setSelectedOptions(selectedIndexes)
    {
        var selectedList = this.state.selectedList;
        for (let i = 0; i < selectedIndexes.length; i++) {
            if(this.state.selectedList.indexOf(selectedIndexes[i])==-1)
            {
                selectedList.push(selectedIndexes[i]);
            }
        }
        this.setState({selectedList: selectedList});
    }

    /**
     * Function that provides list of selected item objects
     */
    getSelectedOptions = function (completion) {
        var selectedOptions = [];
        for (let i = 0; i < this.state.selectedList.length; i++) {
            selectedOptions.push(this.props.checkOptions[this.state.selectedList[i]])
        }
        completion(selectedOptions)

    };

    /**
     * To check selected number of items  should be less than provided maxSelected
     */
    checkMaxSelection()
    {
        const maxSelected = this.props.maxSelected;
        const selectedList = this.state.selectedList;
        if (maxSelected && selectedList.length > 0 && selectedList.length >= maxSelected) {
            selectedList.splice(0, 1);
        }
        this.setState({selectedList: selectedList})
    }

    componentDidMount()
    {
        this.setSelectedList();
    }


    /**
     * To check whether provided item is selected or not
     * @param {*} option 
     */
    _isSelected(option)
    {
        return this
            .state
            .selectedList
            .indexOf(option.index) !== -1;
    }

    /**
     * Handle click event of option
     * @param {*} option 
     */
    _selectOption(option)
    {
        const selectedList = this.state.selectedList;
        if (this._isSelected(option)) {
            selectedList.splice(selectedList.indexOf(option.index), 1);
        } else {
            this.checkMaxSelection();
            selectedList.push(option.index);
        }
        this.setState({selectedList: selectedList});
        this
            .props
            .onSelectionChange(option.item);
    }

    //render icons 
    _renderCheckIcon(rowdata)
    {
        if (this._isSelected(rowdata)) {
            // if (this.props.checkIcon != undefined) {
            //     return (<Image source={this.props.checkIcon} style={[styles.optionIndicator,this.props.optionIndicator]}/>);
            // } else {
            //     return (<Image
            //         source={require('./images/ic_check.png')}
            //         style={[styles.optionIndicator,this.props.optionIndicator]}/>);
            // }
            return (<Image source={this.props.checkIcon} style={[styles.optionIndicator,this.props.optionIndicator]}/>);
        } else {
            // if (this.props.unCheckIcon != undefined) {
            //     return (<Image source={this.props.unCheckIcon} style={[styles.optionIndicator,this.props.optionIndicator]}/>);
            // } else {
            //     return (<Image
            //         source={require('./images/ic_uncheck.png')}
            //         style={[styles.optionIndicator,this.props.optionIndicator]}/>);
            // }
            return (<Image source={this.props.unCheckIcon} style={[styles.optionIndicator,this.props.optionIndicator]}/>);
        }
    }

    //render text
    _renderText(rowdata)
    {
        return (
            <Text style={[styles.optionLabel,this.props.optionLabel]}>{rowdata.item.label}</Text>
        );
    }

    renderSeparator = () => {
        return (<View
            style={{
            height: 5,
            backgroundColor: '#00000000'
        }}/>);
    };

    renderListItem(rowData)
    {
        return (
            <TouchableOpacity
                style={[styles.optionStyle, this.props.optionStyle]}
                activeOpacity={this.props.disabled
                ? 1
                : 0.7}
                onPress={!this.props.disabled
                ? () => {
                    this._selectOption(rowData)
                }
                : null}>
                <View >{this._renderCheckIcon(rowData)}</View>
                <View >{this._renderText(rowData)}</View>
            </TouchableOpacity>
        );
    }


    render()
    {
        console.log("selected list>>>",this.state.selectedList)
        return (
            <View>
                <FlatList
                    horizontal={this.props.isHorizontal}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[styles.listStyle, this.props.listStyle]}
                    data={this.props.checkOptions}
                    renderItem={this
                    .renderListItem
                    .bind(this)}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}ItemSeparatorComponent={this.renderSeparator}/>
            </View>
        );
    }
}

RadioCheckBox.propTypes = propTypes;
RadioCheckBox.defaultProps = defaultProps;
module.exports = RadioCheckBox;
