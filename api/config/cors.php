<?php
return [
   'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [
    env('FRONTEND_URL', 'http://localhost:5173'),
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => false,

];
