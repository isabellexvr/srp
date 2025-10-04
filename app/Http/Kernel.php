<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        // Additional global middleware can be added here
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            // Typical Laravel web group items trimmed for minimal skeleton
            \App\Http\Middleware\HandleInertiaRequests::class,
        ],

        'api' => [
            'throttle:api',
        ],
    ];

    /**
     * The application's route middleware aliases.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        //'auth' => \App\Http\Middleware\Authenticate::class,
    ];
}
