const render = () => {
  document.getElementById('app').innerHTML = `
    <div>
        <div class="dinner-title">Рассчитать обед:</div>
        <table class="dinner-table">
            <tr>
                <td>Общая стоимость:</td>
                <td>${lunch.price}</td>
                <td>
                    <button @click="incrementPrice">+</button>
                    <button @click="decrementPrice">-</button>
                </td>
            </tr>
            <tr>
                <td>Чаевые (%):</td>
                <td>${lunch.tips}</td>
                <td>
                    <button @click="incrementTips">+</button>
                    <button @click="decrementTips">-</button>
                </td>
            </tr>
            <tr>
                <td>Кол-во человек:</td><td>${lunch.persons}</td>
                <td>
                    <button @click="incrementPerson">+</button>
                    <button @click="decrementPerson">-</button>
                </td>
            </tr>
            <tr>
                <td>Стоимость на человека:</td><td>${lunch.total}</td>
            </tr>
        </table>
    </div>
  `
}

let effect = null
const updateTotal = () => lunch.total = Math.ceil(lunch.price * (1 + lunch.tips / 100) / lunch.persons)
const lunch = observe({
  price: 6000,
  tips: 10,
  persons: 3,
  total: 0,
})

const watcher = (callback) => {
  effect = callback
  effect()
  effect = null
}

watcher(updateTotal)
watcher(render)

function observe(data) {
  const deps = {}

  return new Proxy(data, {
    get(target, key) {
      if (effect) {
        let dep = deps[key]

        if (!dep) deps[key] = (dep = [])

        dep.push(effect)
      }
      return target[key]
    },
    set(target, key, value) {
      target[key] = value

      const dep = deps[key]
      if (dep) {
        dep.forEach(effect => effect())
      }
    }
  })
}

const methods = {
  incrementPrice() {
    lunch.price += 100
  },
  decrementPrice() {
    lunch.price -= 100
  },
  incrementTips() {
    lunch.tips++
  },
  decrementTips() {
    lunch.tips--
  },
  incrementPerson() {
    lunch.persons++
  },
  decrementPerson() {
    lunch.persons--
  },
}

document.getElementById('app')
  .addEventListener('click', event => {
    const clickAttr = event.target.attributes['@click']
    const methodName = clickAttr && clickAttr.value
    const method = methods[methodName]

    if (method) {
      method()
    }
  })
