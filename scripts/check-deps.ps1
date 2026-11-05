Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  AI Motion Studio - Dependencies Update Checker          " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Checking Web Dependencies (apps/web)..." -ForegroundColor Yellow
npx npm-check-updates --cwd apps/web

Write-Host "`n[2/3] Checking Root Dev Dependencies..." -ForegroundColor Yellow
npx npm-check-updates

Write-Host "`n[3/3] Checking Backend Python Dependencies (server/backend)..." -ForegroundColor Yellow
if (Test-Path ".venv\Scripts\pur.exe") {
    .\.venv\Scripts\pur.exe -r server/backend/requirements.txt -d
} else {
    Write-Host "Virtualenv .venv not found or pur not installed. Running system pip list..." -ForegroundColor DarkGray
    pip list --outdated
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  To upgrade dependencies automatically, run:" -ForegroundColor Green
Write-Host "  - All (Web + Backend): npm run deps:upgrade" -ForegroundColor White
Write-Host "  - Only Web:            npm run deps:upgrade:web" -ForegroundColor White
Write-Host "  - Only Backend:        npm run deps:upgrade:server" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan

