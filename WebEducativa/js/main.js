function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

function toggleDefinition(button) {
    const definition = button.nextElementSibling;
    definition.classList.toggle('show');
}