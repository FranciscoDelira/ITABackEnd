<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenancerequest extends Model
{
    use HasFactory;

    public function personalData(){
        return $this->belongsTo(Personaldata::class);
    }

    public function workOrder(){
        return $this->hasOne(Workorder::class);
    }
}
