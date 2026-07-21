document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("predictForm");
    const submitBtn = document.getElementById("submitBtn");
    const resultPanel = document.getElementById("resultPanel");

    if (form && submitBtn) {
        form.addEventListener("submit", () => {
            submitBtn.classList.add("is-loading");
            submitBtn.textContent = "Predicting…";
        });
    }

    if (resultPanel) {
        resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
});
