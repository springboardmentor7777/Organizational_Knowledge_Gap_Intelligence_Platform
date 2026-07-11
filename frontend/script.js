const authViews = ["view-login", "view-register", "view-forgot", "view-dashboard"];

function switchView(viewId) {
  authViews.forEach((id) => document.getElementById(id).classList.add("hidden"));
  document.getElementById(viewId).classList.remove("hidden");

  if (viewId === "view-dashboard") {
    document.body.classList.add("in-app");
  } else {
    document.body.classList.remove("in-app");
  }
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-nav]");
  if (trigger) {
    switchView(trigger.dataset.nav);
  }
});



document.getElementById("form-login").addEventListener("submit", (event) => {
  event.preventDefault();
  switchView("view-dashboard");
});

document.getElementById("form-register").addEventListener("submit", (event) => {
  event.preventDefault();
  switchView("view-login");
});

document.getElementById("form-forgot").addEventListener("submit", (event) => {
  event.preventDefault();
  switchView("view-login");
});



const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const topbarTitle = document.getElementById("topbar-title");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((el) => el.classList.remove("is-active"));
    item.classList.add("is-active");

    const targetId = item.dataset.page;
    pages.forEach((page) => page.classList.add("hidden"));
    document.getElementById(targetId).classList.remove("hidden");

    topbarTitle.textContent = item.querySelector("span").textContent;

    document.getElementById("sidebar").classList.remove("is-open");
  });
});



document.getElementById("sidebar-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("is-open");
});



document.addEventListener("DOMContentLoaded", () => {
  switchView("view-login");
});


const editBtn = document.getElementById("edit-profile-btn");

const form = document.getElementById("profile-edit-form");

const saveBtn = document.getElementById("save-profile");

const cancelBtn = document.getElementById("cancel-profile");

const profileName = document.getElementById("profile-name");

const profileRole = document.getElementById("profile-role");

const profileEmail = document.getElementById("profile-email");

editBtn.addEventListener("click", () => {

    form.classList.remove("hidden");

    document.getElementById("edit-name").value =
        profileName.textContent;

    document.getElementById("edit-role").value =
        profileRole.textContent;

    document.getElementById("edit-email").value =
        profileEmail.textContent.replace("✉ ", "");

});

saveBtn.addEventListener("click", () => {

    profileName.textContent =
        document.getElementById("edit-name").value;

    profileRole.textContent =
        document.getElementById("edit-role").value;

    profileEmail.innerHTML =
        '<i class="fa-regular fa-envelope"></i> ' +
        document.getElementById("edit-email").value;

    form.classList.add("hidden");

});

cancelBtn.addEventListener("click", () => {

    form.classList.add("hidden");

});
