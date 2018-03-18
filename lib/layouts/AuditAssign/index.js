import React, { Component } from 'react';
import styled, { css } from 'styled-components/native';
import { ScrollView, Dimensions } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux'
import {
  green,
  orange,
  greyDk,
  grey,
} from 'rc-mobile-base/lib/styles';
import { ListView } from 'rc-mobile-base/lib/components/Audits';
import SelectLocation from '../CreateTask/SelectLocation';
import AssignmentSelect from '../../components/SelectAssignment';
import SectionHeader from '../../components/SectionHeader';

import { AuditSources, Audits } from 'rc-mobile-base/lib/models';

import AuditRow from '../../components/AuditRow';

import { locationsSelector, assignmentSelector} from '../CreateTask/selectors';
import { selectedLocation } from './selectors';

const Container = styled.View`
  flex: 1;
  padding-vertical: 20;
  padding-horizontal: 40;
  background-color: #F2F2F2;

  ${props => props.narrow && css`
    padding-horizontal: 15;
  `}
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
  padding-top: 10px;
`

const Start = styled.TouchableOpacity`
  background: ${green.color};
  height: 45;
  padding: 20px 50px;
  border-radius: 5;
  justify-content: center;

  ${props => props.disabled && css`
    background-color: #B4B4B4;
  `}

  ${props => props.narrow && css`
      padding: 12px;
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

  ${props => props.narrow && css`
      padding: 12px;
  `}
`

const BtnText = styled.Text`
  font-weight: 600;
  font-size: 18;
  color: #FFF;

  ${props => props.narrow && css`
    font-size: 13;
  `}
`

class AuditAssignScene extends Component {
  state = {
    selectedAudit: null,
    selectedAssignments: null,
  }

  handleSelect = (audit) => {
    this.setState({ selectedAudit: audit })
  }

  handleUpdateAssignment = (selectedAssignments) => this.setState({ selectedAssignments })
  handleRemoveAssignment = (id) => {
    this.setState({ selectedAssignments: this.state.selectedAssignments.filter(a => a !== id) })
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
    const { selectedLocation, assignAudit, navigation, assignmentOptions } = this.props
    const selectedAudit = this.state.selectedAudit
    const selectedAssignments = this.state.selectedAssignments
    const disabled = !selectedAudit

    const assigned = assignmentOptions.filter(o => selectedAssignments.includes(o.value))

    if (disabled) {
      return
    }

    assignAudit({
      audit_source_id: selectedAudit.id,
      consumption_id: selectedLocation && selectedLocation._id,
      consumption_type: "Room",
      name: selectedAudit.name,
      assigned: assigned,
    })
    navigation.goBack()
  }

  componentWillMount() {
    const { width, height } = Dimensions.get('window')
    this.width = width
    this.height = height
  }

  render() {
    const { audits, locations, selectedLocation, assignAudit, assignmentOptions } = this.props
    const selectedAudit = this.state.selectedAudit
    const narrow = this.width <= 500

    const mappedAudits = audits.map(audit => ({
      ...audit,
      isSelected: selectedAudit && selectedAudit.id === audit.id
    }))

    const disabled = !selectedAudit

    return (
      <Container testID="assignAudit" narrow={narrow}>
        <ScrollView>
          <Content>
            <SelectLocation multiple={false} locations={locations} />

            <AssignmentSelect
              assignmentOptions={assignmentOptions}
              selectedAssignments={this.state.selectedAssignments || []}
              updateAssignments={this.handleUpdateAssignment}
              removeAssignment={this.handleRemoveAssignment}
              isShowHeader
            />

            <SectionHeader value={ I18n.t('inspector.audits.select-audit') } />
              

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
            narrow={narrow}
            testID="assignAuditAction"
            disabled={disabled}
            onPress={this.auditAssign}
          >
            <BtnText>
              ASSIGN AUDIT
            </BtnText>
          </Assign>
          <Start
            narrow={narrow}
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
  assignmentOptions: assignmentSelector()(state),
})

const mapDispatchToProps = (dispatch) => ({
  assignAudit: (data) => dispatch(Audits.insert.tap(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditAssignScene);
