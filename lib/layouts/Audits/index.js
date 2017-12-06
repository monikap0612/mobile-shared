import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux'
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
`

class AuditsScene extends Component {
  navigateAudit = (audit) => {
    const navigation = this.props.navigation
    if (audit.status === 'completed') {
      return navigation.navigate('AuditShow', { audit })
    }
    return navigation.navigate('AuditEdit', { audit })
  }

  render() {
    const { audits } = this.props
    return (
      <Container testID="audits">
        {
          audits && audits.length > 0 ? (
            <ListView
              data={audits}
              renderRow={(audit) => (
                <AuditRow
                  {...audit}
                  testID={audit.name}
                  onPress={() => this.navigateAudit(audit)}
                >
                  <AuditRow.Action status={audit.status} onPress={() => this.navigateAudit(audit)} />
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
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  audits: allAudits(state)
})

export default connect(mapStateToProps)(AuditsScene);
