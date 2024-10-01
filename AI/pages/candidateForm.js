import { useState } from 'react';
import axios from 'axios';

export default function CandidateForm() {
    const [formData, setFormData] = useState({
        name: '',
        linkedin: '',
        technologies: '',
        expertise: '',
        experience: '',
        phone: '',
        email: '',
        cv: null
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, cv: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            await axios.post('/api/candidates', data);
            alert('Form submitted successfully');
        } catch (error) {
            setError('Error submitting form. Please try again.');
            console.error('Error submitting form', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="url" name="linkedin" placeholder="LinkedIn Profile URL" onChange={handleChange} required />
            <input type="text" name="technologies" placeholder="Technologies" onChange={handleChange} required />
            <input type="text" name="expertise" placeholder="Expertise Level" onChange={handleChange} required />
            <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="file" name="cv" onChange={handleFileChange} required />
            <button type="submit">Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}