document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    const email = document.getElementById('email').value;
    const idNumber = document.getElementById('id_number').value;
    const dob = document.getElementById('dob').value;
    const parentEmail = document.getElementById('parent_email').value;

    if (!validateEmail(email) || !validateEmail(parentEmail)) {
      alert('Please enter a valid email.');
      event.preventDefault();
    }

    if (!validateID(idNumber)) {
      alert('Invalid ID number.');
      event.preventDefault();
    }

    if (!validateDOB(dob)) {
      alert('Date of birth must be in the past.');
      event.preventDefault();
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validateID(id) {
    return id.length === 13 && !isNaN(id);
  }

  function validateDOB(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    return birthDate < today;
  }
});
