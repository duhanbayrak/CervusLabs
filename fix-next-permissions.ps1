# PowerShell script to fix .next folder permissions
Write-Host "Stopping all Node processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

Write-Host "Removing .next folder..." -ForegroundColor Yellow
if (Test-Path .next) {
    try {
        Remove-Item -Path .next -Recurse -Force -ErrorAction Stop
        Write-Host ".next folder removed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Error removing .next folder: $_" -ForegroundColor Red
        Write-Host "Please manually delete the .next folder and try again." -ForegroundColor Yellow
    }
} else {
    Write-Host ".next folder does not exist." -ForegroundColor Green
}

Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Done! Now run: npm run dev" -ForegroundColor Green
