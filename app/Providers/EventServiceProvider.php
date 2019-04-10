<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [

        Registered::class => [

            SendEmailVerificationNotification::class,

        ],

        //这种键值对应的写法，可以让单个事件对应多个监听器，
        //这里我们的事件是 \Illuminate\Auth\Events\Verified ，
        //监听器是 \App\Listeners\EmailVerified
        //Listeners 文件夹是约定俗成的监听器命名
        Verified::class => [

          \App\Listeners\EmailVerified::class,

        ],

    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
