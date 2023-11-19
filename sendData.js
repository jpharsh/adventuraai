document.getElementById('sendDataBtn').addEventListener('click', sendDataToFlask);

function sendDataToFlask() {
    const resultsDiv = document.getElementById('output');
    const dataToSend = {key: resultsDiv.innerHTML };  // Replace with your actual data

    fetch('http://localhost:5000/receive_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error sending data to server:', error);
    });
}
