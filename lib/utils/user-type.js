export default function(user, isExplicit = false) {
  if (!user) {
    return '';
  }
  if (user.isAdministrator) {
    return 'Management';
  }
  if (user.isReceptionist) {
    return 'Front Office';
  }
  if (user.isInspector) {
    if (isExplicit) {
      return 'Inspector';
    }
    return 'Housekeeping';
  }
  if (user.isMaintenance) {
    return 'Maintenance';
  }
  if (user.isAttendant) {
    if (isExplicit) {
      return 'Attendant';
    }
    return 'Housekeeping';
  }
  if (user.isRoomRunner) {
    if (isExplicit) {
      return 'Runner';
    }
    return 'Front Office';
  }
}
