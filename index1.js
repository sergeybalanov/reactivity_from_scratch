const paint = () => {
  document.getElementById('app').innerHTML = `
    <div>
        <div class="dinner-title">Рассчитать обед:</div>
        <table class="dinner-table">
            <tr>
                <td>Общая стоимость:</td>
                <td>${price}</td>
            </tr>
            <tr>
                <td>Чаевые (%):</td>
                <td>${tips}</td>
            </tr>
            <tr>
                <td>Кол-во человек:</td><td>${persons}</td>
            </tr>
            <tr>
                <td>Стоимость на человека:</td><td>${total}</td>
            </tr>
        </table>
    </div>
  `
}

let price = 6000
let tips = 10
let persons = 3
let total = 0

const updateTotal = () => total = Math.ceil(price * (1 + tips / 100) / persons)

updateTotal()

paint()

price = 7000
updateTotal()
paint()

const person = {
  name: 'Sergei',
  lastName: 'Balanov',
}

const proxy = new Proxy(person, {
  get(target, key) {
    if (key === 'fullName') {
      return target.name + ' ' + target.lastName
    }
    return target[key]
  },
  set(target, key, value) {
    if (key === 'fullName') {
      console.log("You can't change this field")
      return
    }
    target[key] = value
  }
})


proxy.name
