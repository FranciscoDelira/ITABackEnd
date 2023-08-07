import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useState } from "react";
import ITAlogo from '/src/Images/ITAlogo.jpg';


const GenerateOrderPDF = () => {

    const { id } = useParams();
    const [controlNumber, setControlNumber] = useState(id);
    const [maintenanceType, setMaintenanceType] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [signature, setSignature] = useState('');
    const [verifyBy, setVerifyBy] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [evidence1, setEvidence1] = useState('');
    const [evidence2, setEvidence2] = useState('');
    const [evidence3, setEvidence3] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [approvedDate, setApprovedDate] = useState('');





    //Obtener datos correspondientes
    const getData = async () => {
        const response = await axios.get(`/ITABackEnd/public/api/workorder_show/${id}`, //Obtener datos de la orden 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })
        const response2 = await axios.get('/ITABackEnd/public/api/personalData_show/' + response.data.personaldata_id, //Obtener datos personales
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })
            const response3 = await axios.get(`/ITABackEnd/public/api/maintenance_show/${response.data.maintenancerequest_id}`, //Obtener solicitud de mantenimiento
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })
            const response4 = await axios.get('/ITABackEnd/public/api/personalData_show/' + response3.data.personaldata_id, //Obtener datos personales
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        

        
        setServiceType(response.data.serviceType);
        setAssignedTo(`${response2.data.name} ${response2.data.lastname}`);
        setMaintenanceDate(response.data.maintenanceDate);
        setJobDescription(response.data.jobDescription);
        setEvidence1(response.data.evidence1);
        setEvidence2(response.data.evidence2);
        setEvidence3(response.data.evidence3);
        setVerifyBy(`${response4.data.name} ${response4.data.lastname}`);
        setSignature(response4.data.signature); 
        setApprovedBy(response.data.approversName)
        setReleaseDate(response.data.releasedDate);
        setApprovedDate(response.data.dateApproved);
        
        if (response.data.maintenanceType === 'Interno') {
            setMaintenanceType(true);

        }else if (response.data.maintenanceType === 'Externo'){
            setMaintenanceType(false);
        }


    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div style={{ margin: '20px' }}>
            <PDFViewer className="PDF" style={{ width: '100%', height: '90vh' }} >
                <Document title={`Orden de Trabajo ${id}`} >
                    <Page size={'LETTER'} >
                        <View style={{ margin: '1.27cm' }}>
                            <View style={{ display: 'table', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '10px', flexDirection: 'row', height: '75px' }}>

                                <View style={{ border: '1px solid #000', width: '20%' }}>
                                    <Image src={ITAlogo} style={{ width: '100px' }}></Image>
                                </View>
                                <View style={{ border: '1px solid #000', width: '60%' }}>
                                    <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', height: '50%' }}>Nombre del Documento: Formato para Orden de Trabajo de Mantenimiento</Text>
                                    <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', height: '50%' }}>Referencia a la Norma ISO 9001:2015 6.1, 7.1, 7.2, 7.4, 7.5.1, 8.1 </Text>
                                </View>
                                <View style={{ border: '1px solid #000', width: '20%' }}>
                                    <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', height: '50%' }}>Código: ITA-AD-PO-001-04</Text>
                                    <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', height: '50%' }}>Revisión: 0 </Text>
                                </View>


                            </View>


                            <Text style={{ fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>ORDEN DE TRABAJO DE MANTENIMIENTO</Text>



                            <Text style={{ fontSize: '12px', textAlign: 'right', margin: '10px' }}>Número de Control:<Text style={{ textDecoration: 'underline' }}>{controlNumber}</Text></Text>
                            <View style={{ display: 'table', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: '10px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '10px 10px 0px 10px' }}>
                                <Text style={{ fontSize: '12px' }}>Mantenimiento</Text>
                                {(maintenanceType === true) ?  <><Text style={{ fontSize: '12px', textDecoration:'underline' }}>Interno</Text> <Text style={{ fontSize: '12px' }}>Externo</Text></> : <><Text style={{ fontSize: '12px' }}>Interno</Text> <Text style={{ fontSize: '12px', textDecoration:'underline' }}>Externo</Text></>}
                                
                               
                            </View>


                            <Text style={{ fontSize: '12px', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', marginLeft: '10px', padding: '10px', marginRight: '10px' }}>
                                Tipo de Servicio: {serviceType}
                            </Text>
                            <Text style={{ fontSize: '12px', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', marginLeft: '10px', padding: '10px', marginRight: '10px' }}>
                                Asignado a: {assignedTo}
                            </Text>
                            <Text style={{ fontSize: '12px', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', padding: '10px', margin: '30px 10px 0px 10px' }}>
                                Fecha de realización: {maintenanceDate}
                            </Text>

                            <View style={{ width: 'auto', padding: '10px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '0px 10px 0px 10px' }}>
                                <Text style={{ fontSize: '12px' }}>
                                    Trabajo Relizado: {jobDescription}
                                </Text>
                                <View style={{ width: '100%', border: '1px solid #000', flexDirection: 'row', marginTop: '10px' }}>
                                    <Image src={`/ITABackEnd/storage/app/${evidence1}`} ></Image>
                                    <Image src={`/ITABackEnd/storage/app/${evidence2}`} ></Image>
                                    <Image src={`/ITABackEnd/storage/app/${evidence3}`} ></Image>
                                </View>

                            </View>
                            <View style={{ border: '1px solid #000', flexDirection: 'row', margin: '0px 10px 0px 10px' }}>
                                <Text style={{ fontSize: '12px', border: '1px solid #000', width: '50%', padding: '10px' }}>Verificado y Liberado por: {verifyBy}</Text>
                                <View style={{ flexDirection: 'row', width: '50%' }}>
                                    <Text style={{ fontSize: '12px', padding: '10px' }}>Fecha y Firma: {releaseDate}</Text>
                                    <Image style={{ width: '100px', padding: '10px' }} src={`/ITABackEnd/storage/app/${signature}`}></Image>
                                </View>
                            </View>
                            <View style={{ border: '1px solid #000', flexDirection: 'row', margin: '0px 10px 0px 10px' }}>
                                <Text style={{ fontSize: '12px', border: '1px solid #000', width: '50%', padding: '10px' }}>Aprobado por: {approvedBy}</Text>
                                <View style={{ flexDirection: 'row', width: '50%' }}>
                                    <Text style={{ fontSize: '12px', padding: '10px' }}>Fecha y Firma: {approvedDate}</Text>
                                    <Image style={{ width: '100px', padding: '10px' }} src={`/ITABackEnd/storage/app/${evidence3}`}></Image>
                                </View>

                            </View>
                        </View>


                    </Page>
                </Document>
            </PDFViewer>
        </div>


    )
};

export default GenerateOrderPDF;