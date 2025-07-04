document.addEventListener("DOMContentLoaded", function () {
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

//Course Data

const courseData = [
  {
    id: 1,
    title: "Data Analytics Fundamentals",
    level: "Beginner",
    duration: "1 Week",
    prices: {
      ZM: { amount: 1500, currency: "ZMW" },
      US: { amount: 70, currency: "USD" },
    },
    overview:
      "A comprehensive SQL program designed to help you master database querying and analysis for business insights.",
    corporateBenefits: [
      "Customized programs tailored to your organization's specific data challenges and goals",
      "Flexible delivery options including on-site, virtual, and blended learning models",
      "Expert coaching and hands-on exercises to build practical data skills within your team",
      "Enhances cross-team collaboration and empowers data-driven decision-making across departments",
    ],
    content: [
      {
        title: "Excel Data Analysis & Pivot Tables",
        description:
          "Master data analysis techniques using Excel, create dynamic pivot tables, and generate insightful business reports",
      },
      {
        title: "Statistical Concepts & Data Cleaning",
        description:
          "Learn fundamental statistical concepts and techniques for preparing and cleaning data for analysis",
      },
      {
        title: "Data Visualization & Dashboards",
        description:
          "Create effective visualizations and interactive dashboards to communicate insights",
      },
      {
        title: "Data Collection & Organization",
        description:
          "Best practices for data collection, storage, and organization",
      },
      {
        title: "Basic SQL for Data Analysis",
        description:
          "Introduction to SQL queries for extracting and analyzing data from databases",
      },
    ],
    prerequisites: "None",
    certificate: "Yes",
  },
  {
    id: 2,
    title: "Intermediate Data Analytics",
    level: "Intermediate",
    duration: "2 Weeks",
    prices: {
      ZM: { amount: 2500, currency: "ZMW" },
      US: { amount: 110, currency: "USD" },
    },
    overview:
      "A comprehensive SQL program designed to help you master database querying and analysis for business insights.",
    corporateBenefits: [
      "Deliver tailored SQL training aligned with your business datasets and infrastructure",
      "On-site or virtual delivery models to match your team's availability",
      "Hands-on team projects designed to reflect real-world analytics challenges",
      "Incorporate your company’s tools, database systems, and reporting pipelines",
      "Optional post-training coaching and implementation support from our experts",
    ],
    content: [
      {
        title: "Database Design & Optimization",
        description:
          "Learn to design efficient database structures and optimize query performance",
      },
      {
        title: "Advanced SQL Queries & Joins",
        description:
          "Master complex queries, joins, and data manipulation techniques",
      },
      {
        title: "Data Analysis & Reporting",
        description:
          "Create comprehensive reports and derive actionable insights",
      },
      {
        title: "ETL Processes & Data Warehousing",
        description: "Understand ETL processes and data warehouse concepts",
      },
      {
        title: "Performance Tuning",
        description:
          "Learn techniques to optimize query performance and database efficiency",
      },
    ],
    prerequisites: "Basic SQL Knowledge",
    certificate: "Yes",
  },
  {
    id: 3,
    title: "Advanced Data Analytics & AI",
    level: "Advanced",
    duration: "4 Weeks",
    prices: {
      ZM: { amount: 4500, currency: "ZMW" },
      US: { amount: 200, currency: "USD" },
    },
    overview:
      "An advanced program focused on machine learning, AI applications, and enterprise-level data solutions.",
    corporateBenefits: [
      "Empower your teams with advanced AI and machine learning skills tailored to your industry",
      "Design bespoke AI workflows and data pipelines using your organizational data",
      "Support enterprise-scale decision-making with predictive modeling and automation",
      "On-site or virtual sessions delivered by senior data scientists with industry experience",
      "Post-training consultation to assist with real-world AI project implementation and optimization",
    ],
    content: [
      {
        title: "Machine Learning & AI Applications",
        description:
          "Implement machine learning algorithms and AI solutions for real-world business problems",
      },
      {
        title: "Advanced Statistical Modeling",
        description:
          "Master complex statistical models and predictive analytics techniques",
      },
      {
        title: "Neural Networks & Deep Learning",
        description:
          "Build and train neural networks for advanced pattern recognition and prediction",
      },
      {
        title: "Data Pipeline Development",
        description:
          "Design and implement automated data pipelines for enterprise solutions",
      },
      {
        title: "Advanced Analytics Tools",
        description:
          "Work with industry-standard tools and frameworks for advanced analytics",
      },
    ],
    prerequisites: "Intermediate Data Analytics",
    certificate: "Yes",
  },
  {
    id: 4,
    title: "Power BI Mastery Program",
    level: "Intermediate",
    duration: "2 Weeks",
    prices: {
      ZM: { amount: 3500, currency: "ZMW" },
      US: { amount: 150, currency: "USD" },
    },
    overview:
      "Transform your data into compelling stories. This course takes you beyond the basics to master Power BI tools, optimize data workflows, and deliver clear, impactful insights through dynamic dashboards.",
    corporateBenefits: [
      "Upskill your team to create executive-ready Power BI dashboards tailored to business needs",
      "Accelerate report automation and reduce manual data preparation time",
      "Empower departments to make data-driven decisions through real-time insights",
      "Deliver training using your company datasets for contextual relevance",
      "Includes guidance on enterprise Power BI deployment and access management",
    ],

    content: [
      {
        title: "Power BI Interface & Data Loading",
        description:
          "Navigate Power BI Desktop, connect to diverse data sources, and prepare data for analysis.",
      },
      {
        title: "Data Modeling & Relationships",
        description:
          "Build efficient data models using relationships, star schemas, and normalization best practices.",
      },
      {
        title: "DAX Essentials & Calculated Columns",
        description:
          "Write DAX formulas to create calculated columns, measures, and KPIs for advanced analytics.",
      },
      {
        title: "Interactive Dashboards & Visualizations",
        description:
          "Design compelling dashboards with slicers, filters, custom visuals, and tooltips.",
      },
      {
        title: "Power BI Service & Sharing Reports",
        description:
          "Publish reports to the Power BI Service, set up scheduled refresh, and share dashboards securely.",
      },
    ],
    prerequisites: "Basic Excel and Data Analysis Skills",
    certificate: "Yes",
  },
  {
    id: 5,
    title: "SQL for Data Analysis",
    level: "Intermediate",
    duration: "2 Weeks",
    prices: {
      ZM: { amount: 2500, currency: "ZMW" },
      US: { amount: 110, currency: "USD" },
    },
    overview:
      "This hand on SQL course is designed to equip you with essential querying skills to retrieve, clean, and analyze data from relational databases. You'll gain the confidence to extract insights, optimize queries, and contribute to data-driven decisions.",
    corporateBenefits: [
      "Train teams to write efficient SQL queries that support operational reporting and strategic analysis",
      "Enable staff to independently extract insights from company databases using real-world queries",
      "Boost productivity by reducing dependency on data engineers for routine data access",
      "Deliver customized sessions using your internal data schemas and reporting use cases",
      "Support cross-department collaboration through shared SQL best practices and documentation",
    ],
    content: [
      {
        title: "Database Design & Optimization",
        description:
          "Learn to design efficient database structures and optimize query performance",
      },
      {
        title: "Data Analysis & Reporting",
        description:
          "Create comprehensive reports and derive actionable insights",
      },
    ],
    prerequisites: "Basic understanding of data",
    certificate: "Yes",
  },
  {
    id: 6,
    title: "Data Visualization Essentials",
    level: "Intermediate",
    duration: "2 Weeks",
    prices: {
      ZM: { amount: 2500, currency: "ZMW" },
      US: { amount: 110, currency: "USD" },
    },
    overview:
      "A comprehensive program designed to help you master data visualization techniques and create compelling visual narratives.",
    corporateBenefits: [
      "Enable teams to communicate insights clearly using effective dashboards and visuals",
      "Improve decision-making across departments with consistent and standardized data visuals",
      "Customize visual reporting workflows to match organizational KPIs and stakeholder needs",
      "Foster a data-driven culture by training non-technical staff to interpret visual reports",
      "Includes team-based exercises using your own datasets for relevant storytelling practice",
    ],
    content: [
      {
        title: "Interactive Dashboard Creation",
        description:
          "Build dynamic and interactive dashboards using modern visualization tools",
      },
      {
        title: "Data Storytelling Techniques",
        description:
          "Learn to craft compelling narratives through data visualization",
      },
      {
        title: "Advanced Chart Types & Tools",
        description:
          "Master various chart types and visualization tools for different scenarios",
      },
    ],
    prerequisites: "Basic understanding of data",
    certificate: "Yes",
  },
  {
    id: 7,
    title: "Data Storytelling Mastery",
    level: "Intermediate",
    duration: "2 Weeks",
    prices: {
      ZM: { amount: 2000, currency: "ZMW" },
      US: { amount: 95, currency: "USD" },
    },
    overview:
      "Learn how to craft persuasive and impactful data stories. This course blends analytical thinking with communication skills to help you influence decisions through compelling narrative and visual storytelling.",
    corporateBenefits: [
      "Enhance data communication skills across departments for more persuasive internal reporting",
      "Train teams to structure presentations that align with executive decision-making workflows",
      "Boost engagement by equipping staff with storytelling techniques that simplify complex data",
      "Tailor insights for technical and non-technical stakeholders through clear, compelling narratives",
      "Includes hands-on exercises using organizational data to refine delivery and message clarity",
    ],
    content: [
      {
        title: "Narrative Structure & Flow",
        description:
          "Understand how to structure your data stories for clarity and emotional engagement",
      },
      {
        title: "Visual Storytelling Techniques",
        description:
          "Use charts, design principles, and visual hierarchy to bring your message to life",
      },
      {
        title: "Audience Engagement Methods",
        description:
          "Adapt your message for technical and non-technical audiences with storytelling best practices",
      },
      {
        title: "Slide Design & Presentation Skills",
        description:
          "Build presentation-ready slides and deliver insights with confidence and clarity",
      },
      {
        title: "Case Studies & Hands-On Practice",
        description:
          "Apply storytelling techniques to real-world datasets and practice your delivery",
      },
    ],
    prerequisites: "Basic data literacy",
    certificate: "Yes",
  },
  {
    id: 8,
    title: "Soft Skills for Data Professionals",
    level: "All Levels",
    duration: "1 Week",
    prices: {
      ZM: { amount: 1000, currency: "ZMW" },
      US: { amount: 50, currency: "USD" },
    },
    overview:
      "Build essential professional skills to thrive in data-driven teams. This course focuses on effective communication, leadership, and stakeholder collaboration tailored for data professionals.",
    corporateBenefits: [
      "Strengthen cross-team communication and collaboration between data teams and business units",
      "Empower staff to present data insights with clarity and impact across varying audiences",
      "Improve team dynamics and leadership potential with practical conflict resolution and management tools",
      "Develop emotionally intelligent professionals who can engage stakeholders effectively",
      "Tailored exercises to simulate real workplace scenarios involving client interaction and team alignment",
    ],
    content: [
      {
        title: "Effective Communication Strategies",
        description:
          "Learn to clearly convey technical findings to both technical and non-technical audiences.",
      },
      {
        title: "Leadership & Team Management",
        description:
          "Develop leadership qualities and manage cross-functional collaboration within data teams.",
      },
      {
        title: "Stakeholder Engagement Skills",
        description:
          "Master the ability to understand stakeholder needs, manage expectations, and build trust.",
      },
      {
        title: "Conflict Resolution & Active Listening",
        description:
          "Use empathy and listening techniques to resolve team conflicts and improve feedback loops.",
      },
      {
        title: "Presentation & Storytelling for Impact",
        description:
          "Deliver impactful presentations that connect data insights with real-world outcomes.",
      },
    ],
    prerequisites: "None",
    certificate: "Yes",
  },
];

let isCorporate = false; // initial mode
let userCountry = "US"; // or fetch dynamically

const btnIndividuals = document.getElementById("btn-individuals");
const btnCorporate = document.getElementById("btn-corporate");

// Format price helper (from your code)
function formatPrice({ amount, currency }) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(amount);
}

function updateCoursesView() {
  document.querySelectorAll(".course-card").forEach((card) => {
    const courseId = parseInt(card.getAttribute("data-course-id"));
    const course = courseData.find((c) => c.id === courseId);

    if (!course) return;

    const priceEl = card.querySelector(".price");
    if (isCorporate) {
      priceEl.textContent = "Price on request";
    } else {
      const priceObj = course.prices[userCountry] || course.prices["US"];
      //priceEl.textContent = formatPrice(priceObj);
      priceEl.textContent = "Price on request";
    }

    const deliveryLabels = card.querySelectorAll(".root-text-check");
    deliveryLabels.forEach((label) => {
      label.textContent = isCorporate ? "In Person" : "Virtual";
    });

    let corporateMsg = card.querySelector(".corporate-message");
    if (isCorporate && !corporateMsg && course.corporateBenefits?.length) {
      const msgDiv = document.createElement("div");
      msgDiv.className =
        "corporate-message mt-4 text-sm text-gray-600 space-y-2";
      msgDiv.innerHTML = `
        <hr class="my-3">
        <ul class="list-disc list-inside space-y-1">
          ${course.corporateBenefits
            .map((benefit) => `<li>${benefit}</li>`)
            .join("")}
        </ul>
      `;
      card.querySelector(".p-6").appendChild(msgDiv);
    } else if (
      (!isCorporate || !course.corporateBenefits?.length) &&
      corporateMsg
    ) {
      corporateMsg.remove();
    }
  });

  if (isCorporate) {
    btnCorporate.classList.add("bg-primary", "text-white");
    btnCorporate.classList.remove("bg-gray-300", "text-black");
    btnIndividuals.classList.remove("bg-primary", "text-white");
    btnIndividuals.classList.add("bg-gray-300", "text-black");
  } else {
    btnIndividuals.classList.add("bg-primary", "text-white");
    btnIndividuals.classList.remove("bg-gray-300", "text-black");
    btnCorporate.classList.remove("bg-primary", "text-white");
    btnCorporate.classList.add("bg-gray-300", "text-black");
  }
}

btnIndividuals.addEventListener("click", () => {
  if (isCorporate) {
    isCorporate = false;
    updateCoursesView();
  }
});

btnCorporate.addEventListener("click", () => {
  if (!isCorporate) {
    isCorporate = true;
    updateCoursesView();
  }
});

updateCoursesView();

async function getUserCountryCode() {
  const cached = localStorage.getItem("userCountryCache");
  if (cached) {
    const { code, expiry } = JSON.parse(cached);
    if (Date.now() < expiry) return code;
  }

  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("Failed to fetch location");
    const data = await res.json();
    const code = data.country_code || "US";
    localStorage.setItem(
      "userCountryCache",
      JSON.stringify({ code, expiry: Date.now() + 86400000 })
    );
    return code;
  } catch {
    return "US";
  }
}

function formatPrice({ amount, currency }) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(amount);
}

async function setPrices() {
  const countryCode = await getUserCountryCode();

  document.querySelectorAll(".price").forEach((priceEl) => {
    const card = priceEl.closest("[data-course-id]");
    const courseId = parseInt(card.getAttribute("data-course-id"));
    const course = courseData.find((c) => c.id === courseId);

    if (course) {
      const priceObj = course.prices[countryCode] || course.prices["US"];
      //priceEl.textContent = formatPrice(priceObj);
      priceEl.textContent = "Price on request";
    } else {
      priceEl.textContent = "Price not available";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".course-content-modal");
  const modalContent = modal.querySelector(".modal-content");

  function openModal(course) {
    modalContent.innerHTML = `
      <div class="bg-white rounded-lg max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900">${course.title}</h3>
            <button class="close-content-modal text-gray-400 hover:text-gray-600">
              <i class="ri-close-line ri-2x"></i>
            </button>
          </div>
          <div class="space-y-6">
            <div>
              <h4 class="font-bold text-gray-900 mb-3">Course Overview</h4>
              <p class="text-gray-600">${course.overview}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-3">What You'll Learn</h4>
              <div class="space-y-3">
                ${course.content
                  .map(
                    (item) => `
                  <div class="flex items-start">
                    <i class="ri-check-line text-primary mt-1 mr-2"></i>
                    <div>
                      <p class="font-medium text-gray-800">${item.title}</p>
                      <p class="text-sm text-gray-600">${item.description}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-3">Course Details</h4>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-sm text-gray-600 mb-1">Duration</p>
                  <p class="font-medium text-gray-800">${course.duration}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-sm text-gray-600 mb-1">Level</p>
                  <p class="font-medium text-gray-800">${course.level}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-sm text-gray-600 mb-1">Prerequisites</p>
                  <p class="font-medium text-gray-800">${
                    course.prerequisites
                  }</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-sm text-gray-600 mb-1">Certificate</p>
                  <p class="font-medium text-gray-800">${course.certificate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden", "opacity-0");
    modal.classList.add("opacity-100");
    document.body.style.overflow = "hidden";

    modal
      .querySelector(".close-content-modal")
      .addEventListener("click", closeModal);
  }

  function closeModal() {
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 300);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.querySelectorAll(".view-content-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-course-id"));
      const selectedCourse = courseData.find((c) => c.id === id);
      if (selectedCourse) openModal(selectedCourse);
    });
  });

  setPrices();
});
