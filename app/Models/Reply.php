<?php

namespace App\Models;

class Reply extends Model
{

    protected $fillable = ['content'];

    public function topic()
    {

      return $this->belongsTo(Topoic::class);

    }

    public function user()
    {

      return $this->belongsTo(User::class);

    }

}
