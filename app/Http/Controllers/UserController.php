<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator; //Import the Validator class

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return $user;
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
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user=User::find($id);
        return $user;
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
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'required|min:6',
            'personaldata_id' => 'required|exists:personaldatas,id',
            'role' => 'required|in:Jefe Departamento,Mantenimiento',
        ];

        $messages = [
            'required' => 'El :attribute es OBLIGATORIO',
            'unique' => 'El :attribute ya esta siendo usado por otro Usuario',
            'min' => 'El :attribute no debe tener menos de :min caracteres',
            'exists' => 'El :attribute no existe en la base de datos',
            'in' => 'El :attribute no entra en las categorias permitidas',
        ];


        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user=User::findOrFail($id);
        
        $user->email=$request->email;
        $user->password=bcrypt($request->password);
        $user->personaldata_id=$request->personaldata_id;
        $user->role=$request->role;
       
        $user->save(); 

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user= User::find($id);
        $user->delete();
    }

    
    public function login(Request $request){

        $rules = [
            'email' => 'required|email',
            'password' => 'required'
        ];
    
        $messages = [
            'email.required' => 'El email es requerido',
            'email.email' => 'El campo email debe ser una dirección de correo electrónico válida',
            'password.required' => 'El campo contraseña es requerido'
            
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = [
            'email' => $request->email, 
            'password' => $request->password
    ];

    
        if(auth()->attempt($credentials)){
            $token=auth()->user()->createToken('LaravelAuthApp')->accessToken;
            return response()->json(['token'=>$token, 'status'=>200,'user'=>auth()->user()]);
        }else{
            return response()->json(['error' => 'Unauthorised','status'=>401], 401);
        }
    }

    public function register(Request $request){
        $rules = [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'personaldata_id' => 'required|exists:personaldatas,id',
            'role' => 'required|in:Jefe Departamento,Mantenimiento',
        ];

        $messages = [
            'required' => 'El :attribute es OBLIGATORIO',
            'unique' => 'El :attribute ya esta siendo usado por otro Usuario',
            'min' => 'El :attribute no debe tener menos de :min caracteres',
            'exists' => 'El :attribute no existe en la base de datos',
            'in' => 'El :attribute no entra en las categorias permitidas',
        ];


        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'personaldata_id' => $request->personaldata_id,
            'role' => $request->role
        ]);

        $token = $user->createToken('LaravelAuthApp')->accessToken;
        return response()->json(['token'=>$token],200);
    }
    
}
