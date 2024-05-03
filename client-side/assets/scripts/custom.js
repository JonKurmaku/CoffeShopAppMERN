
        // ---- START - ALL PAGES ----
        setInterval(() => {
            $("#currentYear").html(new Date().toLocaleTimeString());
        }, 1000)
        // ---- END - ALL PAGES ----

        // START - ORDER PAGE
        function validateAndSubmit(event) {
            event.preventDefault();

            var isValidated = true;

            // Reset all errors
            $("#fullNameSpn").html("");
            $("#emailSpn").html("");
            $("#descriptionSpn").html("");

            const fullName = $("#fullName").val();
            if (fullName.length < 3) {
                $("#fullNameSpn").html("Full name must be min 3 chars");
                isValidated = false;
            }

            const email = $("#email").val();
            if (!email.endsWith("@epoka.edu.al")) {
                $("#emailSpn").html("This is not a valid Epoka email");
                isValidated = false;
            }

            const description = $("#description").val();
            if (description.length < 16) {
                $("#descriptionSpn").html("Description must be min 16 chars");
                isValidated = false;
            }

            // Validate input values
            if (!isValidated) {
                return;
            }

            // Call method
            handleSubmit(fullName, email, description);
        }

        function handleSubmit(_fullName, _email, _description) {
            // Create Object
            var newOrder = {
                fullName: _fullName,
                email: _email,
                description: _description
            }

            console.log('newOrder Object = ', newOrder);

            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            };

            fetch('http://localhost:3000/orders', settings)
                .then(response => response.json())
                .then(data => {
                    alert('Order added to the server');
                    // Handle the response data as needed
                })
                .catch(error => console.error('Error:', error));
        }

        $(document).ready(function () {
            $("#submitBtn").click(validateAndSubmit)
        });
        // END - ADD EVENT LISTENER
 