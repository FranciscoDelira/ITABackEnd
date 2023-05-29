<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Maintenancerequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator; //Import the validator class


class MaintenanceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $maintenance = Maintenancerequest::all();
        return $maintenance;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function showCombinedData($id)
    {
        $data = $this->getCombinedData($id);
        return response()->json($data);
    }


    function getCombinedData($id) {
        $data = DB::table('maintenancerequests')
        ->join('workorders', 'maintenancerequests.id', '=', 'workorders.maintenancerequest_id')
        ->select(
            'maintenancerequests.id',
            'maintenancerequests.department',
            'maintenancerequests.requestDate',
            'maintenancerequests.requestDescription',
            'maintenancerequests.status',
            'maintenancerequests.evidence1 AS MR_Evidence1',
            'maintenancerequests.evidence2 AS MR_Evidence2',
            'maintenancerequests.evidence3 AS MR_Evidence3',
            'workorders.maintenanceType',
            'workorders.serviceType',
            'workorders.personaldata_id',
            'workorders.maintenanceDate',
            'workorders.jobDescription',
            'workorders.evidence1 AS WO_Evidence1',
            'workorders.evidence2 AS WO_Evidence2',
            'workorders.evidence3 AS WO_Evidence3',
            'workorders.released',
            'workorders.releasedDate',
            'workorders.approved',
            'workorders.approversName',
            'workorders.dateApproved'
        )
        ->where('maintenancerequests.id', $id)
        ->first();

    return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $rules = [
            'department' => 'required|string|min:8|max:255',
            'requestDate' => 'required|date',
            'personaldata_id' => 'required|exists:personaldatas,id',
            'requestDescription' => 'required|string|min:20|max:255',
            'status' => 'required|in:PENDIENTE,POR LIBERAR,LIBERADA',
            'evidence1' => 'file|mimes:jpeg,png',
            'evidence2' => 'file|mimes:jpeg,png',
            'evidence3' => 'file|mimes:jpeg,png'
        ];
    
        $messages = [
            'required' => 'El :attribute es OBLIGATORIO',
            'string' => 'El :attribute debe ser texto',
            'min' => 'El :attribute debe de tener un minimo de 8 caracteres',
            'max' => 'El :attribute debe de tener un máximo de 255 caracteres',
            'date' => 'El :attribute solo acepta fechas',
            'exists' => 'El :attribute no existe en la base de datos',
            'in' => 'El :attribute no pertenece a los estados permitidos',
            'file' => 'El :attribute debe ser una imagen',
            'mimes' => 'El :attribute debe ser uno de los siguientes formatos: jpeg, png.'
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        // Verificar si hay errores de validación
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $maintenance = new Maintenancerequest;
        $maintenance->department = $request->department;
        $maintenance->requestDate = $request->requestDate;
        $maintenance->personaldata_id = $request->personaldata_id;
        $maintenance->requestDescription = $request->requestDescription;
        $maintenance->status = $request->status;
        if ($request->hasFile('evidence1')){
            $maintenance->evidence1 = $request->file('evidence1')->store('MaintenanceEvidence');
        }
        if ($request->hasFile('evidence2')) {
            $maintenance->evidence2 = $request->file('evidence2')->store('MaintenanceEvidence');
        }
    
        if ($request->hasFile('evidence3')) {
            $maintenance->evidence3 = $request->file('evidence3')->store('MaintenanceEvidence');
        }
        $maintenance->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $maintenance=Maintenancerequest::find($id);
        return $maintenance;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rules = [
            'department' => 'required|string|min:20|max:255',
            'requestDate' => 'required|date',
            'personaldata_id' => 'required|exists:personaldatas,id',
            'requestDescription' => 'required|string|min:20|max:255',
            'status' => 'required|in:Pendiente, Por liberar, Liberada',
            'evidence1' => 'nullable|file|mimes:jpeg,png',
            'evidence2' => 'nullable|file|mimes:jpeg,png',
            'evidence3' => 'nullable|file|mimes:jpeg,png'
        ];
    
        $messages = [
            'required' => 'El :attribute es OBLIGATORIO',
            'string' => 'El :attribute debe ser texto',
            'min' => 'El :attribute debe de tener un minimo de 20 caracteres',
            'max' => 'El :attribute debe de tener un máximo de 255 caracteres',
            'date' => 'El :attribute solo acepta fechas',
            'exists' => 'El :attribute no existe en la base de datos',
            'in' => 'El :attribute no pertenece a los estados permitidos',
            'file' => 'El :attribute debe ser una imagen',
            'mimes' => 'El :attribute debe ser uno de los siguientes formatos: jpeg, png, pdf.'
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        // Verificar si hay errores de validación
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $maintenance=Maintenancerequest::findOrFail($id);

        $maintenance->department=$request->department;
        $maintenance->requestDate=$request->requestDate;
        $maintenance->personaldata_id=$request->personaldata_id;
        $maintenance->requestDescription=$request->requestDescription;
        $maintenance->status=$request->status;
        
        $maintenance->save(); 

      
        return $maintenance;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $maintenance = Maintenancerequest::find($id);
        $maintenance->delete();
    }
    
    

    /*public function showEarring()
    {
        $maintenance = Maintenancerequest::join(
            'personaldatas', 'personaldatas.id', '=', 'maintenancerequests.personaldata_id'
            )
        ->where('maintenancerequests.status', 'Pendiente')
        ->get([
            'maintenancerequests.id', 
            'maintenancerequests.requestDate', 
            'personaldatas.area',
            'personaldatas.name', 
            'maintenancerequests.requestDescription', 
            'maintenancerequests.evidence1', 
            'maintenancerequests.evidence2', 
            'maintenancerequests.evidence3', 
            'maintenancerequests.status'
    ]);
        return $maintenance;
    }*/

    public function showMaintenanceRequestActive($personalData)
    {
        $maintenance= \DB::table('maintenancerequests')
        ->where([['personaldata_id', $personalData],['status','PENDIENTE']])
        ->orWhere([['personaldata_id', $personalData],['status','POR LIBERAR']])
        ->get();
        return $maintenance;
    }

    public function showMaintenanceRequestReleased($personalData)
    {
        $maintenance= \DB::table('maintenancerequests')
        ->where([['personaldata_id', $personalData],['status','Liberada']])
        ->get();
        return $maintenance;
    }

    public function showRelease()
    {
        $maintenance = Maintenancerequest::join('workorders', 'workorders.id', '=', 'maintenancerequest_id')
        ->get([
            'workorders.id', 
            'workorders.maintenanceType', 
            'workorders.serviceType', 
            'workorders.personaldata_id', 
            'workorders.maintenanceDate', 
            'workorders.jobDescription', 
            'maintenancerequests.evidence1', 
            'maintenancerequests.evidence2', 
            'maintenancerequests.evidence3',
            'maintenancerequests.status'
        ]);
        return $maintenance;
    }

    public function showActiveRequest()
    {
        $maintenance = Maintenancerequest::join(
            'personaldatas', 'personaldatas.id', '=', 'maintenancerequests.personaldata_id'
            )
        ->where('maintenancerequests.status', 'Pendiente')
        ->get([
            'maintenancerequests.id', 
            'maintenancerequests.requestDate', 
            'personaldatas.name', 
            'maintenancerequests.department', 
            'maintenancerequests.requestDescription', 
            'maintenancerequests.evidence1', 
            'maintenancerequests.evidence2', 
            'maintenancerequests.evidence3', 
            'personaldatas.signature',
            'maintenancerequests.status'
            ]);
        return $maintenance;


    }
}
