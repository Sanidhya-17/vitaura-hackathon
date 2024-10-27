// appoint.js
document.getElementById('searchButton').addEventListener('click', async () => {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: location })
        });

        if (response.ok) {
            const data = await response.json();
            displayHospitals(data);
        } else {
            console.error('Failed to fetch hospitals:', response.status);
            alert('Could not fetch hospital data. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

function displayHospitals(hospitals) {
    const resultsDiv = document.getElementById('hospitalResults');
    resultsDiv.innerHTML = ''; // Clear previous results

    hospitals.forEach(hospital => {
        const hospitalDiv = document.createElement('div');
        hospitalDiv.classList.add('hospital');

        hospitalDiv.innerHTML = `
            <p><strong>Name:</strong> ${hospital.name}</p>
            <p><strong>Address:</strong> ${hospital.address || 'No address available'}</p>
            <p><strong>Phone:</strong> ${hospital.phone || 'No phone available'}</p>
            <p><strong>Timings:</strong> ${hospital.timings || 'No timings available'}</p>
            <button onclick="selectHospital('${hospital.name}', '${hospital.phone}', '${hospital.timings}')">Select</button>
        `;
        
        resultsDiv.appendChild(hospitalDiv);
    });
}

function selectHospital(name, phone, timings) {
    document.getElementById('hospitalName').value = name;
    document.getElementById('hospitalPhone').value = phone;
    document.getElementById('hospitalTimings').value = timings;
}