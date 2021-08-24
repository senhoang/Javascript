const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
  const cars = ["BMW"];

  const root = $("#root");
  const submit = $("#submit");

  return {
    add(car) {
      cars.push(car);
    },
    delete(index) {
      cars.splice(index, 1);
    },
    render() {
      const html = cars
        .map(
          (car, index) => `
                <li> 
                    ${car}
                    <span class="delete" data-index=${index} style="cursor:pointer">&times</span>
                </li>
            `
        )
        .join("");

      root.innerHTML = html;
    },
    handleDelete(e) {
      const deleteBtn = e.target.closest(".delete");
      if (deleteBtn) {
        const index = deleteBtn.dataset.index;
        this.delete(index);
        this.render();
      }
    },
    init() {
      // Handle DOM events
      submit.onclick = () => {
        const car = input.value;
        this.add(car);
        this.render();

        input.value = null;
        input.focus();
      };

      root.onclick = this.handleDelete.bind(this);

      this.render();
    },
  };
})();

app.init();

// TAGGED TEMPLATE LITERALS

// function highlight([first, ...string],...values) {
//     console.log(first)
//     console.log(string)
//     console.log(values)
//     return values.reduce(
//         (acc, curr) => [...acc,`<span>${curr}</span>`,string.shift()] ,
//         [first]
//     ).join('')
// }

// var cours = 'Javascript'
// var brand = 'F8'

// var html = highlight`Hoc lap trinh ${cours} tai ${brand} !`
// console.error(html)
