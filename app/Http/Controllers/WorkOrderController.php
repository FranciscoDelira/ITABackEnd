<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkOrder;
use App\Models\Maintenancerequests;
use App\Models\Personaldata;
use Illuminate\Support\Facades\Validator; //Import the validator class


class WorkOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $workorder = WorkOrder::all();
        return $workorder;
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'maintenanceType' => 'required|in:Interno,Externo',
            'serviceType' => 'in:Eléctrico,Plomería,Herrería,Pintura,Obra Civil,Otro',
            'personaldata_id' => 'required|exists:personaldatas,id',
            'maintenanceDate' => 'nullable|date',
            'jobDescription' => 'nullable|string|min:3|max:255',
            'evidence1' => 'nullable|file|mimes:jpeg,png',
            'evidence2' => 'nullable|file|mimes:jpeg,png',
            'evidence3' => 'nullable|file|mimes:jpeg,png',
            'maintenancerequest_id' => 'required|exists:maintenancerequests,id',
            'released' => 'nullable|in:0,1',
            'releasedDate' => 'nullable|date',
            'approved' => 'nullable|in:0,1',
            'approversName' => 'nullable|string|max:255|min:3',
            'dateApproved' => 'nullable|date'
        ];

        $messages = [
            'required' => 'El :attribute es OBLIGATORIO.',
            'in' => 'El :attribute no pertenece a las categorías permitidas',
            'string' => 'El :attribute debe ser una cadena de caracteres.',
            'min' => 'El :attribute debe de tener más de :min caracteres',
            'date' => 'El :attribute debe ser una fecha válida.',
            'file' => 'La :attribute debe ser una imagen.',
            'mimes' => 'El :attribute debe ser de tipo jpeg, png.',
            'max' => 'El archivo :attribute no debe exceder los :max caracteres',
            'exists' => 'El folio de la solictud no existe en el Sistema'
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $workorder = new WorkOrder;
        $workorder->maintenanceType=$request->maintenanceType;
        $workorder->serviceType=$request->serviceType;
        $workorder->personaldata_id=$request->personaldata_id;
        $workorder->maintenanceDate=$request->maintenanceDate;
        $workorder->jobDescription=$request->jobDescription;
        if(!empty($request->evidence1)){
            $workorder->evidence1=$request->evidence1->store('WorkEvidence');
        }else{
            $workorder->evidence1=null;
        }

        if(!empty($request->evidence2)){
            $workorder->evidence2=$request->evidence2->store('WorkEvidence');
        }else{
            $workorder->evidence2=null;
        }
       
        if(!empty($request->evidence3)){
            $workorder->evidence3=$request->evidence3->store('WorkEvidence');
        }else{
            $workorder->evidence3=null;
        }
        $workorder->maintenancerequest_id=$request->maintenancerequest_id;
        $workorder->released=$request->released;
        $workorder->releasedDate=$request->releasedDate;
        $workorder->approved=$request->approved;
        $workorder->approversName=$request->approversName;
        $workorder->dateApproved=$request->dateApproved;
        $workorder->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $workorder=WorkOrder::find($id);
        return $workorder;
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
            'maintenanceType' => 'required|in:Interno,Externo',
            'serviceType' => 'in:Eléctrico,Plomería,Herrería,Pintura,Obra Civil,Otro',
            'personaldata_id' => 'required|exists:personaldatas,id',
            'maintenanceDate' => 'nullable|date',
            'jobDescription' => 'nullable|string|min:3|max:255',
            'evidence1' => 'nullable|file|mimes:jpeg,png',
            'evidence2' => 'nullable|file|mimes:jpeg,png',
            'evidence3' => 'nullable|file|mimes:jpeg,png',
            'maintenancerequest_id' => 'required|exists:maintenancerequests,id',
            'released' => 'nullable|in:0,1',
            'releasedDate' => 'nullable|date',
            'approved' => 'nullable|in:0,1',
            'approversName' => 'nullable|string|max:255|min:3',
            'dateApproved' => 'nullable|date'
        ];

        $messages = [
            'required' => 'El :attribute es OBLIGATORIO.',
            'in' => 'El :attribute no pertenece a las categorías permitidas',
            'string' => 'El :attribute debe ser una cadena de caracteres.',
            'min' => 'El :attribute debe de tener más de :min caracteres',
            'date' => 'El :attribute debe ser una fecha válida.',
            'file' => 'La :attribute debe ser una imagen.',
            'mimes' => 'El :attribute debe ser de tipo jpeg, png.',
            'max' => 'El archivo :attribute no debe exceder los :max caracteres',
            'exists' => 'El folio de la solictud no existe en el Sistema'
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        
        $workorder=WorkOrder::findOrFail($id);
        $workorder->maintenanceType=$workorder->maintenanceType;
        $workorder->serviceType=$request->serviceType;
        $workorder->personaldata_id=$request->personaldata_id;
        $workorder->maintenanceDate=$request->maintenanceDate;
        $workorder->jobDescription=$request->jobDescription;
        if(!empty($request->evidence1)){
            $workorder->evidence1=$request->evidence1->store('WorkEvidence');
        }else{
            $workorder->evidence1=null;
        }

        if(!empty($request->evidence2)){
            $workorder->evidence2=$request->evidence2->store('WorkEvidence');
        }else{
            $workorder->evidence2=null;
        }
       
        if(!empty($request->evidence3)){
            $workorder->evidence3=$request->evidence3->store('WorkEvidence');
        }else{
            $workorder->evidence3=null;
        }
        $workorder->maintenancerequest_id=$workorder->maintenancerequest_id;
        $workorder->released=$request->released;
        $workorder->releasedDate=$request->releasedDate;
        $workorder->approved=$request->approved;
        $workorder->approversName=$request->approversName;
        $workorder->dateApproved=$request->dateApproved;
        $workorder->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $workorder = WorkOrder::find($id);
        $workorder->delete();
    }


    public function showRelease()
    {
        
    $workorder = WorkOrder::join('maintenancerequests', 'maintenancerequests.id', '=', 'workorders.maintenancerequest_id')
    ->where('maintenancerequests.status', 'Liberada')
    ->update(['released' => 1]);    

    $workorders = WorkOrder::join('maintenancerequests', 'maintenancerequests.id', '=', 'workorders.maintenancerequest_id')
    ->join('personaldatas', 'personaldatas.id', '=', 'workorders.personaldata_id')
    ->where('approved', '0')
    ->where('released', '1')
    ->get([
        'workorders.id',
        'workorders.maintenanceType',
        'workorders.serviceType',
        'workorders.personaldata_id',
        'personaldatas.name',
        'workorders.maintenanceDate',
        'workorders.jobDescription',
        'workorders.evidence1',
        'workorders.evidence2',
        'workorders.evidence3',
        'maintenancerequests.status'
    ]);

    return $workorders;
    }

    public function approvedOrder(Request $request, $id){

        $rules = [
            'approved' => 'nullable|in:0,1',
            'approversName' => 'nullable|string|max:255|min:3',
            'dateApproved' => 'nullable|date'
        ];

        $messages = [
            
            'in' => 'El :attribute no pertenece a las categorías permitidas',
            'string' => 'El :attribute debe ser una cadena de caracteres.',
            'date' => 'El :attribute debe ser una fecha válida.',
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        
        $workorder = WorkOrder::find($id);
    
        $workorder->approved=1;
        $workorder->approversName=$request->approversName;
        $workorder->dateApproved=$request->dateApproved;
        $workorder->save();
    }

    public function showApproved(){

        $workorders = WorkOrder::join('maintenancerequests', 'maintenancerequests.id', '=', 'workorders.maintenancerequest_id')
    ->join('personaldatas', 'personaldatas.id', '=', 'maintenancerequests.personaldata_id')
    
    ->where('approved', '1')
    ->get([
        'workorders.id',
        'maintenancerequests.requestDate',
        'personaldatas.area',
        'maintenancerequests.personaldata_id',
        'personaldatas.name',
        'workorders.maintenanceDate',
        'workorders.approversName',
        'workorders.evidence1',
        'workorders.evidence2',
        'workorders.evidence3',
    ]);

    return $workorders;
    
    }

    public function showRequestHistory()
    {
        $workorder = WorkOrder::join('maintenancerequests', 'maintenancerequests.id', '=', 'workorders.maintenancerequest_id')
        ->join('personaldatas', 'personaldatas.id', '=', 'maintenancerequests.personaldata_id')
        ->where('maintenancerequests.status', 'Liberada')
        ->get([
            'maintenancerequests.id', 
            'maintenancerequests.requestDate', 
            'personaldatas.name', 
            'maintenancerequests.department', 
            'maintenancerequests.requestDescription', 
            'workorders.releasedDate',
            'workorders.dateApproved',
            'workorders.evidence1', 
            'workorders.evidence2', 
            'workorders.evidence3', 
            'maintenancerequests.status'
            ]);
        return $workorder;
    }

    public function showEarring()
    {
        $workorder = WorkOrder::
        join('maintenancerequests', 'maintenancerequests.id', '=', 'workorders.maintenancerequest_id')
        ->join('personaldatas', 'personaldatas.id', '=', 'maintenancerequests.personaldata_id')
        ->where('maintenancerequests.status', 'Pendiente')
        ->where('workorders.released', '0')
        ->where('workorders.approved', '0')
        ->get([
            'workorders.id', 
            'maintenancerequests.requestDate', 
            'personaldatas.area',
            'personaldatas.name', 
            'maintenancerequests.requestDescription', 
            'maintenancerequests.evidence1', 
            'maintenancerequests.evidence2', 
            'maintenancerequests.evidence3', 
            'maintenancerequests.status'
    ]);
        return $workorder;
    }

    public function newOrder(Request $request){

        $rules = [
            'maintenanceType' => 'required|in:Interno',
            'serviceType' => 'in:Eléctrico,Plomería,Herrería,Pintura,Obra Civil,Otro',
            'personaldata_id' => 'required|exists:personaldatas,id',
            'maintenanceDate' => 'nullable|date',
            'maintenancerequest_id' => 'required|exists:maintenancerequests,id',
        ];

        $messages = [
            'required' => 'El :attribute es OBLIGATORIO.',
            'in' => 'El :attribute no pertenece a las categorías permitidas',
            'string' => 'El :attribute debe ser una cadena de caracteres.',
            'min' => 'El :attribute debe de tener más de :min caracteres',
            'date' => 'El :attribute debe ser una fecha válida.',
            'max' => 'El archivo :attribute no debe exceder los :max caracteres',
            'exists' => 'El folio de la solictud no existe en el Sistema'
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $workorder = new WorkOrder;
        $workorder->maintenanceType=$request->maintenanceType;
        $workorder->serviceType=$request->serviceType;
        $workorder->personaldata_id=$request->personaldata_id;
        $workorder->maintenanceDate=$request->maintenanceDate;
        $workorder->maintenancerequest_id=$request->maintenancerequest_id;
        $workorder->approved = 0;
        $workorder->released = 0;
        $workorder->save();

    }

    public function showWorkOrderPending($personalData)
    {
        $workorderpending= \DB::table('workorders')
        ->join('maintenancerequests', 'workorders.maintenancerequest_id', '=', 'maintenancerequests.id')
        ->select(
        'workorders.id',
        'workorders.maintenanceType',
        'workorders.serviceType',
        'workorders.personaldata_id',
        'workorders.jobDescription',
        'maintenancerequests.department',
        'maintenancerequests.requestDate',
        'maintenancerequests.status',
        'maintenancerequests.id AS MRid'
        )
        ->where([['workorders.personaldata_id', $personalData],['released','0'],['approved','0'],['maintenancerequests.status','Pendiente']])
        ->orWhere([['workorders.personaldata_id', $personalData],['released','0'],['approved','0'],['maintenancerequests.status','Por Liberar']])
        ->get();
        return $workorderpending;
    }

    public function showWorkOrderApproved($personalData)
    {
        $workorderapproved= \DB::table('workorders')
        ->join('maintenancerequests', 'workorders.maintenancerequest_id', '=', 'maintenancerequests.id')
        ->select(
        'workorders.id',
        'workorders.maintenanceType',
        'workorders.serviceType',
        'workorders.personaldata_id',
        'workorders.jobDescription',
        'maintenancerequests.department',
        'maintenancerequests.requestDate',
        'maintenancerequests.status',
        'maintenancerequests.id AS MRid'
        )
        ->where([['workorders.personaldata_id', $personalData],['released','1'],['approved','0'],['maintenancerequests.status','Liberada']])
        ->get();
        return $workorderapproved;
    }

    public function showWorkOrderReleased($personalData)
    {
        $workorderreleased= \DB::table('workorders')
        ->join('maintenancerequests', 'workorders.maintenancerequest_id', '=', 'maintenancerequests.id')
        ->select(
        'workorders.id',
        'workorders.maintenanceType',
        'workorders.serviceType',
        'workorders.personaldata_id',
        'workorders.jobDescription',
        'maintenancerequests.department',
        'maintenancerequests.requestDate',
        'maintenancerequests.status',
        'maintenancerequests.id AS MRid'
        )
        ->where([['workorders.personaldata_id', $personalData],['released','1'],['approved','1'],['maintenancerequests.status','Liberada']])
        ->get();
        return $workorderreleased;
    }

    public function showWOPending($id)
    {

        $workorder = WorkOrder::join(
            'maintenancerequests', 'workorders.maintenancerequest_id', '=', 'maintenancerequests.id'
            )->join('personaldatas','personaldatas.id','=','maintenancerequests.personaldata_id')
            ->where([['workorders.id',$id]])
        ->get([
            'workorders.id AS WorkOrder_id',
            'workorders.maintenanceType',
            'workorders.serviceType',
            'personaldatas.name',
            'personaldatas.lastname',
            'personaldatas.area',
            'maintenancerequests.requestDate', 
            'maintenancerequests.department',  
            'maintenancerequests.requestDescription', 
            'maintenancerequests.evidence1 AS Evidence1MR', 
            'maintenancerequests.evidence2 AS Evidence2MR', 
            'maintenancerequests.evidence3 AS Evidence3MR', 
            ]);
        return response()->json($workorder);
    }

}
