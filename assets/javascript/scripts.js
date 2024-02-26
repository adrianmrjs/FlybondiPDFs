// Ejemplo de datos de PDFs
const pdfs = [
  { name: "ANEXO A", url: "./assets/PDFS/Ezeiza/ANEXOS/AnexoH.pdf", category: "anexos" },
  { name: "ANEXO E", url: "pdfs/pdf2.pdf", category: "anexos" },
  { name: "PDF 2", url: "PDFS/PDF1.pdf", category: "procedimientos" },
  { name: "PDF 3", url: "pdfs/pdf2.pdf", category: "procedimientos" },
  { name: "INGRESO", url: "PDFS/PDF1.pdf", category: "procedimientos" },
];

// Función para mostrar los resultados de búsqueda filtrados por categoría
const showResults = (results) => {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';
  results.forEach(pdf => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = pdf.name;
    card.addEventListener('click', () => {
      showPDF(pdf.url);
    });
    resultsContainer.appendChild(card);
  });
};

// Función para mostrar el PDF seleccionado
const showPDF = (pdfUrl) => {
  const pdfViewer = document.getElementById('pdfViewer');
  pdfViewer.src = pdfUrl;
  document.getElementById('pdfPopup').style.display = 'block';
};

// Filtrar PDFs por categoría al hacer clic en el enlace de navegación
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const category = event.target.getAttribute('data-category');
    const filteredPDFs = category === 'all' ? pdfs : pdfs.filter(pdf => pdf.category === category);
    showResults(filteredPDFs);
  });
});

// Búsqueda en tiempo real
document.getElementById('searchInput').addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredPDFs = pdfs.filter(pdf => pdf.name.toLowerCase().includes(searchTerm));
  showResults(filteredPDFs);
});

// Función para ajustar el margen superior del contenedor principal
const adjustMarginTop = () => {
  const container = document.querySelector('.container');
  if (pdfPopup.style.display === 'block') {
    container.style.marginTop = '50px'; // Margen superior cuando el PDF está abierto
  } else {
    container.style.marginTop = '250px'; // Margen superior cuando el PDF no está abierto
  }
};

// Llama a la función cuando se abre o cierra el PDF
document.getElementById('closeBtn').addEventListener('click', adjustMarginTop);

// Llama a la función al cargar la página para establecer el margen inicial
adjustMarginTop();
