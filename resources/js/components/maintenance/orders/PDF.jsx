import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useState } from "react";
import ITAlogo from '/src/Images/ITAlogo.jpg';


const GeneratePDF = () => {

    const { id } = useParams();
    const [recursos, setRecursos] = useState('');
    const [equipos, setEquipos] = useState('');
    const [computo, setComputo] = useState('');
    const [folio, setFolio] = useState(0);
    const [area, setArea] = useState('');
    const [name, setName] = useState('');
    const [signature, setSignature] = useState('');
    const [dateApproved, setDateApproved] = useState('');
    const [description, setDescription] = useState('');
    const [evidence1, setEvidence1] = useState('');
    const [evidence2, setEvidence2] = useState('');
    const [evidence3, setEvidence3] = useState('');



    //Obtener datos correspondientes
    const getData = async () => {
        const response = await axios.get(`/ITABackEnd/public/api/maintenance_show/${id}`, //Obtener solicitud de mantenimiento
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })
        const response2 = await axios.get('/ITABackEnd/public/api/personalData_show/' + response.data.personaldata_id, //Obtener datos de personas de mantenimiento
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-info')}`
                }
            })

        if (response.data.department.toLowerCase().includes('recursos')) {
            setRecursos('x');
            setEquipos('');
            setComputo('');
        } else if (response.data.department.toLowerCase().includes('mantenimiento')) {
            setRecursos('');
            setEquipos('x');
            setComputo('');
        } else {
            setRecursos('');
            setEquipos('');
            setComputo('x');
        }

        setFolio(response.data.id)
        setArea(response2.data.area);
        setName(`${response2.data.name} ${response2.data.lastname}`);
        setSignature(response2.data.signature);
        setDateApproved(response.data.requestDate);
        setDescription(response.data.requestDescription);
        setEvidence1(response.data.evidence1);
        setEvidence2(response.data.evidence2);
        setEvidence3(response.data.evidence3);


        console.log(response.data)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div style={{ margin: '20px' }}>
            <PDFViewer className="PDF" style={{ width: '100%', height: '90vh' }} >
                <Document title={`Solicitud del Mantenimiento ${id}`} >
                    <Page size={'LETTER'} >
                        <View style={{margin:'1.27cm'}}>
                        <View style={{ display: 'table', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '10px' , flexDirection: 'row', height:'75px'}}>
                           
                           <View style={{ border: '1px solid #000', width: '20%' }}>
                               <Image src={ITAlogo} style={{ width: '100px' }}></Image>
                           </View>
                           <View style={{ border: '1px solid #000', width: '60%'}}>
                               <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000',height:'50%'}}>Nombre del Documento: Formato para Solicitud de Mantenimiento Correctivo</Text>
                               <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000',height:'50%'}}>Referencia a la Norma ISO 9001:2015 6.1, 7.1, 7.2, 7.4, 7.5.1, 8.1 </Text>
                           </View>
                           <View style={{ border: '1px solid #000', width: '20%' }}>
                               <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000' ,height:'50%'}}>Código: ITA-AD-PO-001-02</Text>
                               <Text style={{ fontSize: '12px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000',height:'50%' }}>Revisión: 0 </Text>
                           </View>
                

                   </View>


                   <Text style={{  fontSize: '12px',textAlign: 'center', marginTop: '10px' }}>SOLICITUD DE MANTENIMIENTO CORRECTIVO</Text>
                   <View style={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                       <View style={{ display: 'table', width: '50%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '10px' }}>
                           <View style={{ flexDirection: 'row', width: '100%' }}>
                               <View style={{  fontSize: '12px',border: '1px solid #000', width: '90%' }}><Text>Recursos Materiales y Servicios</Text></View>
                               <View style={{  fontSize: '12px',border: '1px solid #000', width: '10%' }}><Text>{recursos}</Text></View>
                           </View>
                           <View style={{ flexDirection: 'row', width: '100%' }}>
                               <View style={{  fontSize: '12px',border: '1px solid #000', width: '90%' }}><Text>Mantenimiento de Equipo</Text></View>
                               <View style={{  fontSize: '12px',border: '1px solid #000', width: '10%' }}><Text>{equipos}</Text></View>
                           </View>
                           <View style={{ flexDirection: 'row', width: '100%' }}>
                               <View style={{ fontSize: '12px', border: '1px solid #000', width: '90%' }}><Text>Centro de Cómputo</Text></View>
                               <View style={{ fontSize: '12px', border: '1px solid #000', width: '10%' }}><Text>{computo}</Text></View>
                           </View>
                       </View>
                   </View>

                   <Text style={{  fontSize: '12px',textAlign: 'right', margin: '10px' }}>Folio:<Text style={{ textDecoration: 'underline' }}>{folio}</Text></Text>
                   <Text style={{  fontSize: '12px',width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '10px', padding: '10px' }}>
                       Área Solicitante: {area}
                   </Text>

                   <View style={{ width: 'auto', padding: '10px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '10px' }}>
                       <Text style={{ fontSize: '12px'}}>
                           Nombre y Firma del Solicitante: {name}
                       </Text>
                       <Image src={`/ITABackEnd/storage/app/${signature}`} style={{ width: '40%', marginTop: '10px' }}></Image>
                   </View>

                   <Text style={{  fontSize: '12px',width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', marginLeft: '10px', padding: '10px', marginRight: '10px' }}>
                       Fecha de Elaboración: {dateApproved}
                   </Text>

                   <View style={{ width: 'auto', padding: '10px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', margin: '10px' }}>
                       <Text style={{ fontSize: '12px'}}>
                           Descripción del servicio solicitado o falla a reparar: {description}
                       </Text>
                       <View style={{ width: '100%', border: '1px solid #000', flexDirection: 'row', marginTop: '10px' }}>
                           <Image src={`/ITABackEnd/storage/app/${evidence1}`} ></Image>
                           <Image src={`/ITABackEnd/storage/app/${evidence2}`} ></Image>
                           <Image src={`/ITABackEnd/storage/app/${evidence3}`} ></Image>
                       </View>

                   </View>
                        </View>
                        

                    </Page>
                </Document>
            </PDFViewer>
        </div>


    )
};

export default GeneratePDF;