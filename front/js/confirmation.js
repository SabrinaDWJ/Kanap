function order() {
    const idOrder = document.getElementById("orderId");
    idOrder.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}
order();

