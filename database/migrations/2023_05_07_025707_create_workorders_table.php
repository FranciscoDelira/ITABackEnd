<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workorders', function (Blueprint $table) {
            $table->id();
            $table->enum('maintenanceType',['Interno','Externo'])->nullable();
            $table->enum('serviceType',['Eléctrico','Plomería','Herrería','Pintura','Obra Civil','Otro'])->nullable();
            $table->unsignedBigInteger('personaldata_id');
            $table->foreign('personaldata_id')->references('id')->on('personaldatas')->onDelete('cascade')->onUpdate('cascade');
            $table->date('maintenanceDate')->nullable();
            $table->string('jobDescription')->nullable();
            $table->string('evidence1')->nullable();
            $table->string('evidence2')->nullable();
            $table->string('evidence3')->nullable();
            $table->unsignedBigInteger('maintenancerequest_id');
            $table->foreign('maintenancerequest_id')->references('id')->on('maintenancerequests')->onDelete('cascade')->onUpdate('cascade');           
            $table->boolean('released')->nullable();
            $table->date('releasedDate')->nullable();
            $table->boolean('approved')->nullable();
            $table->string('approversName')->nullable();
            $table->date('dateApproved')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workorders');
    }
};
