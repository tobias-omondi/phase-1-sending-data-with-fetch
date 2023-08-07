// Add your code here
//first we will call our function

function submitData(name, email) {
  const formData = {
    name: name,
    email: email,
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(formData),
  };

  return fetch("http://localhost:3000/users", configObj)
    .then(response => response.json())
    .then(data => {
      const id = data.id; // Assuming the new ID is returned as "id"
      document.body.innerHTML += `<p>User ID: ${id}</p>`;
      return data;
    })
    .catch(error => {
      document.body.innerHTML += `<p>Error: ${error.message}</p>`;
    });
}
