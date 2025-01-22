// Register User
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("backend/register.php", {
        method: "POST",
        body: formData,
    });
    const result = await response.json();
    document.getElementById("feedback").textContent = result.message;
    if (result.success) {
        window.location.href = "login.html";
    }
});

// Login User
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("backend/login.php", {
        method: "POST",
        body: formData,
    });
    const result = await response.json();
    document.getElementById("feedback").textContent = result.message;
    if (result.success) {
        window.location.href = "sms_email_dashboard.html";
    }
});