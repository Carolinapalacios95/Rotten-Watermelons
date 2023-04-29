const logout = async () => {
    const response = await fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };

  document.querySelector('#').addEventListener('click', logout);
// below is the instructional example to assist
/**
 * const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);

 */
