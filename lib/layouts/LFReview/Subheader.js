import React from 'react';
import SearchSubheader from 'rc-mobile-base/lib/components/SearchSubheader';
import SelectionButton from './SelectionButton';

import {
  SubheaderContainer,
  Spacer
} from './styles';

export default Subheader = ({ searchQuery, updateQuery, isShowAll, updateShow }) => (
  <SubheaderContainer>
    <SearchSubheader
      style={{
        container: { width: 400, backgroundColor: 'white', height: 40, marginTop: 5, marginRight: 10 },
        input: { textAlign: 'left', paddingLeft: 20 },
        btn: { top: 0 }
      }}
      searchQuery={searchQuery}
      updateQuery={(t) => updateQuery(t)}
      />

    <Spacer />
    
    <SelectionButton
      label="Show all"
      handler={() => updateShow(true)}
      isActive={isShowAll}
      />
    <SelectionButton
      label="Show only open"
      handler={() => updateShow(false)}
      isActive={!isShowAll}
      />
  </SubheaderContainer>
)