$content = Get-Content 'src\app\page.tsx' -Raw
$fixed = $content -replace [char]0x201C, '&quot;' -replace [char]0x201D, '&quot;'
Set-Content 'src\app\page.tsx' -Value $fixed -NoNewline
Write-Host "Done"
