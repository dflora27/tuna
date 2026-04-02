$folders = @(
  'sahin-balikcilik',
  'd&s-yali-dairesi',
  's&a-villa',
  'z&o-malikane',
  'b&f-villa',
  'f&m-yali-dairesi',
  'e&b-villa',
  'spor-kulubu-ofis',
  'm&i-villa',
  's&b-villa',
  'e&v-villa',
  'k&k-villa',
  'sigacik-otel',
  'bomonti-ofis',
  's&m-villa',
  'a.d-daire',
  'n&a-daire',
  'beykoz-villa',
  'c&e-daire'
)

foreach ($folder in $folders) {
  Write-Host "=== $folder ==="
  $path = "public/projects/$folder"
  if (!(Test-Path $path)) {
    Write-Host "MISSING"
    continue
  }
  $items = Get-ChildItem $path -File | ForEach-Object {
    $name = $_.Name
    $order = 999
    if ($name -match '_(\d+)\.') {
      $order = [int]$Matches[1]
    }
    [PSCustomObject]@{ Name = $name; Order = $order }
  } | Sort-Object Order
  
  foreach ($item in $items) {
    Write-Host $item.Name
  }
}
