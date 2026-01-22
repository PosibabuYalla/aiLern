// Clear existing user sessions
localStorage.removeItem('user');
localStorage.removeItem('authToken');
localStorage.removeItem('rememberedCredentials');
console.log('All user sessions cleared. Users must log in again.');