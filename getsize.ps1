$total = (Get-ChildItem C:\Users\Logix\Desktop -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
Write-Host ("Total Desktop size: {0:N1} GB" -f ($total/1GB))
