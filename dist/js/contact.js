const EMAILJS_CONFIG = {
  PUBLIC_KEY: "Dt39oB4ts7OmZeXJ8",
  SERVICE_ID: "service_azqaj3d",
  TEMPLATE_ID: "template_5i83xif",
};

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Validate form
      if (!data.name || !data.email || !data.subject || !data.message) {
        showStatus("Please fill in all fields", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      formStatus.classList.add("hidden");

      try {
        // Check if EmailJS is configured (compared against placeholder markers)
        if (
          EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
          EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID" ||
          EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID"
        ) {
          throw new Error("EmailJS not configured");
        }

        // Initialize EmailJS with public key
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        // Send email via EmailJS
        const response = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          },
        );

        if (response.status !== 200) {
          throw new Error("Failed to send message");
        }

        // Show success message
        showStatus(
          "Message sent successfully! I'll be in touch soon.",
          "success",
        );
        contactForm.reset();
      } catch (error) {
        console.error("EmailJS Error:", error);
        const userFriendlyMessage =
          error.message === "EmailJS not configured"
            ? "Form service not configured yet. Please contact me directly at savvv.business@gmail.com"
            : "Failed to send message. Please try again or email me directly at savvv.business@gmail.com.";
        showStatus(userFriendlyMessage, "error");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `text-center text-sm ${
      type === "success" ? "text-green-400" : "text-red-400"
    }`;
    formStatus.classList.remove("hidden");

    // Hide message after 6 seconds
    setTimeout(() => {
      formStatus.classList.add("hidden");
    }, 6000);
  }
});
