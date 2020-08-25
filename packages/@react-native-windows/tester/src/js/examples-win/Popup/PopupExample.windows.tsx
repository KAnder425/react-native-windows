/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */

import * as React from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {Popup} from 'react-native-windows';

interface IAnchoredPopupExampleState {
  showPopup: boolean;
  buttonTitle: string;
  touchCount: number;
}

class AnchoredPopupExample extends React.Component<
  {},
  IAnchoredPopupExampleState
> {
  private _textInput: React.RefObject<TextInput>;

  public state: IAnchoredPopupExampleState = {
    showPopup: false,
    buttonTitle: 'Open Popup',
    touchCount: 0,
  };

  public constructor(props: any) {
    super(props);
    this._textInput = React.createRef();
  }

  public render() {
    return (
      <View>
        <Text style={{width: 250}}>The following tests popup Anchor</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{padding: 10, width: 300, height: 32}}>
            Text Input to Anchor popup to:{' '}
          </Text>
          <TextInput style={{height: 32, width: 300}} ref={this._textInput} />
        </View>
        <View style={{justifyContent: 'center', padding: 50}}>
          <Button onPress={this._togglePopup} title={this.state.buttonTitle} />
        </View>
        {this.state.showPopup && (
          <Popup
            isOpen={this.state.showPopup}
            onDismiss={this._onPopupDismissed}
            target={this._textInput.current}
            isLightDismissEnabled={false}
            autoFocus={false}
            horizontalOffset={10}
            verticalOffset={10}>
            <View
              style={{backgroundColor: 'lightgray', width: 200, height: 300}}>
              <Text
                style={{
                  justifyContent: 'center',
                  paddingTop: 10,
                  paddingBottom: 30,
                }}>
                This is a popup
              </Text>
              <Button onPress={this._togglePopup} title="Close" />
              {this.state.touchCount > 0 && (
                <Text>I'm touched ({this.state.touchCount})</Text>
              )}
              <ScrollView>{this._renderTouchables()}</ScrollView>
            </View>
          </Popup>
        )}
      </View>
    );
  }

  _renderTouchables = () => {
    const touchables: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
      touchables.push(
        <TouchableHighlight
          style={{
            paddingTop: 10,
            paddingBottom: 20,
            borderWidth: 1,
            borderColor: '#000000',
          }}
          onPress={this._highlightPressed}
          underlayColor={'rgb(210, 230, 255)'}>
          <View>
            <Text>Click on the touchable</Text>
          </View>
        </TouchableHighlight>,
      );
    }

    return touchables;
  };

  _togglePopup = () => {
    this.setState(state => ({
      buttonTitle: state.showPopup ? 'Open Popup' : 'Close Popup',
      showPopup: !state.showPopup,
      touchCount: 0,
    }));
  };

  _onPopupDismissed = () => {
    this.setState({buttonTitle: 'Open Popup', showPopup: false, touchCount: 0});
  };

  _highlightPressed = () => {
    console.log('Touchable Highlight pressed');
    this.setState({touchCount: this.state.touchCount + 1});
  };
}

interface IPopupPlacementExampleState {
  showPopup: boolean;
}

class PopupPlacementExample extends React.Component<
  {},
  IPopupPlacementExampleState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  public render() {
    return (
      <View style={{width: 500, height: 500}}>
        <Button onPress={this._togglePopup} title={'Toggle popup'} />
        {this.state.showPopup && (
          <Popup
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
            isOpen={this.state.showPopup}
            onDismiss={this._onPopupDismissed}
            isLightDismissEnabled={false}>
            <View style={{backgroundColor: 'lightgray', flex: 1}}>
              <Text>This is a popup</Text>
              <Button onPress={this._togglePopup} title="Toggle popup" />
              <Button onPress={this._noop} title="This is a button" />
            </View>
          </Popup>
        )}
      </View>
    );
  }

  _togglePopup = () => {
    this.setState(state => ({
      showPopup: !state.showPopup,
    }));
  };

  _onPopupDismissed = () => {
    this.setState({showPopup: false});
  };

  _noop = () => {
    return;
  };
}

export const displayName = (_undefined?: string) => {};
export const title = 'Popup';
export const category = 'UI';
export const description =
  'Displays content on top of existing content, within the bounds of the application window.';
export const examples = [
  {
    title: 'Popup Anchor to text input w/ light dismiss',
    render: function(): JSX.Element {
      return <AnchoredPopupExample />;
    },
  },
  {
    title: 'Popup centered on screen',
    render: function(): JSX.Element {
      return <PopupPlacementExample />;
    },
  },
];
