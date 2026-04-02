# cleanup-images.ps1
# Deletes ebaymessageimages subfolders for messages no longer in the active queue.

$queuePath  = "$PSScriptRoot\..\state\queue.md"
$imagesPath = "$PSScriptRoot\..\ebaymessageimages"

if (-not (Test-Path $imagesPath)) {
    Write-Host "ebaymessageimages folder not found -- nothing to clean up."
    exit 0
}

$queuedIds = @()
if (Test-Path $queuePath) {
    $queuedIds = Get-Content $queuePath |
        Where-Object { $_ -match '^\|\s*\d+\s*\|' } |
        ForEach-Object { ($_ -split '\|')[1].Trim() }
}

$removed = 0

Get-ChildItem -Path $imagesPath -Directory | ForEach-Object {
    if ($_.Name -notin $queuedIds) {
        Remove-Item $_.FullName -Recurse -Force
        Write-Host "Removed: $($_.FullName)"
        $removed++
    }
}

if ($removed -eq 0) {
    Write-Host "No image folders to clean up."
} else {
    Write-Host "$removed folder(s) removed."
}
