$problematicFolders = @('sahin-balikcilik', 's&m-villa')

foreach ($folder in $problematicFolders) {
  $path = "public/projects/$folder"
  if (!(Test-Path $path)) {
    Write-Host "MISSING: $folder"
    continue
  }
  
  $files = Get-ChildItem $path -File | Where-Object { $_.Name -match '#' -or $_.Name -match ' ' }
  
  foreach ($file in $files) {
    # Replace # with - and spaces with _
    $newName = $file.Name -replace '#', '' -replace ' ', '_'
    $newName = $newName -replace '__+', '_'  # collapse multiple underscores
    
    $oldPath = Join-Path $path $file.Name
    $newPath = Join-Path $path $newName
    
    if ($oldPath -ne $newPath) {
      Write-Host "Renaming: '$($file.Name)' -> '$newName'"
      Rename-Item -LiteralPath $oldPath -NewName $newName -Force
    }
  }
}

Write-Host "Done."
