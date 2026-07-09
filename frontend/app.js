function switchView(viewId) {
    document.getElementById('view-login').classList.add('hidden');
    document.getElementById('view-forgot').classList.add('hidden');
    document.getElementById('view-register').classList.add('hidden');
    document.getElementById('view-dashboard').classList.add('hidden');
    
    document.getElementById(viewId).classList.remove('hidden');
}

function navigateTo(event, viewId) {
    event.preventDefault();
    switchView(viewId);
}