# AI Motion Studio - Local Development Launcher
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Starting AI Motion Studio Development  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "[!] .env not found. Copying from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

# Run root development runner
npm run dev

