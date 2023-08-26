import React from "react";
import { Container} from "react-bootstrap";
import axios from "axios";

import { BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { useState } from "react";
import { useEffect } from "react";


function Stadistic() {

    const [active, setActive] = useState();
    const [free, setFree] = useState();
    const [workApproved, setWorkApproved] = useState();
    const [workFree, setWorkFree] = useState();
    const [WorkPending, setWorkPending] = useState();

    useEffect(()=>{
        getData();
    },[]);


    const getData = async()=>{
        const response = await axios.get('/ITABackEnd/public/api/AllActive',
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-info')}`
            }
        });

        const response2 = await axios.get('/ITABackEnd/public/api/AllFree',
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-info')}`
            }
        });

        const response3 = await axios.get('/ITABackEnd/public/api/WorkApproved',
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-info')}`
            }
        });

        const response4 = await axios.get('/ITABackEnd/public/api/WorkFree',
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-info')}`
            }
        });
        const response5 = await axios.get('/ITABackEnd/public/api/WorkPending',
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-info')}`
            }
        });

        setActive(response.data.length)
        setFree(response2.data.length)
        setWorkPending(response5.data.length)
        setWorkFree(response4.data.length)
        setWorkApproved(response3.data.length)

    }

    const data = [
        { Estado: 'Activas', Cantidad:active},
        { Estado: 'Liberadas', Cantidad: free},
    ]

    const data2 =[
        { Estado: 'Pendientes', Cantidad:WorkPending},
        { Estado: 'Liberadas', Cantidad: workFree},
        { Estado:'Aprobadas', Cantidad: workApproved}
    ]
    return (
    
            <Container style={{marginTop:'20px'}}>
                <h1 style={{textAlign:'center'}}>Solicitudes de Mantenimiento</h1>
                <br/>
                <ResponsiveContainer width='50%' aspect={1}>
                    <BarChart data={data} width={500} height={300}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 1 2" />
                        <XAxis dataKey='Estado' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='Cantidad' fill="#6b48ff" />
                       
                    </BarChart>
                </ResponsiveContainer>
                <h1 style={{textAlign:'center', marginTop:'20px'}}>Órdenes de Mantenimiento</h1>
                <br/>
                <ResponsiveContainer width='50%' aspect={1}>
                    <BarChart data={data2} width={500} height={300}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 1 2" />
                        <XAxis dataKey='Estado' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='Cantidad' fill="#6b48ff" />
                       
                    </BarChart>
                </ResponsiveContainer>
            </Container>


        

    )
}

export default Stadistic;