document.getElementById('applicationForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const response = await fetch('application_handler.php', {
      method: 'POST',
      body: formData
    });
  
    const result = await response.json();
    alert(result.message);
  });
  