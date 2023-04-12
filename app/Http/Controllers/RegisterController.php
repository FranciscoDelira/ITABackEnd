<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator; //Si no funciona se agrega se pone el otro use
// use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RegisterController extends ResponseController
{

    public function register (Request $request) {

        $validator = Validator::make ($request->all(), [

            'name' => 'required',
            'email'=> 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',

        ]);

            if ($validator->fails()){

                return $this->sendError ('Validation Error.',
                $validator->errors());

            }

            $input = $request->all();
            $input ['password'] = bcrypt ($input ['password']);
            $user = User::create ($input);
            $success['token'] = $user->createToken ('MyApp')->accessToken;
            $success['name'] = $user->name; 

            return $this->sendResponse ($success,'User register successfully.');


        

    }

    public function login (Request $request){

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])){

            $user = Auth::user();
            $success ['token'] = $user->createToken ('MyApp')->accessToken;
            $success ['name'] = $user->name;
            return $this->sendResponse ($success, 'User login successfully.');

        }else{

            return $this->sendError ('Unauthorised.',['error' => 'Unauthorised']);

        }

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}