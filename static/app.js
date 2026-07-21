document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("predictForm");
    const submitBtn = document.getElementById("submitBtn");
    const resultPanel = document.getElementById("resultPanel");

    if (form && submitBtn) {
        form.addEventListener("submit", (event) => {
            const scoreFields = ["reading_score", "writing_score"];
            let valid = true;

            scoreFields.forEach((id) => {
                const input = document.getElementById(id);
                if (!input) return;

                const value = Number(input.value);
                const inRange = input.value !== "" && value >= 0 && value <= 100;

                input.classList.toggle("field-error", !inRange);
                valid = valid && inRange;
            });

            if (!valid) {
                event.preventDefault();
                submitBtn.classList.remove("is-loading");
                submitBtn.textContent = "Predict maths score";
                return;
            }

            submitBtn.classList.add("is-loading");
            submitBtn.textContent = "Predicting…";
        });

        ["reading_score", "writing_score"].forEach((id) => {
            const input = document.getElementById(id);
            if (!input) return;

            input.addEventListener("input", () => {
                const value = Number(input.value);
                const inRange = input.value === "" || (value >= 0 && value <= 100);
                input.classList.toggle("field-error", !inRange);
            });
        });
    }

    if (resultPanel) {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        resultPanel.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "nearest",
        });
    }
});
