let delOrderID;
let editOrderID;
const editModalSelector = "#editModal #orderForm #submitBtn";

var orders = [];

console.log('Orders (before request) = ', orders);

const getSettings = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

fetch('http://localhost:3000/orders', getSettings)
    .then(response => response.json())
    .then(data => {
        orders=data;
        console.log('Orders (after request response) = ', orders);
        populateTable();
    }).catch(error => console.log('Error:', error));

const ordersTableBody = $("#ordersTbl tbody");
ordersTableBody.empty();

function populateTable() {
    $.each(orders, function (index, order) {
        console.log(`Index = ${index}. Order = ${order}`);
        const newRowHtml = `<tr>
            <td>${order.orders_name}</td>
            <td>${order.orders_email}</td>
            <td onclick="detectTextLanguage('${order.orders_description}')">${order.orders_description}</td>
            <td>
                <button id="editBtn" data-order-id="${order.orders_id}">Edit</button>
                <button id="removeBtn" data-order-id="${order.orders_id}">Remove</button>
            </td>
        </tr>`;
        ordersTableBody.append(newRowHtml);
    });
}

$(ordersTableBody).on('click', "#removeBtn", function () {
    const orderId = $(this).data('order-id');
    delOrderID = orderId;
    $("#removeModal").show();
});

$("#cancelRemoveBtn").click(function () {
    $("#removeModal").hide();
});

$("#confirmBtn").click(function () {
    const deleteSettings = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
       // ,
       // body: JSON.stringify({ id: delOrderID }),
    };

    fetch(`http://localhost:3000/orders/${delOrderID}`, deleteSettings)
        .then(response => response.json())
        .then(data => {
            console.log(data + " Deletion complete");
            window.location.reload();
        })
        .catch(error => console.error('Error:', error));
});


$(ordersTableBody).on('click', "#editBtn", function () {
    const orderId = $(this).data('order-id');
    editOrderID = orderId;
    $("#editModal").show();
});

$("#closeEditModalSpn").click(function () {
    $("#editModal").hide();
});

$(editModalSelector).on('click', validateAndSubmit);

function validateAndSubmit(event) {
    event.preventDefault();
    var isValidated = true;

    $(`${editModalSelector} #fullNameSpn`).text("");
    $(`${editModalSelector} #emailSpn`).text("");
    $(`${editModalSelector} #descriptionSpn`).text("");

    const fullName = $("#fullName").val();
    if(fullName.length < 3){
        $("#fullNameSpn").html("Full name must be min 3 chars");
        isValidated = false;
    }

    const email = $("#email").val();
    if(email.endsWith("@epoka.edu.al")){
    } else {
        $("#emailSpn").html("This is not a valid Epoka email");
        isValidated = false;
    }

    const description = $("#description").val();
    if(description.length < 16){
        $("#descriptionSpn").html("Description must be min 16 chars");
        isValidated = false;
    }
    if (isValidated == false) {
        return;
    }

    handleSubmit(editOrderID, fullName, email, description);
}

function handleSubmit(editOrderID, _fullName, _email, _description) {
    var newOrder = {
        id: editOrderID,
        fullName: _fullName,
        email: _email,
        description: _description,
    };

    console.log('newOrder Object = ', newOrder);

    const editSettings = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
    };

    fetch(`http://localhost:3000/orders/${editOrderID}`, editSettings)
        .then(response => response.json())
        .then(data => {
            console.log(data + " Update complete");
            window.location.reload();
        })
        .catch(error => console.error('Error:', error));
}
