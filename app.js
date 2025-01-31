document.addEventListener('DOMContentLoaded', () => {
  const detalContainer = document.getElementById('productos-detal');
  const mayorContainer = document.getElementById('productos-mayor');
  const toggleButtons = document.querySelectorAll('.toggle-button');

  function createProductSVG() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    `;
  }

  function createProductCard(producto, isMayor = false) {
    const imageHTML = producto.imagen ? 
      `<img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 100%; object-fit: contain;">` :
      createProductSVG();

    const editButton = `
      <button class="edit-button" data-product-id="${producto.id}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
    `;

    return `
      ${isMayor ? 
        `<div class="producto-card">
          ${editButton}
          <div class="producto-imagen">
            ${imageHTML}
          </div>
          <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
          </div>
        </div>` : 
        `<div class="producto-card">
          ${editButton}
          <div class="producto-imagen">
            ${imageHTML}
          </div>
          <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <span class="producto-precio">$${producto.precio}</span>
          </div>
        </div>`
      }
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
    return `
      <div class="contact-section">
        <button class="edit-button" data-section="contact">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <h3>Contacto y Pedidos</h3>
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
              <p class="contact-phone">Teléfono: +58 (424) 123-4567</p>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 20.4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7.4l-4.4 3.4z"/>
                <path d="M18 9.4C18 9.4 14.5 12 12 12c-2.5 0-6-2.6-6-2.6"/>
              </svg>
              <p class="contact-whatsapp">WhatsApp: +58 (424) 123-4567</p>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p class="contact-email">Email: ventas@naturallife.com</p>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p class="contact-address">Av. Principal, Local 123<br>Ciudad Comercial</p>
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
              <label for="imagen">Imagen del Producto</label>
              <input type="file" id="imagen" name="imagen" accept="image/*" class="file-input">
              <div class="image-preview"></div>
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

  function createEditProductForm(isWholesale = false) {
    return `
      <div class="modal-overlay" id="${isWholesale ? 'wholesale' : 'retail'}-edit-modal">
        <div class="modal">
          <div class="modal-header">
            <h3>Editar Producto</h3>
            <button class="modal-close">&times;</button>
          </div>
          <form class="edit-product-form" id="${isWholesale ? 'wholesale' : 'retail'}-edit-form">
            <input type="hidden" name="productId" id="edit-product-id">
            <div class="form-group">
              <label for="edit-nombre">Nombre del Producto</label>
              <input type="text" id="edit-nombre" name="nombre" required>
            </div>
            
            <div class="form-group">
              <label for="edit-descripcion">Descripción</label>
              <textarea id="edit-descripcion" name="descripcion" rows="3" required></textarea>
            </div>

            <div class="form-group">
              <label for="edit-imagen">Imagen del Producto</label>
              <input type="file" id="edit-imagen" name="imagen" accept="image/*" class="file-input">
              <div class="image-preview"></div>
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
            
            <div class="precio-detal-container">
              <div class="form-group">
                <label for="edit-precio">Precio al Detal</label>
                <input type="number" id="edit-precio" name="precio" step="0.01" required>
              </div>
            </div>

            <div class="wholesale-prices">
              <div class="form-group">
                <label for="edit-precio12-24">Precio (12-24 u)</label>
                <input type="number" id="edit-precio12-24" name="precio12-24" step="0.01" required>
              </div>
              
              <div class="form-group">
                <label for="edit-precio25-49">Precio (25-49 u)</label>
                <input type="number" id="edit-precio25-49" name="precio25-49" step="0.01" required>
              </div>
              
              <div class="form-group">
                <label for="edit-precio50">Precio (50+ u)</label>
                <input type="number" id="edit-precio50" name="precio50" step="0.01" required>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="submit-button">Guardar Cambios</button>
              <button type="button" class="delete-button">Eliminar Producto</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function renderProductos() {
    const productosDetal = productos.filter(p => p.tipo === 'detal' || p.tipo === 'ambos');
    detalContainer.innerHTML = productosDetal.map(p => createProductCard(p, false)).join('');

    const productosMayor = productos.filter(p => p.tipo === 'mayor' || p.tipo === 'ambos');
    mayorContainer.innerHTML = productosMayor.map(p => createProductCard(p, true)).join('');

    const existingRetailModal = document.getElementById('retail-modal');
    const existingWholesaleModal = document.getElementById('wholesale-modal');
    const existingRetailEditModal = document.getElementById('retail-edit-modal');
    const existingWholesaleEditModal = document.getElementById('wholesale-edit-modal');
    
    if (existingRetailModal) existingRetailModal.remove();
    if (existingWholesaleModal) existingWholesaleModal.remove();
    if (existingRetailEditModal) existingRetailEditModal.remove();
    if (existingWholesaleEditModal) existingWholesaleEditModal.remove();

    detalContainer.innerHTML += createAddProductCard();
    document.body.insertAdjacentHTML('beforeend', createAddProductForm(false));

    mayorContainer.innerHTML += createAddProductCard();
    document.body.insertAdjacentHTML('beforeend', createAddProductForm(true));

    document.getElementById('tabla-precios-mayor').innerHTML = createPriceTable();
    document.getElementById('contact-section-detal').innerHTML = createContactSection();
    document.getElementById('contact-section-mayor').innerHTML = createContactSection();

    setupAddProductListeners();
  }

  let imagePreviewDataUrl = null;

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
        const tipo = tipoSelect.value;
        if (tipo === 'detal') {
          precioDetalContainer.style.display = 'block';
          wholesalePrices.style.display = 'none';
          wholesalePrices.querySelectorAll('input').forEach(input => {
            input.removeAttribute('required');
            input.value = '';
          });
          precioDetalContainer.querySelector('input').setAttribute('required', '');
        } else if (tipo === 'mayor') {
          precioDetalContainer.style.display = 'none';
          wholesalePrices.style.display = 'block';
          precioDetalContainer.querySelector('input').removeAttribute('required');
          precioDetalContainer.querySelector('input').value = '';
          wholesalePrices.querySelectorAll('input').forEach(input => input.setAttribute('required', ''));
        } else {
          precioDetalContainer.style.display = 'block';
          wholesalePrices.style.display = 'block';
          precioDetalContainer.querySelector('input').setAttribute('required', '');
          wholesalePrices.querySelectorAll('input').forEach(input => input.setAttribute('required', ''));
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
    
    setupImagePreview();

    document.body.insertAdjacentHTML('beforeend', createEditProductForm(false));
    document.body.insertAdjacentHTML('beforeend', createEditProductForm(true));

    document.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', (e) => {
        if (!button.dataset.productId) {
          // This is a contact edit button
          e.stopPropagation();
          const contactSection = button.closest('.contact-section');
          if (contactSection) {
            showContactEditModal(contactSection);
          }
          return;
        }

        e.stopPropagation();
        const productId = button.dataset.productId;
        const product = productos.find(p => p.id === parseInt(productId));
        if (!product) return;

        const isWholesale = product.tipo === 'mayor' || product.tipo === 'ambos';
        
        const modalId = isWholesale ? 'wholesale-edit-modal' : 'retail-edit-modal';
        const modal = document.getElementById(modalId);
        const form = modal.querySelector('form');
        
        // Add event listener for close button
        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
          modal.style.display = 'none';
        });

        // Add event listener for clicking outside modal
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });
        
        form.querySelector('#edit-product-id').value = product.id;
        form.querySelector('#edit-nombre').value = product.nombre;
        form.querySelector('#edit-descripcion').value = product.descripcion;
        form.querySelector('#edit-categoria').value = product.categoria;
        form.querySelector('#edit-tipo').value = product.tipo;
        
        if (product.tipo === 'detal' || product.tipo === 'ambos') {
          form.querySelector('#edit-precio').value = product.precio;
        }
        
        if (product.tipo === 'mayor' || product.tipo === 'ambos') {
          form.querySelector('#edit-precio12-24').value = product.precioMayor[0].precio;
          form.querySelector('#edit-precio25-49').value = product.precioMayor[1].precio;
          form.querySelector('#edit-precio50').value = product.precioMayor[2].precio;
        }
        
        const imagePreview = form.querySelector('.image-preview');
        imagePreview.innerHTML = product.imagen ? 
          `<img src="${product.imagen}" style="max-width: 100%; max-height: 200px;">` : '';
        
        modal.style.display = 'flex';
        
        const tipoSelect = form.querySelector('#edit-tipo');
        const updateFields = () => {
          const tipo = tipoSelect.value;
          const precioDetalContainer = form.querySelector('.precio-detal-container');
          const wholesalePrices = form.querySelector('.wholesale-prices');
          
          precioDetalContainer.style.display = (tipo === 'detal' || tipo === 'ambos') ? 'block' : 'none';
          wholesalePrices.style.display = (tipo === 'mayor' || tipo === 'ambos') ? 'block' : 'none';
        };
        
        tipoSelect.addEventListener('change', updateFields);
        updateFields();
      });
    });

    document.querySelectorAll('.edit-product-form').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
          const formData = new FormData(this);
          const productId = parseInt(formData.get('productId'));
          const imageFile = this.querySelector('input[type="file"]').files[0];
          
          const updateProduct = () => {
            const productIndex = productos.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
              const updatedProduct = {
                ...productos[productIndex],
                nombre: formData.get('nombre'),
                descripcion: formData.get('descripcion'),
                categoria: formData.get('categoria'),
                tipo: formData.get('tipo')
              };
              
              if (formData.get('tipo') === 'detal' || formData.get('tipo') === 'ambos') {
                updatedProduct.precio = parseFloat(formData.get('precio'));
              }
              
              if (formData.get('tipo') === 'mayor' || formData.get('tipo') === 'ambos') {
                updatedProduct.precioMayor = [
                  { cantidad: "12-24 unidades", precio: parseFloat(formData.get('precio12-24')) },
                  { cantidad: "25-49 unidades", precio: parseFloat(formData.get('precio25-49')) },
                  { cantidad: "50+ unidades", precio: parseFloat(formData.get('precio50')) }
                ];
              }
              
              if (imageFile) {
                updatedProduct.imagen = imagePreviewDataUrl;
              }
              
              productos[productIndex] = updatedProduct;
              this.closest('.modal-overlay').style.display = 'none';
              renderProductos();
            }
          };
          
          if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
              imagePreviewDataUrl = event.target.result;
              updateProduct();
            };
            reader.readAsDataURL(imageFile);
          } else {
            updateProduct();
          }
        }
      });

      const deleteButton = form.querySelector('.delete-button');
      deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = parseInt(form.querySelector('#edit-product-id').value);
        
        if (confirm('¿Está seguro que desea eliminar este producto? Esta acción no se puede deshacer.')) {
          const productIndex = productos.findIndex(p => p.id === productId);
          if (productIndex !== -1) {
            productos.splice(productIndex, 1);
            form.closest('.modal-overlay').style.display = 'none';
            renderProductos();
          }
        }
      });
    });

    document.querySelectorAll('[data-section="contact"]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        showContactEditModal(e.target.closest('.contact-section'));
      });
    });
  }

  function handleProductSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tipo = formData.get('tipo');
    const imageFile = e.target.querySelector('input[type="file"]').files[0];
    
    const newProduct = {
      id: productos.length + 1,
      nombre: formData.get('nombre'),
      descripcion: formData.get('descripcion'),
      categoria: formData.get('categoria'),
      tipo: tipo
    };

    const finishProductSubmission = () => {
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
      const imagePreview = e.target.querySelector('.image-preview');
      imagePreview.innerHTML = '';
      imagePreviewDataUrl = null;
      renderProductos();
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        newProduct.imagen = event.target.result;
        finishProductSubmission();
      };
      reader.readAsDataURL(imageFile);
    } else {
      finishProductSubmission();
    }
  }

  function setupImagePreview() {
    document.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', function(e) {
        const preview = this.nextElementSibling;
        preview.innerHTML = '';
        
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '200px';
            preview.appendChild(img);
          }
          
          reader.readAsDataURL(this.files[0]);
        }
      });
    });
  }

  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      document.querySelectorAll('.productos-section').forEach(section => {
        section.style.display = 'none';
      });
      
      document.getElementById(target).style.display = 'block';
    });
  });

  document.getElementById('detal-section').style.display = 'block';
  document.querySelector('[data-target="detal-section"]').classList.add('active');

  renderProductos();
});

document.getElementById('downloadPdf').addEventListener('click', async function() {
  const { jsPDF } = window.jspdf;
  
  // Create a temporary container for all PDF content including cover
  const tempContainer = document.createElement('div');
  tempContainer.style.backgroundColor = '#ffffff';
  tempContainer.style.padding = '10px';
  
  // Get current viewport width
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  
  // Add the cover page container first
  const coverContainer = document.createElement('div');
  coverContainer.id = 'pdf-cover';
  coverContainer.style.width = '100%';
  coverContainer.style.marginBottom = '40px';
  coverContainer.innerHTML = window.pdfCoverContent || '';
  tempContainer.appendChild(coverContainer);

  // Add the content header
  const headerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #2c5530; font-size: 24px; margin-bottom: 15px; font-family: 'Poppins', sans-serif;">Nuestros Productos</h1>
      <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;">
        <button class="toggle-button ${document.getElementById('detal-section').style.display !== 'none' ? 'active' : ''}" 
                style="padding: 8px 16px; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; 
                       background-color: ${document.getElementById('detal-section').style.display !== 'none' ? '#2c5530' : '#e8efe9'}; 
                       color: ${document.getElementById('detal-section').style.display !== 'none' ? 'white' : '#2c5530'};
                       font-family: 'Poppins', sans-serif;
                       font-size: 14px;">
          Venta al Detal
        </button>
        <button class="toggle-button ${document.getElementById('mayor-section').style.display !== 'none' ? 'active' : ''}"
                style="padding: 8px 16px; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;
                       background-color: ${document.getElementById('mayor-section').style.display !== 'none' ? '#2c5530' : '#e8efe9'};
                       color: ${document.getElementById('mayor-section').style.display !== 'none' ? 'white' : '#2c5530'};
                       font-family: 'Poppins', sans-serif;
                       font-size: 14px;">
          Venta al Mayor
        </button>
      </div>
    </div>
  `;

  // Determine which section is currently visible
  const detalSection = document.getElementById('detal-section');
  const mayorSection = document.getElementById('mayor-section');
  const currentSection = detalSection.style.display !== 'none' ? detalSection : mayorSection;
  
  // Clone the current section and remove add product cards
  const sectionClone = currentSection.cloneNode(true);
  const addProductCards = sectionClone.querySelectorAll('.add-product-card');
  addProductCards.forEach(card => card.remove());
  
  // Add all content to temporary container
  tempContainer.innerHTML = '';
  tempContainer.appendChild(coverContainer);
  tempContainer.insertAdjacentHTML('beforeend', headerHTML);
  tempContainer.appendChild(sectionClone);
  
  // Apply responsive styles
  const styles = `
    <style>
      * {
        font-family: 'Poppins', sans-serif;
      }
      #pdf-cover {
        width: 100% !important;
        margin-bottom: 40px !important;
      }
      #pdf-cover img {
        width: 100% !important;
        height: auto !important;
        display: block !important;
      }
      .productos-grid {
        display: grid !important;
        grid-template-columns: ${viewportWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'} !important;
        gap: ${viewportWidth <= 768 ? '15px' : '25px'} !important;
        padding: 0.5rem !important;
        width: 100% !important;
      }
      .producto-card {
        background: #ffffff;
        border-radius: 10px;
        padding: ${viewportWidth <= 768 ? '1rem' : '1.8rem'};
        box-shadow: 0 4px 10px rgba(44, 85, 48, 0.15);
        border: 1px solid rgba(44, 85, 48, 0.1);
        width: 100% !important;
        box-sizing: border-box !important;
        margin: 0 !important;
        min-height: ${viewportWidth <= 768 ? '300px' : '400px'} !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .producto-imagen {
        width: 100%;
        height: ${viewportWidth <= 768 ? '180px' : '250px'} !important;
        background-color: #e8efe9;
        border-radius: 8px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden !important;
      }
      .producto-imagen img {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        max-width: 100% !important;
        max-height: 100% !important;
      }
    </style>
  `;

  tempContainer.insertAdjacentHTML('afterbegin', styles);
  
  document.body.appendChild(tempContainer);
  
  try {
    // Create canvas with responsive dimensions
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: viewportWidth,
      onclone: (clonedDoc) => {
        const clonedContainer = clonedDoc.querySelector('#' + currentSection.id);
        if (clonedContainer) {
          clonedContainer.style.display = 'block';
        }
      }
    });

    // Calculate PDF dimensions maintaining aspect ratio
    const imgWidth = viewportWidth;
    const aspectRatio = canvas.height / canvas.width;
    const imgHeight = imgWidth * aspectRatio;
    
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [imgWidth, imgHeight]
    });

    // Add the image to PDF
    pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, imgWidth, imgHeight);

    // Save the PDF
    const sectionType = detalSection.style.display !== 'none' ? 'Detal' : 'Mayor';
    pdf.save(`NaturalLife-Productos-${sectionType}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Hubo un error al generar el PDF. Por favor, intente nuevamente.');
  } finally {
    // Remove temporary container
    tempContainer.remove();
  }
});

function setPDFCover(coverHTML) {
  window.pdfCoverContent = coverHTML;
}

// Example of how to set the cover image:
// Add this code after your existing JavaScript code
setPDFCover('<img src="./imagen/portada.jpg" alt="Cover" style="width: 100%; height: auto; display: block;">');

// You can also use an absolute path if needed:
// setPDFCover('<img src="/path/to/your/cover.jpg" alt="Cover" style="width: 100%; height: auto; display: block;">');

function showContactEditModal(contactSection) {
  const modalHTML = `
    <div class="modal-overlay" id="contact-edit-modal">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Información de Contacto</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form class="edit-contact-form">
          <div class="form-group">
            <label for="edit-qr">Imagen QR</label>
            <input type="file" id="edit-qr" name="qr" accept="image/*" class="file-input">
            <div class="image-preview qr-preview"></div>
          </div>
          <div class="form-group">
            <label for="edit-qr-text">Texto del QR</label>
            <input type="text" id="edit-qr-text" name="qr-text" value="Escanea para contactarnos por WhatsApp">
          </div>
          <div class="form-group">
            <label for="edit-phone">Teléfono</label>
            <input type="tel" id="edit-phone" name="phone" value="${contactSection.querySelector('.contact-phone').textContent.split(': ')[1]}">
          </div>
          <div class="form-group">
            <label for="edit-whatsapp">WhatsApp</label>
            <input type="tel" id="edit-whatsapp" name="whatsapp" value="${contactSection.querySelector('.contact-whatsapp').textContent.split(': ')[1]}">
          </div>
          <div class="form-group">
            <label for="edit-email">Email</label>
            <input type="email" id="edit-email" name="email" value="${contactSection.querySelector('.contact-email').textContent.split(': ')[1]}">
          </div>
          <div class="form-group">
            <label for="edit-address">Dirección</label>
            <textarea id="edit-address" name="address">${contactSection.querySelector('.contact-address').textContent.trim()}</textarea>
          </div>
          <button type="submit" class="submit-button">Guardar Cambios</button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = document.getElementById('contact-edit-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const form = modal.querySelector('form');
  
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function(e) {
      const preview = this.nextElementSibling;
      preview.innerHTML = '';
      
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '200px';
          preview.appendChild(img);
        }
        
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
  
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    // Update contact information
    const qrText = formData.get('qr-text');
    const phone = formData.get('phone');
    const whatsapp = formData.get('whatsapp');
    const email = formData.get('email');
    const address = formData.get('address');
    
    // Update the contact section
    contactSection.querySelector('.qr-text').textContent = qrText;
    contactSection.querySelector('.contact-phone').textContent = `Teléfono: ${phone}`;
    contactSection.querySelector('.contact-whatsapp').textContent = `WhatsApp: ${whatsapp}`;
    contactSection.querySelector('.contact-email').textContent = `Email: ${email}`;
    contactSection.querySelector('.contact-address').textContent = address;
    
    // Handle QR image update
    const qrFile = form.querySelector('#edit-qr').files[0];
    if (qrFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const qrContainer = contactSection.querySelector('.qr-code');
        qrContainer.innerHTML = `
          <img src="${event.target.result}" class="qr-svg" alt="QR Code">
          <p class="qr-text">${qrText}</p>
        `;
      };
      reader.readAsDataURL(qrFile);
    }
    
    modal.remove();
  });
}