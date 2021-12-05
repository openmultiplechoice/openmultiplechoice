# Debugging

## "printf debugging"

```
# In PHP
use Illuminate\Support\Facades\Log;
...
Log::debug('...');

# In Blade templates
<pre><code>{{ json_encode($something, JSON_PRETTY_PRINT) }}</code></pre>

# In Svelte components
console.log('...');
<pre><code>{ JSON.stringify(something, null, "  ") }</code></pre>
```
