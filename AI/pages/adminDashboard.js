import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('/api/candidates');
                setCandidates(response.data);
            } catch (error) {
                setError('Error fetching candidates. Please try again.');
                console.error('Error fetching candidates', error);
            }
        };

        fetchCandidates();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>LinkedIn</th>
                        <th>Technologies</th>
                        <th>Experience</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate._id}>
                            <td>{candidate.name}</td>
                            <td><a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></td>
                            <td>{candidate.technologies}</td>
                            <td>{candidate.experience}</td>
                            <td>{candidate.phone}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.isLegit ? 'Legit' : 'Flagged'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}