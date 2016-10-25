import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const missingImage = 'https://www.filepicker.io/api/file/Ptnbq1eDRfeQ3m4LTFnJ';

export const UserSelect = ({ user, input: { onChange } }) => (
  <TouchableOpacity key={user.username} onPress={() => onChange(user.username)}>
    <Image source={{ uri: user.image || missingImage }} style={styles.userImage} />
  </TouchableOpacity>
)

export default UserSelect
