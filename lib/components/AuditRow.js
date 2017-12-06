import React, { Component } from 'react';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  green,
  greyDk,
  red,
  orange,
  blueLt,
} from 'rc-mobile-base/lib/styles';
import moment from 'moment';
import I18n from 'react-native-i18n';

const AuditWrapper = styled.TouchableOpacity`
  flex-direction: row;
  overflow: hidden;
  background-color: #fff;
  padding: 10px;
  height: 60;
  margin-top: 5px;
  margin-bottom: 0px;
  align-items: center;

  shadow-color: #000000;
  shadow-radius: 2;
  shadow-opacity: 1.0;
  shadow-offset: 3px;
`

const Name = styled.Text`
  flex: 1;
  font-size: 16;
  color: #222222;
  font-weight: bold;
  margin-left: 20;
`

const Description = styled.Text`
  font-size: 14;
  color: #222222;
  margin-left: 10;
  margin-right: 15;
`

const ConsumptionName = styled.Text`
  font-size: 18;
  color: #222222;
`

const Inspections = styled.Text`
  font-size: 14;
  color: #ADADAD;
  margin-right: 20;
`

const Section = styled.View`
  margin-top: 10px;
`

const Button = styled.TouchableOpacity`
  flex-direction: row;
  height: 50px;
  align-items: center;
  justify-content: flex-end;
`

const colors = {
  open: red.color,
  completed: green.color,
  paused: orange.color,
}

const getColor = (status) => colors[status] || greyDk.color

const ButtonText = styled.Text`
  color: ${props => getColor(props.status)};
  margin-right: 10px;
  font-size: 18px;
`

const actions = {
  open: 'start',
  completed: 'review',
  paused: 'resume',
}

const getAction = (status) => actions[status] || "View"

const icons = {
  open: 'play',
  completed: 'refresh',
  paused: 'play',
}

const getIcon = (status) => icons[status] || "play"

const Action = ({ status, ...props }) => (
  <Button {...props}>
    <ButtonText status={status}>
      { I18n.t(`base.ubiquitous.${getAction(status)}`).toUpperCase() }
    </ButtonText>
    <FontAwesome
      name={getIcon(status)}
      color={getColor(status)}
      size={20}
    />
  </Button>
)

const Checkmark = () => <FontAwesome name="check-square-o" size={28} color={blueLt.color} />

const Audit = ({ name, inspections, status, consumptionName, onPress, ...props }) => (
  <AuditWrapper onPress={onPress} {...props}>
    {
      consumptionName ? (
        <ConsumptionName>
          {consumptionName}
        </ConsumptionName>
      ) : (
        <FontAwesome name="building-o" size={24} color={'#1A8CFF'} />
      )
    }
    <Name>
      {name}
    </Name>
    { props.consumption_id ?
      <Description>
        { `${props.responder_name || ""} @ ${moment(props.updated_at).format('lll')}` }
      </Description>
      :null
    }
    {props.children}
  </AuditWrapper>
)

Audit.defaultProps = {
  source: false,
}

Audit.Action = Action
Audit.Checkmark = Checkmark

export default Audit
