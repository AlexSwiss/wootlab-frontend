import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link, generatePath, useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from "axios";
import userContext from '../../context/userContext';
import { Table, Button } from 'react-bootstrap';



function Home () {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/car/all`)
            .then((response) => {
                setAPIData(response.data.data);
            })
            console.log(setAPIData)
    }, []);                
    return (
        <div>
            <Table singleLine>
             <thead>
                <tr>
                <th>#</th>
                <th>Model</th>
                <th>Plate Number</th>
                <th>Car ID</th>
                <th>Maximum KM</th>
                <th>Maximum Load</th>
                <th>Fuel Type</th>
                </tr>
            </thead>

                <tbody>
                {APIData.map((data) => {
                    return (

                        <tr>
                        <td>1</td>
                        <td>
                        <Link to={`/car/${data._id}`}>
                            { data.car_model }
                         </Link>
                        </td> 
                        <td>{data.license_plate}</td>
                        <td>{data._id}</td>
                        <td>{data.car_year}</td>
                        <td>{data.current_km}</td>
                        <td>{data.max_load_km}</td>
                        <td>{data.fuel_type}</td>
                      </tr>
                       )})}

                </tbody>
            </Table>
        </div>
    );
}
 
export default Home;