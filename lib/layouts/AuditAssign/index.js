import React, { Component } from 'react';
import styled, { css } from 'styled-components/native';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux'
import {
  green,
  orange,
  greyDk,
  grey,
} from 'rc-mobile-base/lib/styles';
import { ListView } from 'rc-react-shared/native';
import SelectLocation from '../CreateTask/SelectLocation';

import { AuditSources, Audits } from 'rc-mobile-base/lib/models';

import AuditRow from '../../components/AuditRow';

import { locationsSelector } from '../CreateTask/selectors';
import { selectedLocation } from './selectors';

const Container = styled.View`
  flex: 1;
  padding-vertical: 20;
  padding-horizontal: 40;
  background-color: #F2F2F2;
`

const Content = styled.View`
`

const Label = styled.Text`
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18;
  color: ${greyDk.color};
`

const Bottom = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Start = styled.TouchableOpacity`
  background: ${green.color};
  height: 45;
  padding: 20px 50px;
  margin: 0 5px;
  border-radius: 5;
  justify-content: center;

  ${props => props.disabled && css`
    background-color: #B4B4B4;
  `}
`

const Assign = styled.TouchableOpacity`
  background: ${orange.color};
  height: 45;
  padding: 20px 50px;
  margin: 0 5px;
  border-radius: 5;
  justify-content: center;

  ${props => props.disabled && css`
    background-color: #B4B4B4;
  `}
`

const BtnText = styled.Text`
  font-weight: 600;
  font-size: 18;
  color: #FFF;
`

class AuditAssignScene extends Component {
  state = {
    selectedAudit: null
  }

  handleSelect = (audit) => {
    this.setState({ selectedAudit: audit })
  }

  navigateAudit = () => {
    const { selectedLocation, navigation } = this.props
    const selectedAudit = this.state.selectedAudit
    const disabled = !selectedAudit
    
    if (disabled) {
      return
    }

    navigation.navigate('Audit', {
      audit: selectedAudit,
      consumption_id: selectedLocation && selectedLocation._id,
      consumption_type: 'Room'
    })
  }

  auditAssign = () => {
    const { selectedLocation, assignAudit, navigation } = this.props
    const selectedAudit = this.state.selectedAudit
    const disabled = !selectedAudit
    
    if (disabled) {
      return
    }

    assignAudit({
      audit_source_id: selectedAudit.id,
      consumption_id: selectedLocation && selectedLocation._id,
      consumption_type: "Room",
      name: selectedAudit.name,
    })
    navigation.goBack()
  }

  render() {
    const { audits, locations, selectedLocation, assignAudit } = this.props
    const selectedAudit = this.state.selectedAudit

    const mappedAudits = audits.map(audit => ({
      ...audit,
      isSelected: selectedAudit && selectedAudit.id === audit.id
    }))

    const disabled = !selectedAudit

    return (
      <Container testID="assignAudit">
        <ScrollView>
          <Content>
            <Label>
              SELECT LOCATION (OPTIONAL)
            </Label>

            <SelectLocation multiple={false} locations={locations} />

            <Label>
              SELECT AUDIT
            </Label>

            <ListView
              testID="selectAudit"
              data={mappedAudits}
              renderRow={(audit) => (
                <AuditRow
                  {...audit}
                  source
                  onPress={() => this.handleSelect(audit)}
                >
                  {
                    audit.isSelected ? (
                      <AuditRow.Checkmark />
                    ) : null
                  }
                </AuditRow>
              )}
            />
          </Content>
        </ScrollView>

        <Bottom>
          <Assign
            testID="assignAuditAction"
            disabled={disabled}
            onPress={this.auditAssign}
          >
            <BtnText>
              ASSIGN AUDIT
            </BtnText>
          </Assign>
          <Start
            disabled={disabled}
            onPress={this.navigateAudit}
          >
            <BtnText>
              START AUDIT
            </BtnText>
          </Start>
        </Bottom>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  audits: AuditSources.all()(state),
  locations: locationsSelector(state),
  selectedLocation: selectedLocation(state),
})

const mapDispatchToProps = (dispatch) => ({
  assignAudit: (data) => dispatch(Audits.insert.tap(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditAssignScene);
