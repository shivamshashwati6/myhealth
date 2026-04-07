const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory (HTML, CSS, images)
app.use(express.static(path.join(__dirname)));

// Store appointments in memory (for demonstration purposes)
const appointments = [];

// API Endpoint to handle appointment booking
app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, department } = req.body;

    // Basic Validation
    if (!name || !email || !date || !department) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields.'
        });
    }

    // Create new appointment object
    const newAppointment = {
        id: Date.now(),
        name,
        email,
        phone,
        date,
        department,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };

    // Save appointment
    appointments.push(newAppointment);
    
    // Log for server console
    console.log('New Appointment Received:', newAppointment);

    // Send success response
    // Delaying the response slightly to show the "Submitting..." UI state
    setTimeout(() => {
        res.status(201).json({
            success: true,
            message: `Thank you ${name}! Your appointment for ${department} on ${date} is confirmed.`,
            appointment: newAppointment
        });
    }, 1000);
});

// Start the server
app.listen(PORT, () => {
    console.log(`CareWell Clinic server is running on http://localhost:${PORT}`);
});
