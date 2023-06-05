import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SearchFlight = (props) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flightDetail, setFlightDetail] = useState([]);

    const handleSearch = async () => {
        const id = toast.loading("Finding flights...", {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: "Toast1"
        });

        try {
            const response = await axios.get(`${props.BASE_URL}/flight-prices`, {
                params: {
                    origin,
                    destination,
                },
            });

            if (response.status === 200) {
                setFlightDetail(response.data);
                toast.update(id, { render: "Flight found", type: "success", autoClose: 500, isLoading: false });
            } else {
                console.log(response.data.error);
                toast.update(id, { render: response.data.error || "Cannot get flight", type: "error", autoClose: 500, isLoading: false });
            }
        } catch (error) {
            console.log(error.response.data.error);
            toast.update(id, { render: error.response.data.error || "Internal Error Occurred", type: "error", autoClose: 500, isLoading: false });
        }
    };

    return (
        <>
            <ToastContainer transition={Slide} />
            <div className="d-flex mx-auto flex-column w-75">
                <h1 className='mb-2 text-center'>Flight Details</h1>
                <div className="mb-3">
                    <label htmlFor="originInput" className="form-label">Origin</label>
                    <input
                        type="text"
                        className="form-control"
                        id="originInput"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="destinationInput" className="form-label">Destination</label>
                    <input
                        type="text"
                        className="form-control"
                        id="destinationInput"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>

                <div className='mt-4 text-center'>
                    <h3>Flight Prices:</h3>
                    {flightDetail.length > 0 ? (
                        <ul className="list-group">
                            {flightDetail.map((flight) => (
                                <li key={flight._id} className="list-group-item">
                                    {flight.origin} to {flight.destination}: ${flight.price}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No flight available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchFlight;
