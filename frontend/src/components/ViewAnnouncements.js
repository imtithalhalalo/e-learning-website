import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


const ViewAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);

    const getAnnouncements = async () => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/v0.1/viewannouncements`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem(`token`)}` } })
                .then(response => {
                    setAnnouncements(response.data.announcements)
                });
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAnnouncements()
    }, [])
    return (
        <main className="container-add">
            <div className="bar">
                <h2>All Announcement </h2>
                <img src={process.env.PUBLIC_URL + "images/announcement.png"} alt=""
                    width="28px"
                    height="28px" />
            </div>
            <br></br>
            <ul >
                {announcements.map(announcement => (

                    <li className="boxes" key={announcement._id}>
                        <div className='box-white'>
                            <div>
                                <h3>
                                    {announcement.title}
                                </h3>
                                <p>
                                    {announcement.desc}
                                </p>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </main>
    )
}

export default ViewAnnouncements