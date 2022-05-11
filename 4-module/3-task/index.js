function highlight(table) {
  let tbody = table.getElementsByTagName('tbody')[0];
  let trs = tbody.querySelectorAll('tr');

  trs.forEach(row => {
    const status = row.getElementsByTagName('td')[3];
      if(!status.dataset.available) {
          row.hidden = true;
      }
      else if(status.dataset.available === "true") {
          row.classList.add('available');
      }
      else if(status.dataset.available === "false") {
        row.classList.add('unavailable');
      }
      
      const gender = row.getElementsByTagName('td')[2];
      if(gender.textContent === 'm') {
          row.classList.add('male');
      }
      else if(gender.textContent === 'f') {
          row.classList.add('female');
      }
      
      const age = row.getElementsByTagName('td')[1];
      if(Number(age.textContent) < 18) {
          row.style.textDecoration = 'line-through';
      }
  })
}
