let carList = [];

const addCarButton = document.getElementById('addCar');
const showTableButton = document.getElementById('showTable');
const clearDataButton = document.getElementById('clearData');
const closeWindowButton = document.getElementById('closeWindow');
const carForm = document.getElementById('carForm');
const tableContainer = document.getElementById('tableContainer');
const carTableBody = document.querySelector('#carTable tbody');

function updateTable() {
  carTableBody.innerHTML = '';

  carList = JSON.parse(localStorage.getItem('carList')) || [];

  carList.forEach((car, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.marca}</td>
      <td>${car.cor}</td>
      <td>${car.placa}</td>
      <td><button class="deleteButton" data-index="${index}">Excluir</button></td>
    `;
    carTableBody.appendChild(row);
  });

  tableContainer.style.display = carList.length > 0 ? 'block' : 'none';

  document.querySelectorAll('.deleteButton').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      deleteCar(index);
    });
  });
}

function deleteCar(index) {
  carList.splice(index, 1);
  localStorage.setItem('carList', JSON.stringify(carList));
  updateTable();
}

addCarButton.addEventListener('click', () => {
  carList = JSON.parse(localStorage.getItem('carList')) || [];

  const marca = document.getElementById('marca').value;
  const cor = document.getElementById('cor').value;
  const placa = document.getElementById('placa').value;

  if (marca && cor && placa) {
    carList.push({ marca, cor, placa });
    localStorage.setItem('carList', JSON.stringify(carList));
    alert('Carro cadastrado com sucesso!');
    carForm.reset();
  } else {
    alert('Por favor, preencha todos os campos!');
  }
});

showTableButton.addEventListener('click', updateTable);

clearDataButton.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja deletar todos os dados?')) {
    carList = [];
    localStorage.removeItem('carList');
    updateTable();
    alert('Todos os dados foram deletados!');
  }
});

closeWindowButton.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja fechar a pagina?')) {
    carList = [];
    localStorage.removeItem('carList');
    updateTable();
    
    window.close();
  }
});
