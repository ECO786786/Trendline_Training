document.addEventListener("DOMContentLoaded", function () {
  // Course Content Modal Toggle
  document.querySelectorAll(".view-content-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".p-6").querySelector(".course-content-modal");
      if (modal) {
        modal.style.opacity = "0";
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => {
          modal.style.transition = "opacity 0.3s ease-in-out";
          modal.style.opacity = "1";
        });
      }
    });
  });

  document.querySelectorAll(".close-content-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".course-content-modal");
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }, 300);
    });
  });

  document.querySelectorAll(".course-content-modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.opacity = "0";
        setTimeout(() => {
          modal.classList.add("hidden");
          document.body.style.overflow = "auto";
        }, 300);
      }
    });
  });

  //mobile nav
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    overlay.classList.remove("hidden");
    menuToggle.classList.add("open");
    document.body.classList.add("overflow-hidden");
  }

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    overlay.classList.add("hidden");
    menuToggle.classList.remove("open");
    document.body.classList.remove("overflow-hidden");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    isOpen ? closeMenu() : openMenu();
  });

  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  overlay.addEventListener("click", closeMenu);

  // Services Modal
  const exploreServicesBtn = document.getElementById("exploreServicesBtn");
  const servicesModal = document.getElementById("servicesModal");
  const closeServicesModal = document.getElementById("closeServicesModal");

  if (exploreServicesBtn && servicesModal && closeServicesModal) {
    exploreServicesBtn.addEventListener("click", () => {
      servicesModal.style.opacity = "0";
      servicesModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        servicesModal.style.transition = "opacity 0.3s ease-in-out";
        servicesModal.style.opacity = "1";
      });
    });

    const closeModal = () => {
      servicesModal.style.opacity = "0";
      setTimeout(() => {
        servicesModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }, 300);
    };

    closeServicesModal.addEventListener("click", closeModal);
    servicesModal.addEventListener("click", (e) => {
      if (e.target === servicesModal) closeModal();
    });

    servicesModal
      .querySelector(".bg-white")
      ?.addEventListener("click", (e) => e.stopPropagation());
  }

  // Event Registration Modal
  document.querySelectorAll(".register-event-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const eventCard = btn.closest(".rounded-lg");
      const eventName = eventCard.querySelector("h3").textContent;
      const eventDate = eventCard.querySelector(".text-gray-500").textContent;
      const eventPrice = eventCard.querySelector(".text-primary").textContent;

      const successModal = document.createElement("div");
      successModal.className =
        "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center";
      successModal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="ri-check-line text-green-500 ri-2x"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
            <p class="text-gray-600 mb-6">Thank you for registering for ${eventName}. We'll send you a confirmation email.</p>
            <button class="bg-primary text-white px-6 py-2 !rounded-button font-medium hover:bg-primary/90 transition">Close</button>
          </div>
        </div>`;
      document.body.appendChild(successModal);
      successModal.querySelector("button").onclick = () =>
        successModal.remove();
    });
  });

  // Enrollment Modal
  const enrollmentModal = document.getElementById("enrollmentModal");
  const closeEnrollmentModal = document.getElementById("closeEnrollmentModal");
  const enrollmentForm = document.getElementById("enrollmentForm");
  const programNameInput = document.getElementById("programName");
  const programPriceInput = document.getElementById("programPrice");

  document.querySelectorAll(".enroll-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".service-card");
      const programName = card.querySelector("h3").textContent;
      const programPrice = card.querySelector(".price").textContent;
      programNameInput.value = programName;
      programPriceInput.value = programPrice;
      enrollmentModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeEnrollmentModal) {
    closeEnrollmentModal.addEventListener("click", () => {
      enrollmentModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    });
  }

  enrollmentModal.addEventListener("click", (e) => {
    if (e.target === enrollmentModal) {
      enrollmentModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });

  const form = document.getElementById("enrollmentForm");

  async function handleEnrollmentSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("enrollment-status");
    const data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          const successModal = document.createElement("div");
          successModal.className =
            "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center";
          successModal.innerHTML = `
				    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
				      <div class="text-center">
				        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
				          <i class="ri-check-line text-green-500 ri-2x"></i>
				        </div>
				        <h3 class="text-xl font-bold text-gray-900 mb-2">Enrollment Submitted!</h3>
				        <p class="text-gray-600 mb-6">Thank you for enrolling. We'll contact you shortly.</p>
				        <button class="bg-primary text-white px-6 py-2 !rounded-button font-medium hover:bg-primary/90 transition">Close</button>
				      </div>
				    </div>
				  `;
          document.body.appendChild(successModal);
          successModal.querySelector("button").onclick = () => {
            successModal.remove();
            enrollmentModal.classList.add("hidden");
            document.body.style.overflow = "auto";
          };
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML = "There was a problem submitting your form.";
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "There was a problem submitting your form.";
      });
  }

  form.addEventListener("submit", handleEnrollmentSubmit);
});

//Enquire Modal
const form = document.getElementById("contactForm");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalIcon = document.getElementById("modalIcon");
const modalClose = document.getElementById("modalClose");

modalClose.addEventListener("click", () => modal.classList.add("hidden"));

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fields = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    company: form.company.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim(),
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = [];

  if (!fields.name) errors.push("Full Name is required.");
  if (!fields.email || !emailRegex.test(fields.email))
    errors.push("A valid Email Address is required.");
  if (!fields.phone) errors.push("Phone Number is required.");
  if (!fields.subject) errors.push("Subject is required.");
  if (!fields.message) errors.push("Message is required.");

  if (errors.length > 0) {
    modalTitle.textContent = "Please add the following:";
    modalContent.innerHTML = `<ul class="list-disc pl-5 space-y-1">${errors
      .map((e) => `<li>${e}</li>`)
      .join("")}</ul>`;
    modalIcon.innerHTML = `<i class="ri-error-warning-line text-red-500 text-3xl"></i>`;
    modalIcon.className =
      "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4";
    modal.classList.remove("hidden");
    return;
  }

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action || window.location.pathname, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      modalTitle.textContent = "Message Sent!";
      modalContent.innerHTML = `<p>Thanks for getting in touch. We’ll get back to you soon.</p>`;
      modalIcon.innerHTML = `<i class="ri-check-line text-green-600 text-3xl"></i>`;
      modalIcon.className =
        "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4";
      modal.classList.remove("hidden");
      form.reset();
    } else {
      throw new Error("Server error");
    }
  } catch (err) {
    modalTitle.textContent = "Something went wrong";
    modalContent.innerHTML = `<p>There was an error sending your message. Please try again later.</p>`;
    modalIcon.innerHTML = `<i class="ri-error-warning-line text-red-500 text-3xl"></i>`;
    modalIcon.className =
      "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4";
    modal.classList.remove("hidden");
  }
});
