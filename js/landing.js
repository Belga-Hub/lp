document.addEventListener('DOMContentLoaded', function() {
  // Formulário e elementos relacionados
  const form = document.getElementById('beta-signup-form');
  const submitButton = document.getElementById('submit-button');
  const buttonText = document.querySelector('.button-text');
  const buttonLoader = document.getElementById('button-loader');
  const successMessage = document.getElementById('success-message');
  
  // Campos do formulário
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const companyInput = document.getElementById('company');
  const roleSelect = document.getElementById('role');
  const messageTextarea = document.getElementById('message');
  
  // Mensagens de erro
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const companyError = document.getElementById('company-error');
  const roleError = document.getElementById('role-error');
  
  // Função para validar email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Evento para validação em tempo real no campo de nome
  nameInput.addEventListener('input', function() {
    if (nameInput.value.trim() === '') {
      nameInput.classList.add('input-error');
      nameError.textContent = 'Nome é obrigatório';
      nameError.style.display = 'block';
    } else if (nameInput.value.trim().length < 3) {
      nameInput.classList.add('input-error');
      nameError.textContent = 'Nome deve ter pelo menos 3 caracteres';
      nameError.style.display = 'block';
    } else {
      nameInput.classList.remove('input-error');
      nameError.style.display = 'none';
    }
  });
  
  // Evento para validação em tempo real no campo de email
  emailInput.addEventListener('input', function() {
    if (emailInput.value.trim() === '') {
      emailInput.classList.add('input-error');
      emailError.textContent = 'Email é obrigatório';
      emailError.style.display = 'block';
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add('input-error');
      emailError.textContent = 'Email inválido';
      emailError.style.display = 'block';
    } else {
      emailInput.classList.remove('input-error');
      emailError.style.display = 'none';
    }
  });
  
  // Evento para validação em tempo real no campo de empresa
  companyInput.addEventListener('input', function() {
    if (companyInput.value.trim() === '') {
      companyInput.classList.add('input-error');
      companyError.textContent = 'Empresa é obrigatória';
      companyError.style.display = 'block';
    } else {
      companyInput.classList.remove('input-error');
      companyError.style.display = 'none';
    }
  });
  
  // Evento para validação em tempo real no campo de perfil
  roleSelect.addEventListener('change', function() {
    if (roleSelect.value === '') {
      roleSelect.classList.add('input-error');
      roleError.textContent = 'Selecione um perfil';
      roleError.style.display = 'block';
    } else {
      roleSelect.classList.remove('input-error');
      roleError.style.display = 'none';
    }
  });
  
  // Evento para envio do formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação final antes do envio
    let isValid = true;
    
    // Validar nome
    if (nameInput.value.trim() === '') {
      nameInput.classList.add('input-error');
      nameError.textContent = 'Nome é obrigatório';
      nameError.style.display = 'block';
      isValid = false;
    } else if (nameInput.value.trim().length < 3) {
      nameInput.classList.add('input-error');
      nameError.textContent = 'Nome deve ter pelo menos 3 caracteres';
      nameError.style.display = 'block';
      isValid = false;
    }
    
    // Validar email
    if (emailInput.value.trim() === '') {
      emailInput.classList.add('input-error');
      emailError.textContent = 'Email é obrigatório';
      emailError.style.display = 'block';
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add('input-error');
      emailError.textContent = 'Email inválido';
      emailError.style.display = 'block';
      isValid = false;
    }
    
    // Validar empresa
    if (companyInput.value.trim() === '') {
      companyInput.classList.add('input-error');
      companyError.textContent = 'Empresa é obrigatória';
      companyError.style.display = 'block';
      isValid = false;
    }
    
    // Validar perfil
    if (roleSelect.value === '') {
      roleSelect.classList.add('input-error');
      roleError.textContent = 'Selecione um perfil';
      roleError.style.display = 'block';
      isValid = false;
    }
    
    // Se o formulário for válido, enviar para o Google Sheets
    if (isValid) {
      // Mostrar loader e desabilitar botão
      buttonText.style.visibility = 'hidden';
      buttonLoader.style.display = 'block';
      submitButton.disabled = true;
      
      // Preparar dados para envio
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        company: companyInput.value.trim(),
        role: roleSelect.options[roleSelect.selectedIndex].text,
        message: messageTextarea.value.trim(),
        timestamp: new Date().toISOString()
      };
      
      // Enviar dados para o Google Script
      fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(formData)
      })
      .then(() => {
        // Ocultar o formulário e mostrar mensagem de sucesso
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        // Resetar formulário para uso futuro
        form.reset();
        
        // Remover loader e habilitar botão (para casos de back navigation)
        buttonText.style.visibility = 'visible';
        buttonLoader.style.display = 'none';
        submitButton.disabled = false;
      })
      .catch(error => {
        console.error('Erro ao enviar formulário:', error);
        
        // Remover loader e habilitar botão
        buttonText.style.visibility = 'visible';
        buttonLoader.style.display = 'none';
        submitButton.disabled = false;
        
        // Mostrar mensagem de erro
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      });
    }
  });
});
