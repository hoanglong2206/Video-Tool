Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  AI Motion Studio - Upgrading Dependencies to Latest     " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Upgrade Web
Write-Host "`n[1/2] Updating apps/web package.json and installing..." -ForegroundColor Yellow
npx npm-check-updates --cwd apps/web -u
if (Get-Command bun -ErrorAction SilentlyContinue) {
    Set-Location apps/web
    bun install
    Set-Location ../..
} else {
    npm --prefix apps/web install
}

# 2. Upgrade Server
Write-Host "`n[2/2] Updating server/backend requirements.txt and upgrading..." -ForegroundColor Yellow
if (Test-Path ".venv\Scripts\pur.exe") {
    .\.venv\Scripts\pur.exe -r server/backend/requirements.txt
    .\.venv\Scripts\pip.exe install --upgrade -r server/backend/requirements.txt
} else {
    Write-Host "Virtual environment .venv not found. Skipping python package upgrade." -ForegroundColor Yellow
}

Write-Host "`n[OK] All dependencies have been updated to the latest versions!" -ForegroundColor Green
