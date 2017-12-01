import isObject from 'lodash/isObject';

const truncate = (str, number) => {
  if (str.length >= number) {
    const truncated = str.slice(0, number)
    return `${truncated}...}`
  }
  return str
}

const serializer = (k, v) => v === undefined ? null : v

class Adapter {
  static prepareParams(params) {
    if (!params) {
      return {}
    }
    if (params.password) {
      return {
        ...params,
        password: "[FILTERED]",
      }
    }
    return params
  }

  static normalizeMessage(params) {
    if (!params) {
      return ""
    }

    if (isObject(params)) {
      try {
        const json = JSON.stringify(Adapter.prepareParams(params), serializer) || ""
        return truncate(json, 500)
      } catch (e) {
        return ""
      }
    }

    return params
  }

  static normalizeLevelCode(level) {
    return level[0].toUpperCase()
  }

  static normalize(config, data) {
    const { date, level, id } = config
    const levelCode = Adapter.normalizeLevelCode(level)
    const message = Adapter.normalizeMessage(data)

    return {
      id,
      date,
      level,
      message,
      levelCode,
    }
  }
}

export default Adapter
