import React from 'react';
import Immutable from 'seamless-immutable';
import { View, Modal, ActivityIndicator, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import findIndex from 'lodash/findIndex';

import ListView from '../ListView';
import Inspection, { matchHotAnswer, isEmpty } from './Inspection';

import {
  Container,
  Section,
  Header,
  Content,
  Button,
  CancelButton,
  PauseButton,
  RemoveButton,
  ButtonText,
  Buttons,
  Overlay,
  Loader,
} from './styles';

const BusyOverlay = ({ visible }) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => null}
    >
      <Overlay>
        <Loader
          animating
          size="large"
        />
      </Overlay>
    </Modal>
  )
}

BusyOverlay.defaultProps = {
  visible: false,
}

class AuditView extends React.Component {
  componentDidMount() {
    const onInit = this.props.onInit
    onInit && onInit()
  }

  componentWillUnmount() {
    const onDestroy = this.props.onDestroy
    onDestroy && onDestroy(this.props)
  }

  componentWillMount() {
    const { width, height } = Dimensions.get('window')
    this.width = width
    this.height = height
  }

  render() {
    const {
      name,
      inspections,
      valid,
      readOnly,
      onChange,
      onSubmit,
      onCancel,
      onChangeInspection,
      onPause,
      onRemove,

      busy,

      noteText,
      photoText,
      submitText,
      cancelText,
      yesText,
      noText,
      submitTaskText,
      addPhotoText,
      addNoteText,
      saveText,
      pauseText,
      removeText,

      ...props
    } = this.props

    const narrow = this.width <= 500

    return (
      <Container {...props}>
        <BusyOverlay visible={busy} />
        {
          name ? (
            <Header>{name}</Header>
          ) : null
        }
        <Content narrow={narrow}>
          {
            inspections ? (
              <ListView
                data={inspections}
                renderRow={(inspection) => (
                  <Inspection
                    {...inspection}
                    card={narrow}
                    readOnly={readOnly}
                    onChange={(field, value) => !readOnly && onChange(inspection.id, field, value)}
                    onChangeInspection={onChangeInspection}
                    noteText={noteText}
                    photoText={photoText}
                    yesText={yesText}
                    noText={noText}
                    submitTaskText={submitTaskText}
                    addNoteText={addNoteText}
                    addPhotoText={addPhotoText}
                    saveText={saveText}
                    cancelText={cancelText}
                  />
                )}
                renderSectionHeader={(section) => <Section>{section}</Section>}
                getSectionId={(inspection) => inspection.question_section}
              />
            ) : null
          }
          </Content>
          
          {
            readOnly ? (
              null
            ) : (
              <Buttons>
                {
                  onSubmit ? (
                    <Button onPress={onSubmit} disabled={!valid} narrow={narrow}>
                      <ButtonText narrow={narrow}>
                        {submitText}
                      </ButtonText>
                    </Button>
                  ) : null
                }
                {
                  onPause ? (
                    <PauseButton onPress={onPause} disabled={!valid} narrow={narrow}>
                      <ButtonText narrow={narrow}>
                        {pauseText}
                      </ButtonText>
                    </PauseButton>
                  ) : null
                }
                {
                  onCancel ? (
                    <CancelButton onPress={onCancel} narrow={narrow}>
                      <ButtonText narrow={narrow}>
                        {cancelText}
                      </ButtonText>
                    </CancelButton>
                  ) : null
                }
                {
                  onRemove ? (
                    <RemoveButton onPress={onRemove} narrow={narrow}>
                      <ButtonText narrow={narrow}>
                        {removeText}
                      </ButtonText>
                    </RemoveButton>
                  ) : null
                }
              </Buttons>
            )
          }
      </Container>
    )
  }
}

AuditView.defaultProps = {
  submitText: 'Submit',
  cancelText: 'Cancel',
  pauseText: 'Pause',
  removeText: 'Remove',
}

const validateInspection = (inspection) => {
  const answer = inspection.answer
  if (answer === null || answer === undefined) {
    return false
  }
  return true
}

const checkHot = (inspection) => {
  if (!inspection || isEmpty(inspection.answer) || !inspection.answer_label) {
    return false
  }
  const hot = inspection.hotAnswers
  if (!hot || hot.length === 0) {
    return inspection
  }
  const hotSelected = hot.filter(a => matchHotAnswer(inspection, a))
  return hotSelected.length > 0
}

const markHot = (inspection) => {
  if (checkHot(inspection)) {
    return {
      ...inspection,
      is_hot: true,
    }
  }
  return inspection
}

const prepareInspection = (inspection) => {
  return omit(markHot(inspection), ['options', 'required', 'hotAnswers', 'id'])
}

const prepareInspectionSingle = (inspection) => {
  return omit(markHot(inspection), ['options', 'required', 'hotAnswers'])
}

const output = (inspections) => {
  return inspections.filter(validateInspection).map(prepareInspectionSingle)
}

class AuditLogic extends React.Component {
  state = {
    inspections: Immutable.from(this.props.inspections)
  }

  handleChange = (inspection, field, value) => {
    setTimeout(() => {
      const inspections = this.state.inspections
      const inspectionIndex = findIndex(inspections, (i) => i.id === inspection)
      this.setState(({ inspections }) => {
        const insp = inspections[inspectionIndex]
        const updated = insp.set(field, value)
        return ({
          inspections: inspections.set(inspectionIndex, updated)
        });
      })
    }, 0)
  }

  validate = () => {
    const inspections = this.state.inspections
    if (!inspections || inspections.length === 0) {
      return false
    }
    const result = inspections.filter(validateInspection)
    return result.length > 0
  }

  handleSubmit = (submitHandler) => {
    if (!this.validate()) {
      return null
    } else {
      submitHandler(this.props.output(this.state.inspections))
    }
  }

  handleInit = (initHandler) => {
    if (!this.validate()) {
      return null
    }
    initHandler && initHandler(this.props.output(this.state.inspections))
  }

  handleDestroy = (destroyHandler) => {
    if (!this.validate()) {
      return null
    }
    destroyHandler && destroyHandler(this.props.output(this.state.inspections))
  }

  handlePause = (pauseHandler) => {
    if (!this.validate()) {
      return null
    }
    pauseHandler && pauseHandler(this.props.output(this.state.inspections))
  }

  handleChangeInspection = (changeHandler) => (inspection) => {
    setTimeout(() => {
      changeHandler && changeHandler(prepareInspectionSingle(this.state.inspections.find(i => i.id == inspection.id)))
    }, 0)
  }

  handleClear = () => {
    this.setState({ inspections: Immutable.from(this.props.inspections) })
  }

  handleCancel = (cancelHandler) => {
    this.handleClear()

    if (cancelHandler) {
      cancelHandler()
    }
  }

  render() {
    if (!this.state.inspections) {
      return null
    }
    return this.props.children({
      inspections: this.state.inspections.slice(0),
      validate: this.validate,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      handleCancel: this.handleCancel,
      handleInit: this.handleInit,
      handleChangeInspection: this.handleChangeInspection,
      handlePause: this.handlePause,
      handleDestroy: this.handleDestroy,
    })
  }
}

AuditLogic.defaultProps = {
  output: output,
}

const Audit = ({
  onSubmit,
  onCancel,
  onInit,
  onChangeInspection,
  onDestroy,
  onPause,

  inspections,
  output,
  readOnly,
  ...props
}) => (
  <Audit.Logic inspections={inspections} output={output}>
    {
      (audit) => {
        return (
          <Audit.View
            {...props}
            readOnly={readOnly}
            valid={audit.validate()}
            inspections={audit.inspections}
            onChange={audit.handleChange}
            onSubmit={() => audit.handleSubmit(onSubmit)}
            onCancel={() => audit.handleCancel(onCancel)}
            onInit={() => audit.handleInit(onInit)}
            onDestroy={() => audit.handleDestroy(onDestroy)}
            onPause={() => audit.handlePause(onPause)}
            onChangeInspection={audit.handleChangeInspection(onChangeInspection)}
          />
        )
      }
    }
  </Audit.Logic>
)

Audit.propTypes = {
  header: PropTypes.string,
}

Audit.Header = Header
Audit.Inspection = Inspection
Audit.Logic = AuditLogic
Audit.View = AuditView

export default Audit
