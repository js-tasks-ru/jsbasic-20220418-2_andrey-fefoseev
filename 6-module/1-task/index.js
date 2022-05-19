/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.render(rows)
  }

  render(rows) {
    const table = document.createElement('table');
    let personalData = rows.map(item => {
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td>
            <button>X</button>
          </td>
        </tr>
      `
    });

    table.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
      </tr>
    </thead>
    <tbody>
     ${personalData}
    </tbody>
    `

    const buttons = table.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        button.closest('tr').remove();
      });
    });
    
    return table;
  };
}
