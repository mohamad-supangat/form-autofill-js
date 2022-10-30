const casual = require('casual-browserify')

const _EXCLUDED = [
  'button',
  'submit',
  'hidden'
]

const containerButtonStyle = `
  position: fixed;
  background: white;
  padding: 1px;
  top: 1px;
  right: 1px;
  z-index: 99999;
  border: 1px solid black;
`

const buttonStyle = `
  padding: 1px;
  font-size: 10px;
  background: #ddd;
  border: 1px solid black;
  cursor: pointer;
`

const isExcluded = (el) => _EXCLUDED.includes(el)

const _ADITIONAL_PARAMS = {
  zip: () => casual.zip(6),
  lastname: () => casual.lastname,
  firstname: () => casual.firstname
}

const isFunction = (f) => f instanceof Function

function findInputElements () {
  if (typeof window === 'undefined') {
    console.log('Form autofill just works in client side')
    return null
  }

  const inputs = document.querySelectorAll('form input')
  const selects = document.querySelectorAll('form select')
  const textAreas = document.querySelectorAll('form textArea')

  return [...inputs, ...textAreas]
}

function fillElements (elements = [], defaultValues = {}) {
  if (!elements.length) {
    console.log('cannot find DOM input elements')
    return null;
  }

  elements.forEach(el => {
    if (!isExcluded(el.type)) {
      const value = casual[el.name]

      if (el.name in defaultValues) {
        el.value = defaultValues[el.name]
      } else if (_ADITIONAL_PARAMS[el.name]) {
        el.value = _ADITIONAL_PARAMS[el.name]()
      } else if (value) {
        el.value = value
      } else {
        el. value = (casual[el.type]) ? casual[el.type] : ''
      }
    }
  })
}

const fill = (defaultValues = {}) => {
  const elements = findInputElements()
  fillElements(elements, defaultValues)
}

const tool = (defaultValues = {}) => {
  const button = document.createElement('button')
  button.textContent = 'Autofill'
  button.setAttribute('style', buttonStyle)
  button.onclick = () => fill(defaultValues)

  const container = document.createElement('div')
  container.setAttribute('style', containerButtonStyle)
  container.appendChild(button)
  document.querySelector('body').appendChild(container)
}

module.exports = {
  fill,
  tool
}
