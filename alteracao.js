window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('alteracaoForm');
  const steps = Array.from(form.querySelectorAll('section'));
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const submitBtn = document.getElementById('submitBtn');
  let current = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('d-none', i !== index);
    });
    prevBtn.classList.toggle('d-none', index === 0);
    nextBtn.classList.toggle('d-none', index === steps.length - 1);
    submitBtn.classList.toggle('d-none', index !== steps.length - 1);
  }

  function validateStep() {
    const fields = steps[current].querySelectorAll('input, textarea');
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.classList.add('is-invalid');
        field.reportValidity();
        return false;
      }
      field.classList.remove('is-invalid');
    }
    return true;
  }

  nextBtn.addEventListener('click', () => {
    if (validateStep()) {
      current += 1;
      showStep(current);
    }
  });

  prevBtn.addEventListener('click', () => {
    current -= 1;
    showStep(current);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep()) {
      return;
    }
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    console.table(payload);
    alert('Formulário enviado com sucesso! (dados exibidos no console)');
    form.reset();
    current = 0;
    showStep(current);
  });

  showStep(current);
});
