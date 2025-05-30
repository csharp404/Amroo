    // Switch between supervisor and student forms
    document.getElementById('supervisorBtn').addEventListener('click', () => {
      document.getElementById('supervisorBtn').classList.add('active');
      document.getElementById('studentBtn').classList.remove('active');
      showForm('supervisor');
    });
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
    document.getElementById('studentBtn').addEventListener('click', () => {
      document.getElementById('studentBtn').classList.add('active');
      document.getElementById('supervisorBtn').classList.remove('active');
      showForm('student');
    });

    function showForm(role) {
      const supervisorContainer = document.getElementById('supervisorFormContainer');
      const studentContainer = document.getElementById('studentFormContainer');

      if (role === 'supervisor') {
        supervisorContainer.classList.add('active');
        studentContainer.classList.remove('active');
      } else {
        supervisorContainer.classList.remove('active');
        studentContainer.classList.add('active');
      }
    }

    async function handleLogin(event, role) {
      event.preventDefault();

      let email, password;

      if (role === 'supervisor') {
        email = document.getElementById('supervisorNumber').value.trim();
        password = document.getElementById('supervisorPassword').value.trim();
      } else {
        email = document.getElementById('studentNumber').value.trim();
        password = document.getElementById('studentPassword').value.trim();
      }

      // Hide previous error messages
      document.getElementById('loginErrorSupervisor').style.display = 'none';
      document.getElementById('loginErrorStudent').style.display = 'none';

      // Basic validation
      if (!email || !password) {
        alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
        return;
      }

      try {
        const response = await fetch('https://localhost:7133/api/Account/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          // Show error message under form
          if (role === 'supervisor') {
            document.getElementById('loginErrorSupervisor').style.display = 'block';
          } else {
            document.getElementById('loginErrorStudent').style.display = 'block';
          }
          return;
        }

        const token = await response.text(); // assuming token is returned as plain text

        if (token) {
          // Save token to cookies
          document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

          // Redirect based on role
          if (role === 'supervisor') {
            window.location.href = 'dach_test.html';
          } else {
            window.location.href = 'main.html';
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        alert("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مجددًا.");
      }
    }

    // Initially show the supervisor form
    document.getElementById('supervisorFormContainer').classList.add('active');
