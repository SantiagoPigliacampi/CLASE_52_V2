export  async function createUser(user) {
  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function updateUser(userId, updatedUserData) {
  try {
    console.log('ID USUARIO en UPDATEUSER:', userId);
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function listarUsuarios(){

  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Users not found");
    }
    const data = await response.json();
    console.log(data);
    return [data];
  } catch (error) {
    console.error(error);
    return [];
  }
}