<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DomainRule implements ValidationRule
{
    public function validate($attribute, $value, Closure $fail): void
    {
        if (filter_var($value, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME) === false) {
            $fail(':Attribute is not a valid domain.');
        }
    }
}
