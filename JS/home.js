const sidebar = document.querySelector(".sidebar");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");

const toggleLock = () => {
    sidebar.classList.toggle("locked");
    if (!sidebar.classList.contains("locked")) {
        sidebarLockBtn.classList.add("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
        sidebar.classList.add("close");
    } else {
        sidebarLockBtn.classList.remove("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
        sidebar.classList.remove("close");
    }
};

const hidesidebar = () => {
    if (!sidebar.classList.contains("locked")) {
        sidebar.classList.add("close");
    }
};

const showsidebar = () => {
    if (!sidebar.classList.contains("locked")) {
        sidebar.classList.remove("close");
    }
};

if (window.innerWidth < 800) {
    sidebar.classList.add("close");
    sidebar.classList.remove("locked");
    sidebar.classList.remove("hoverable");
}

sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hidesidebar);
sidebar.addEventListener("mouseenter", showsidebar);
sidebarCloseBtn.addEventListener("click", toggleLock);

