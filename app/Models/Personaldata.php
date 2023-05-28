<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personaldata extends Model
{
    use HasFactory;

    public function user(){
        return $this->hasOne(User::class);
    }

    public function maintenancerequest(){
        return $this->hasMany(Maintenancerequest::class);
    }

    public function workorder(){
        return $this->hasMany(Workorder::class);
    }
}
