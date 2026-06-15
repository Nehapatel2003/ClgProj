// =========================
// BOOTSTRAP FORM VALIDATION
// =========================

(() => {
    'use strict';

    // Select all forms with validation
    const forms =
    document.querySelectorAll(
        '.needs-validation'
    );

    // Prevent submission if invalid
    Array.from(forms).forEach(form => {

        form.addEventListener(
            'submit',
            event => {

                if (!form.checkValidity()) {

                    event.preventDefault();
                    event.stopPropagation();

                }

                form.classList.add(
                    'was-validated'
                );

            },
            false
        );

    });

})();