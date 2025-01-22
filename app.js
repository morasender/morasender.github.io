document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  const fileInput = document.getElementById("fileInput");
  const statusDiv = document.getElementById("statusDiv");
  const scheduleInput = document.getElementById("scheduleInput");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const smtpConfigForm = document.getElementById("smtpConfigForm");
  const messageBox = document.getElementById("messageBox");
  const attachmentInput = document.getElementById("attachmentInput");

  let emailList = [];
  let phoneList = [];
  let apiConfigured = false;
  let smtpConfigured = false;

  // File Upload
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        processFile(content);
      };
      reader.readAsText(file);
    }
  });

  function processFile(content) {
    const lines = content.split("\n").filter(Boolean);
    lines.forEach((line) => {
      if (validateEmail(line)) emailList.push(line);
      else if (validatePhone(line)) phoneList.push(line);
    });
    updateStatus();
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePhone(phone) {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
  }

  function updateStatus() {
    statusDiv.textContent = `Emails: ${emailList.length}, Phones: ${phoneList.length}`;
  }

  // SMTP Configuration
  smtpConfigForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const smtpHost = e.target.smtpHost.value;
    const smtpPort = e.target.smtpPort.value;
    const smtpUser = e.target.smtpUser.value;
    const smtpPass = e.target.smtpPass.value;

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      smtpConfigured = true;
      alert("SMTP Configured Successfully");
    } else {
      smtpConfigured = false;
      alert("Invalid SMTP Configuration");
    }
  });

  // Sending Logic
  sendButton.addEventListener("click", () => {
    const message = messageBox.value;
    const attachment = attachmentInput.files[0];
    const schedule = scheduleInput.value;

    if (!message) {
      alert("Message cannot be empty!");
      return;
    }

    if (!apiConfigured && !smtpConfigured) {
      alert("Configure either API or SMTP before sending!");
      return;
    }

    if (emailList.length === 0 && phoneList.length === 0) {
      alert("No recipients found!");
      return;
    }

    simulateSending(emailList, phoneList, message, attachment, schedule);
  });

  function simulateSending(emails, phones, message, attachment, schedule) {
    let sent = 0;
    let failed = 0;

    emails.forEach((email) => {
      const success = Math.random() > 0.1;
      if (success) sent++;
      else failed++;
    });

    phones.forEach((phone) => {
      const success = Math.random() > 0.1;
      if (success) sent++;
      else failed++;
    });

    alert(
      `Messages Sent: ${sent}, Failed: ${failed}. Scheduled for: ${
        schedule || "Now"
      }.`
    );
  }

  apiKeyInput.addEventListener("input", (e) => {
    const key = e.target.value.trim();
    if (key) {
      apiConfigured = true;
    } else {
      apiConfigured = false;
    }
  });
});
