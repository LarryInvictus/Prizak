// ---------------------------
// TAB SWITCHING
// ---------------------------
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// ---------------------------
// COPY BUTTONS
// ---------------------------
document.querySelectorAll('.copy').forEach(button => {
  button.addEventListener('click', async () => {
    const id = button.dataset.copy;
    const textArea = document.getElementById(id);
    const msg = button.parentElement.querySelector('.copyMsg');

    try {
      await navigator.clipboard.writeText(textArea.value.trim());
      msg.textContent = "Copied!";
      setTimeout(() => msg.textContent = "", 2000);
    } catch {
      msg.textContent = "Copy failed";
    }
  });
});

// ---------------------------
// SIGN IN (local only)
// ---------------------------
const signinBtn = document.getElementById('signinBtn');
const signinMsg = document.getElementById('signinMsg');

signinBtn.addEventListener('click', () => {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!user || !pass) {
    signinMsg.textContent = "❌ Missing username or password";
    signinMsg.style.display = "block";
    return;
  }

  signinMsg.textContent = "✅ Signed in (local only)";
  signinMsg.style.display = "block";
});
