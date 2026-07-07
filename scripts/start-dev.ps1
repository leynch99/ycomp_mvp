param(
  [int]$Port = 3000
)

$root = Split-Path -Parent $PSScriptRoot
$next = Join-Path $root "node_modules\next\dist\bin\next"

Set-Location -LiteralPath $root
& "C:\Program Files\nodejs\node.exe" $next dev --port $Port --hostname 127.0.0.1
