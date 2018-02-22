import React, { Component } from 'react';
import styled, { css } from 'styled-components/native';
import { connect } from 'react-redux'
import { View, Dimensions } from 'react-native';
import { ListView } from 'rc-react-shared/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { blue } from 'rc-mobile-base/lib/styles';
import ActionButton from 'react-native-action-button';

import TableHeader from '../../components/TableHeader';
import AuditRow from '../../components/AuditRow';

import { allAudits } from './selectors';

const Container = styled.View`
  flex: 1;
  padding-vertical: 20;
  padding-horizontal: 40;
  background-color: #F2F2F2;

  ${props => props.narrow && css`
    padding-horizontal: 15;
  `}
`

class AuditsScene extends Component {
  navigateAudit = (audit) => {
    const navigation = this.props.navigation
    if (audit.status === 'completed') {
      return
    }
    return navigation.navigate('AuditEdit', { audit })
  }

  componentWillMount() {
    const { width, height } = Dimensions.get('window')
    this.width = width
    this.height = height
  }

  render() {
    const { audits } = this.props
    const narrow = this.width <= 500

    return (
      <View testID="audits" style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: narrow ? 15 : 40,
        backgroundColor: '#F2F2F2',
      }}>
        {
          audits && audits.length > 0 ? (
            <ListView
              data={audits}
              renderRow={(audit) => (
                <AuditRow
                  {...audit}
                  card={narrow}
                  testID={audit.name}
                  onPress={() => this.navigateAudit(audit)}
                >
                  <AuditRow.Action card={narrow} status={audit.status} onPress={() => this.navigateAudit(audit)} />
                </AuditRow>
              )}
              getSectionId={(audit) => {
                return audit && audit.status || 'open'
              }}
              renderSectionHeader={(section) => {
                return (
                  <TableHeader testID={`audit_section_${section}`} value={`${section}-audits`} />
                )
              }}
            />
          ) : null
        }
        <ActionButton
          testID="auditAction"
          hideShadow
          buttonColor={blue.color}
          offsetY={10}
          onPress={() => this.props.navigation.navigate('AuditAssign')}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  audits: allAudits(state)
})

export default connect(mapStateToProps)(AuditsScene);
