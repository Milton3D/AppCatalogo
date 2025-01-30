document.addEventListener('DOMContentLoaded', () => {

  function setupDownloadButton() {
    const downloadBtn = document.getElementById('download-btn');
    
    downloadBtn?.addEventListener('click', async () => {
      // Hide download button temporarily
      downloadBtn.style.display = 'none';
      
      try {
        // Get title and toggle buttons sections
        const titleSection = document.querySelector('.productos h2');
        const toggleButtons = document.querySelector('.productos-toggles');
        
        // Get active section
        const activeSection = document.querySelector('.productos-section.active');
        if (!activeSection) {
          console.error('No active section found');
          downloadBtn.style.display = 'flex'; 
          return;
        }

        // Create temporary container with title, buttons and active section
        const tempContainer = document.createElement('div');
        tempContainer.style.background = 'var(--light-accent)'; // Match website background color
        tempContainer.style.padding = '20px';
        
        // Clone and append title
        const titleClone = titleSection.cloneNode(true);
        titleClone.style.textAlign = 'center';
        titleClone.style.marginBottom = '2rem';
        tempContainer.appendChild(titleClone);
        
        // Clone and append toggle buttons with centered styles
        const buttonsClone = toggleButtons.cloneNode(true);
        buttonsClone.style.justifyContent = 'center';
        buttonsClone.style.display = 'flex';
        buttonsClone.style.gap = '1rem';
        buttonsClone.style.marginBottom = '2rem';
        
        // Ensure buttons have proper styling in the clone
        Array.from(buttonsClone.children).forEach(button => {
          button.style.padding = '0.8rem 1.5rem';
          button.style.borderRadius = '8px';
          button.style.minWidth = '150px';
          button.style.textAlign = 'center';
          if (button.classList.contains('active')) {
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'white';
          } else {
            button.style.backgroundColor = 'var(--accent-color)';
            button.style.color = 'var(--primary-color)';
          }
        });
        
        tempContainer.appendChild(buttonsClone);
        
        // Clone and append active section
        const clonedContent = activeSection.cloneNode(true);
        tempContainer.appendChild(clonedContent);
        
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '210mm'; // A4 width
        document.body.appendChild(tempContainer);

        // Wait for fonts to load
        await document.fonts.ready;

        // Get section name for filename
        const sectionName = activeSection.id.includes('detal') ? 'detal' : 'mayor';


        // Convert to canvas with better settings
        const canvas = await html2canvas(tempContainer, {
          scale: 2, // Higher quality
          useCORS: true,
          logging: false,
          backgroundColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--light-accent')
            .trim(), // Get the actual background color value
          windowWidth: 210 * 3.78, // Convert mm to px (1mm ≈ 3.78px)
          onclone: (clonedDoc) => {
            // Add print-specific styles
            const style = clonedDoc.createElement('style');
            style.textContent = `
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .add-product-card,
              .producto-actions,
              .edit-button,
              .download-button {
                display: none !important;
              }
              .productos-section {
                display: block !important;
              }
              .producto-card {
                break-inside: avoid;
                page-break-inside: avoid;
              }
              .productos {
                padding: 0;
              }
              .productos-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
              }
              .contact-section {
                break-inside: avoid;
                page-break-inside: avoid;
              }
              .toggle-button {
                display: inline-block !important;
                margin: 10px;
              }
              h2 {
                margin: 20px 0;
                text-align: center;
                color: var(--dark-accent);
              }
              .productos-toggles {
                text-align: center;
                margin-bottom: 2rem;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });

        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        const imgWidth = 210; // A4 width
        const imgHeight = canvas.height * imgWidth / canvas.width;

        // Define la altura de la portada
        const coverHeightMM = 297; // altura de portada en mm
        const totalHeight = coverHeightMM + imgHeight;

        // Create PDF with custom settings
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [imgWidth, totalHeight]
        });

        // Agrega la imagen de portada al inicio
        pdf.addImage(
            'imagen/portada.png', // Reemplaza esto con tu URL
            'JPEG',
            0,
            0,
            210,
            coverHeightMM,
            undefined,
            'FAST'
        );

        // Agrega el contenido debajo de la portada
        pdf.addImage(
            canvas.toDataURL('image/png', 1.0),
            'JPEG',
            0,
            coverHeightMM, // Posición Y después de la portada
            imgWidth,
            imgHeight,
            '',
            'FAST'
        );
        // Save the PDF
        pdf.save(`naturallife-catalogo-${sectionName}.pdf`);

        // Cleanup
        document.body.removeChild(tempContainer);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Hubo un error al generar el PDF. Por favor intente nuevamente.');
      } finally {
        // Show download button again
        downloadBtn.style.display = 'flex';
      }
    });
  }

  const detalContainer = document.getElementById('productos-detal');
  const mayorContainer = document.getElementById('productos-mayor');
  const toggleButtons = document.querySelectorAll('.toggle-button');

  if (!detalContainer || !mayorContainer) {
    console.error('Container elements not found!');
    return;
  }

  function createProductImagen(imagenURL) {
    return `
      <img src="${imagenURL}" alt="Imagen del Producto" class="product-image">
    `;
  }

  function createProductCard(producto, isMayor = false) {
    return `
      <div class="producto-card" data-id="${producto.id}">
        <div class="producto-actions">
          <button class="edit-button" aria-label="Editar producto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>
        <div class="producto-imagen">
          ${createProductImagen(producto.imagen)}
        </div>
        <div class="producto-info">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          ${isMayor ? '' : `<span class="producto-precio">$${producto.precio}</span>`}
        </div>
      </div>
    `;
  }

  function createPriceTable() {
    const productosMayor = productos.filter(p => p.tipo === 'mayor' || p.tipo === 'ambos');
    return `
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th class="responsive-header">12-24 u</th>
            <th class="responsive-header">25-49 u</th>
            <th class="responsive-header">50+ u</th>
          </tr>
        </thead>
        <tbody>
          ${productosMayor.map(producto => `
            <tr>
              <td>${producto.nombre}</td>
              <td>$${producto.precioMayor[0].precio}</td>
              <td>$${producto.precioMayor[1].precio}</td>
              <td>$${producto.precioMayor[2].precio}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function createContactSection() {
    const contactInfo = JSON.parse(localStorage.getItem('contactInfo')) || {
      phone: '+57 312 123-4567',
      whatsapp: '+57 312-123-4567',
      email: 'ventas@naturallife.com',
      address: 'Av. Principal, Local 123\nCiudad Comercial'
    };

    return `
      <div class="contact-section">
        <div class="contact-header">
          <h3>Contacto y Pedidos</h3>
          <button class="edit-contact-button" aria-label="Editar información de contacto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>
        <div class="contact-content">
          <div class="qr-code">
            <svg viewBox="0 0 200 200" class="qr-svg">
              <rect x="0" y="0" width="200" height="200" fill="white"/>
              <path d="M20,20 h40 v40 h-40 z M30,30 h20 v20 h-20 z" fill="black"/>
              <path d="M140,20 h40 v40 h-40 z M150,30 h20 v20 h-20 z" fill="black"/>
              <path d="M20,140 h40 v40 h-40 z M30,150 h20 v20 h-20 z" fill="black"/>
              <path d="M70,70 h60 v60 h-60 z M80,80 h40 v40 h-40 z" fill="black"/>
              <path d="M20,70 h30 v30 h-30 z" fill="black"/>
              <path d="M150,70 h30 v30 h-30 z" fill="black"/>
              <path d="M70,150 h30 v30 h-30 z" fill="black"/>
              <path d="M150,150 h30 v30 h-30 z" fill="black"/>
            </svg>
            <p class="qr-text">Escanea para contactarnos por WhatsApp</p>
          </div>
          <div class="contact-info">
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <p>${contactInfo.phone}</p>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 20.4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7.4l-4.4 3.4z"/>
                <path d="M18 9.4C18 9.4 14.5 12 12 12c-2.5 0-6-2.6-6-2.6"/>
              </svg>
              <p>${contactInfo.whatsapp}</p>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p>${contactInfo.email}</p>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p>${contactInfo.address}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function createAddProductCard() {
    return `
      <div class="producto-card add-product-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </div>
    `;
  }

  function createAddProductForm(isWholesale = false) {
    return `
      <div class="modal-overlay" id="${isWholesale ? 'wholesale' : 'retail'}-modal">
        <div class="modal">
          <div class="modal-header">
            <h3>Agregar Nuevo Producto</h3>
            <button class="modal-close">&times;</button>
          </div>
          <form class="add-product-form" id="${isWholesale ? 'wholesale' : 'retail'}-form">
            <div class="form-group">
              <label for="nombre">Nombre del Producto</label>
              <input type="text" id="nombre" name="nombre" required>
            </div>
            
            <div class="form-group">
              <label for="descripcion">Descripción</label>
              <textarea id="descripcion" name="descripcion" rows="3" required></textarea>
            </div>
            
            <div class="form-group">
              <label for="categoria">Categoría</label>
              <div class="categoria-container">
                <select id="categoria" name="categoria" required>
                  <option value="suplementos">Suplementos</option>
                  <option value="vitaminas">Vitaminas</option>
                  <option value="infusiones">Infusiones</option>
                  <option value="inmunidad">Inmunidad</option>
                  <option value="superalimentos">Superalimentos</option>
                </select>
                <button type="button" class="add-category-btn">+</button>
                <button type="button" class="remove-category-btn">-</button>
              </div>
            </div>

            <div class="form-group">
              <label for="tipo">Tipo de Venta</label>
              <select id="tipo" name="tipo" required>
                <option value="detal">Solo Detal</option>
                <option value="mayor">Solo Mayor</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            <div class="form-group">
              <label for="imagen">Imagen del Producto</label>
              <input type="file" id="imagen" name="imagen" accept="image/*" required>
            </div>
            
            <div class="precio-detal-container">
              <div class="form-group">
                <label for="precio">Precio al Detal</label>
                <input type="number" id="precio" name="precio" step="0.01" required>
              </div>
            </div>

            <div class="wholesale-prices">
              <div class="form-group">
                <label for="precio12-24">Precio (12-24 u)</label>
                <input type="number" id="precio12-24" name="precio12-24" step="0.01" required>
              </div>
              
              <div class="form-group">
                <label for="precio25-49">Precio (25-49 u)</label>
                <input type="number" id="precio25-49" name="precio25-49" step="0.01" required>
              </div>
              
              <div class="form-group">
                <label for="precio50">Precio (50+ u)</label>
                <input type="number" id="precio50" name="precio50" step="0.01" required>
              </div>
            </div>
            
            <button type="submit" class="submit-button">Agregar Producto</button>
          </form>
        </div>
      </div>
    `;
  }

  function createEditProductForm() {
    return `
      <div class="modal-overlay" id="edit-modal">
        <div class="modal">
          <div class="modal-header">
            <h3>Editar Producto</h3>
            <button class="modal-close">&times;</button>
          </div>
          <form class="add-product-form" id="edit-form">
            <input type="hidden" id="edit-product-id" name="productId">
            
            <div class="form-group">
              <label for="edit-nombre">Nombre del Producto</label>
              <input type="text" id="edit-nombre" name="nombre" required>
            </div>
            
            <div class="form-group">
              <label for="edit-descripcion">Descripción</label>
              <textarea id="edit-descripcion" name="descripcion" rows="3" required></textarea>
            </div>
            
            <div class="form-group">
              <label for="edit-categoria">Categoría</label>
              <div class="categoria-container">
                <select id="edit-categoria" name="categoria" required>
                  <option value="suplementos">Suplementos</option>
                  <option value="vitaminas">Vitaminas</option>
                  <option value="infusiones">Infusiones</option>
                  <option value="inmunidad">Inmunidad</option>
                  <option value="superalimentos">Superalimentos</option>
                </select>
                <button type="button" class="add-category-btn">+</button>
                <button type="button" class="remove-category-btn">-</button>
              </div>
            </div>

            <div class="form-group">
              <label for="edit-tipo">Tipo de Venta</label>
              <select id="edit-tipo" name="tipo" required>
                <option value="detal">Solo Detal</option>
                <option value="mayor">Solo Mayor</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="imagen">Imagen del Producto</label>
              <input type="file" id="imagen" name="imagen" accept="image/*" required>
            </div>
            
            <div class="precio-detal-container">
              <div class="form-group">
                <label for="edit-precio">Precio al Detal</label>
                <input type="number" id="edit-precio" name="precio" step="0.01">
              </div>
            </div>

            <div class="wholesale-prices">
              <div class="form-group">
                <label for="edit-precio12-24">Precio (12-24 u)</label>
                <input type="number" id="edit-precio12-24" name="precio12-24" step="0.01">
              </div>
              
              <div class="form-group">
                <label for="edit-precio25-49">Precio (25-49 u)</label>
                <input type="number" id="edit-precio25-49" name="precio25-49" step="0.01">
              </div>
              
              <div class="form-group">
                <label for="edit-precio50">Precio (50+ u)</label>
                <input type="number" id="edit-precio50" name="precio50" step="0.01">
              </div>
            </div>
            
            <div class="edit-actions">
              <button type="submit" class="submit-button">Guardar Cambios</button>
              <button type="button" class="delete-button">Eliminar Producto</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function setupEditProductListeners() {
    if (!document.getElementById('edit-modal')) {
      document.body.insertAdjacentHTML('beforeend', createEditProductForm());
    }

    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editTipoSelect = editForm.querySelector('#edit-tipo');

    document.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = e.target.closest('.producto-card');
        const productId = parseInt(productCard.dataset.id);
        const product = productos.find(p => p.id === productId);
        
        if (product) {
          fillEditForm(product);
          editModal.style.display = 'flex';
        }
      });
    });

    editTipoSelect.addEventListener('change', () => {
      const precioDetalContainer = editForm.querySelector('.precio-detal-container');
      const wholesalePrices = editForm.querySelector('.wholesale-prices');
      
      updatePriceFieldsVisibility(
        editTipoSelect.value,
        precioDetalContainer,
        wholesalePrices
      );
    });

    editForm.querySelector('.delete-button').addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(editForm.querySelector('#edit-product-id').value);
      
      if (confirm('¿Está seguro que desea eliminar este producto?')) {
        const index = productos.findIndex(p => p.id === productId);
        if (index !== -1) {
          productos.splice(index, 1);
          editModal.style.display = 'none';
          renderProductos();
        }
      }
    });

    editForm.addEventListener('submit', handleEditSubmit);

    editModal.querySelector('.modal-close').addEventListener('click', () => {
      editModal.style.display = 'none';
    });

    editModal.addEventListener('click', (e) => {
      if (e.target === editModal) {
        editModal.style.display = 'none';
      }
    });
  }

  function fillEditForm(product) {
    const form = new FormData(document.getElementById('edit-form'));
    form.set('productId', product.id);
    form.set('nombre', product.nombre);
    form.set('descripcion', product.descripcion);
    form.set('categoria', product.categoria);
    form.set('tipo', product.tipo);
    
    const precioDetalContainer = document.getElementById('edit-form').querySelector('.precio-detal-container');
    const wholesalePrices = document.getElementById('edit-form').querySelector('.wholesale-prices');
    
    if (product.tipo === 'detal' || product.tipo === 'ambos') {
      document.getElementById('edit-precio').value = product.precio;
    }
    
    if (product.tipo === 'mayor' || product.tipo === 'ambos') {
      document.getElementById('edit-precio12-24').value = product.precioMayor[0].precio;
      document.getElementById('edit-precio25-49').value = product.precioMayor[1].precio;
      document.getElementById('edit-precio50').value = product.precioMayor[2].precio;
    }
    
    updatePriceFieldsVisibility(product.tipo, precioDetalContainer, wholesalePrices);
  }

  function updatePriceFieldsVisibility(tipo, precioDetalContainer, wholesalePrices) {
    const detalInputs = precioDetalContainer.querySelectorAll('input');
    const mayorInputs = wholesalePrices.querySelectorAll('input');
    
    if (tipo === 'detal') {
      precioDetalContainer.style.display = 'block';
      wholesalePrices.style.display = 'none';
      detalInputs.forEach(input => input.setAttribute('required', ''));
      mayorInputs.forEach(input => input.removeAttribute('required'));
    } else if (tipo === 'mayor') {
      precioDetalContainer.style.display = 'none';
      wholesalePrices.style.display = 'block';
      detalInputs.forEach(input => input.removeAttribute('required'));
      mayorInputs.forEach(input => input.setAttribute('required', ''));
    } else {
      precioDetalContainer.style.display = 'block';
      wholesalePrices.style.display = 'block';
      detalInputs.forEach(input => input.setAttribute('required', ''));
      mayorInputs.forEach(input => input.setAttribute('required', ''));
    }
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
      return;
    }
    
    const formData = new FormData(e.target);
    const productId = parseInt(formData.get('productId'));
    const tipo = formData.get('tipo');
    
    const updatedProduct = {
      id: productId,
      nombre: formData.get('nombre'),
      descripcion: formData.get('descripcion'),
      categoria: formData.get('categoria'),
      tipo: tipo
    };
    
    if (tipo === 'detal' || tipo === 'ambos') {
      updatedProduct.precio = parseFloat(formData.get('precio'));
    }
    
    if (tipo === 'mayor' || tipo === 'ambos') {
      updatedProduct.precioMayor = [
        { cantidad: "12-24 unidades", precio: parseFloat(formData.get('precio12-24')) },
        { cadena: "25-49 unidades", precio: parseFloat(formData.get('precio25-49')) },
        { cadena: "50+ unidades", precio: parseFloat(formData.get('precio50')) }
      ];
    }
    
    const index = productos.findIndex(p => p.id === productId);
    if (index !== -1) {
      productos[index] = updatedProduct;
      document.getElementById('edit-modal').style.display = 'none';
      renderProductos();
    }
  }

  function renderProductos() {
    console.log('Rendering productos...');
    console.log('Productos array:', productos);
    
    const productosDetal = productos.filter(p => p.tipo === 'detal' || p.tipo === 'ambos');
    console.log('Productos detal:', productosDetal);
    
    const productosMayor = productos.filter(p => p.tipo === 'mayor' || p.tipo === 'ambos');
    console.log('Productos mayor:', productosMayor);

    detalContainer.innerHTML = productosDetal.map(p => createProductCard(p, false)).join('');
    
    mayorContainer.innerHTML = productosMayor.map(p => createProductCard(p, true)).join('');

    detalContainer.innerHTML += createAddProductCard();
    mayorContainer.innerHTML += createAddProductCard();

    const existingForms = document.querySelectorAll('.modal-overlay');
    existingForms.forEach(form => form.remove());

    document.body.insertAdjacentHTML('beforeend', createAddProductForm(false));
    document.body.insertAdjacentHTML('beforeend', createAddProductForm(true));

    const tablaPreciosMayor = document.getElementById('tabla-precios-mayor');
    const contactSectionDetal = document.getElementById('contact-section-detal');
    const contactSectionMayor = document.getElementById('contact-section-mayor');

    if (tablaPreciosMayor) tablaPreciosMayor.innerHTML = createPriceTable();
    if (contactSectionDetal) contactSectionDetal.innerHTML = createContactSection();
    if (contactSectionMayor) contactSectionMayor.innerHTML = createContactSection();

    setupAddProductListeners();
    setupEditProductListeners();
  }

  function setupAddProductListeners() {
    const retailAddCard = detalContainer.querySelector('.add-product-card');
    const retailModal = document.getElementById('retail-modal');
    const retailForm = document.getElementById('retail-form');

    retailAddCard.addEventListener('click', () => {
      retailModal.style.display = 'flex';
    });

    const wholesaleAddCard = mayorContainer.querySelector('.add-product-card');
    const wholesaleModal = document.getElementById('wholesale-modal');
    const wholesaleForm = document.getElementById('wholesale-form');

    wholesaleAddCard.addEventListener('click', () => {
      wholesaleModal.style.display = 'flex';
    });

    document.querySelectorAll('.add-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const newCategory = prompt('Ingrese el nombre de la nueva categoría:');
        if (newCategory && newCategory.trim()) {
          const select = e.target.previousElementSibling;
          const option = document.createElement('option');
          option.value = newCategory.toLowerCase().trim();
          option.textContent = newCategory.trim();
          select.appendChild(option);
          select.value = option.value;
        }
      });
    });

    document.querySelectorAll('.remove-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const select = e.target.previousElementSibling.previousElementSibling;
        if (select.options.length > 1) {
          if (confirm('¿Está seguro que desea eliminar la categoría seleccionada?')) {
            select.remove(select.selectedIndex);
          }
        } else {
          alert('Debe mantener al menos una categoría');
        }
      });
    });

    const setupTipoChangeHandler = (formId) => {
      const form = document.getElementById(formId);
      const tipoSelect = form.querySelector('#tipo');
      const precioDetalContainer = form.querySelector('.precio-detal-container');
      const wholesalePrices = form.querySelector('.wholesale-prices');

      const updateRequiredFields = () => {
        const precioDetalInput = precioDetalContainer.querySelector('input');
        const wholesaleInputs = wholesalePrices.querySelectorAll('input');
        const tipo = tipoSelect.value;
        
        if (tipo === 'detal') {
          precioDetalContainer.style.display = 'block';
          wholesalePrices.style.display = 'none';
          precioDetalInput.setAttribute('required', '');
          wholesaleInputs.forEach(input => {
            input.removeAttribute('required');
            input.value = '';
          });
        } else if (tipo === 'mayor') {
          precioDetalContainer.style.display = 'none';
          wholesalePrices.style.display = 'block';
          precioDetalInput.removeAttribute('required');
          precioDetalInput.value = '';
          wholesaleInputs.forEach(input => input.setAttribute('required', ''));
        } else {
          precioDetalContainer.style.display = 'block';
          wholesalePrices.style.display = 'block';
          precioDetalInput.setAttribute('required', '');
          wholesaleInputs.forEach(input => input.setAttribute('required', ''));
        }
      };

      tipoSelect.addEventListener('change', updateRequiredFields);
      updateRequiredFields(); 
    };

    setupTipoChangeHandler('retail-form');
    setupTipoChangeHandler('wholesale-form');

    function validateForm(form) {
      const formData = new FormData(form);
      const tipo = formData.get('tipo');
      
      if (!formData.get('nombre')?.trim()) {
        alert('El nombre del producto es requerido');
        return false;
      }
      
      if (!formData.get('descripcion')?.trim()) {
        alert('La descripción del producto es requerida');
        return false;
      }

      if (!formData.get('categoria')) {
        alert('Debe seleccionar una categoría');
        return false;
      }

      if (tipo === 'detal' || tipo === 'ambos') {
        const precio = formData.get('precio');
        if (!precio || parseFloat(precio) <= 0) {
          alert('Debe ingresar un precio al detal válido');
          return false;
        }
      }

      if (tipo === 'mayor' || tipo === 'ambos') {
        const precio12_24 = formData.get('precio12-24');
        const precio25_49 = formData.get('precio25-49');
        const precio50 = formData.get('precio50');

        if (!precio12_24 || !precio25_49 || !precio50 || 
            parseFloat(precio12_24) <= 0 || 
            parseFloat(precio25_49) <= 0 || 
            parseFloat(precio50) <= 0) {
          alert('Debe ingresar todos los precios al por mayor y deben ser mayores a 0');
          return false;
        }

        if (parseFloat(precio12_24) <= parseFloat(precio25_49) || 
            parseFloat(precio25_49) <= parseFloat(precio50)) {
          alert('Los precios al por mayor deben ser decrecientes según aumenta la cantidad');
          return false;
        }
      }

      return true;
    }

    document.getElementById('retail-form').addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(this)) {
        handleProductSubmit(e);
      }
    });

    document.getElementById('wholesale-form').addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(this)) {
        handleProductSubmit(e);
      }
    });

    document.querySelectorAll('.modal-close').forEach(button => {
      button.addEventListener('click', () => {
        retailModal.style.display = 'none';
        wholesaleModal.style.display = 'none';
      });
    });

    [retailModal, wholesaleModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });
  }

  function handleProductSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tipo = formData.get('tipo');
    
    const newProduct = {
        id: productos.length + 1,
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        categoria: formData.get('categoria'),
        tipo: tipo
    };

    if (tipo === 'detal' || tipo === 'ambos') {
        newProduct.precio = parseFloat(formData.get('precio'));
    }
    
    if (tipo === 'mayor' || tipo === 'ambos') {
        newProduct.precioMayor = [
            { cantidad: "12-24 unidades", precio: parseFloat(formData.get('precio12-24')) },
            { cantidad: "25-49 unidades", precio: parseFloat(formData.get('precio25-49')) },
            { cantidad: "50+ unidades", precio: parseFloat(formData.get('precio50')) }
        ];
    }
    
    productos.push(newProduct);
    e.target.closest('.modal-overlay').style.display = 'none';
    e.target.reset();
    renderProductos();
  }

  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      document.querySelectorAll('.productos-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });
      
      const targetSection = document.getElementById(target);
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
    });
  });

  const detalSection = document.getElementById('detal-section');
  if (detalSection) {
    detalSection.classList.add('active');
    detalSection.style.display = 'block';
    const detalButton = document.querySelector('[data-target="detal-section"]');
    if (detalButton) {
      detalButton.classList.add('active');
    }
  }

  renderProductos();
  setupDownloadButton();
});

function createEditContactForm() {
  const contactInfo = JSON.parse(localStorage.getItem('contactInfo')) || {
    phone: '+57 312 123-4567',
    whatsapp: '+57 312 123-4567',
    email: 'ventas@naturallife.com',
    address: 'Av. Principal, Local 123\nCiudad Comercial'
  };

  return `
    <div class="modal-overlay" id="edit-contact-modal">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Información de Contacto</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form class="edit-contact-form" id="edit-contact-form">
          <div class="form-group">
            <label for="edit-phone">Teléfono</label>
            <input type="tel" id="edit-phone" name="phone" value="${contactInfo.phone}" required>
          </div>
          
          <div class="form-group">
            <label for="edit-whatsapp">WhatsApp</label>
            <input type="tel" id="edit-whatsapp" name="whatsapp" value="${contactInfo.whatsapp}" required>
          </div>
          
          <div class="form-group">
            <label for="edit-email">Email</label>
            <input type="email" id="edit-email" name="email" value="${contactInfo.email}" required>
          </div>
          
          <div class="form-group">
            <label for="edit-address">Dirección</label>
            <textarea id="edit-address" name="address" rows="3" required>${contactInfo.address}</textarea>
          </div>
          
          <button type="submit" class="submit-button">Guardar Cambios</button>
        </form>
      </div>
    </div>
  `;
}

function setupContactEditor() {
  if (!document.getElementById('edit-contact-modal')) {
    document.body.insertAdjacentHTML('beforeend', createEditContactForm());
  }

  const editContactModal = document.getElementById('edit-contact-modal');
  const editContactForm = document.getElementById('edit-contact-form');

  document.querySelectorAll('.edit-contact-button').forEach(button => {
    button.addEventListener('click', () => {
      editContactModal.style.display = 'flex';
    });
  });

  editContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactInfo = {
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      address: formData.get('address')
    };

    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));

    editContactModal.style.display = 'none';

    const contactSectionDetal = document.getElementById('contact-section-detal');
    const contactSectionMayor = document.getElementById('contact-section-mayor');

    if (contactSectionDetal) contactSectionDetal.innerHTML = createContactSection();
    if (contactSectionMayor) contactSectionMayor.innerHTML = createContactSection();

    setupContactEditor();
  });

  editContactModal.querySelector('.modal-close').addEventListener('click', () => {
    editContactModal.style.display = 'none';
  });

  editContactModal.addEventListener('click', (e) => {
    if (e.target === editContactModal) {
      editContactModal.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupContactEditor();
});