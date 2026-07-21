document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("predictForm");
    const submitBtn = document.getElementById("submitBtn");
    const resultBox = document.getElementById("resultBox");

    function checkScore(el) {
        const v = Number(el.value);
        const ok = el.value === "" || (v >= 0 && v <= 100);
        el.classList.toggle("err", !ok && el.value !== "");
        return ok;
    }

    ["reading_score", "writing_score"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", () => checkScore(el));
    });

    if (form && submitBtn) {
        form.addEventListener("submit", (e) => {
            let valid = true;
            ["reading_score", "writing_score"].forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const v = Number(el.value);
                const ok = el.value !== "" && v >= 0 && v <= 100;
                el.classList.toggle("err", !ok);
                if (!ok) valid = false;
            });
            if (!valid) {
                e.preventDefault();
                return;
            }
            submitBtn.textContent = "Predicting…";
            submitBtn.classList.add("loading");
        });
    }

    if (resultBox) {
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
});
