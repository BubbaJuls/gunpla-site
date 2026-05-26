# Downloads box + built-kit photos from multiple sources (school project).
# Sources: Gunpla Wiki API, BigBadToyStore CDN (retailer product photos).
# Run: powershell -ExecutionPolicy Bypass -File scripts/download-product-photos.ps1

$ErrorActionPreference = "Continue"
$api = "https://gunpla.fandom.com/api.php"
$out = Join-Path $PSScriptRoot "..\resources\products"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function Get-WikiUrl([string]$fileName) {
  if (-not $fileName) { return $null }
  $title = [uri]::EscapeDataString("File:$fileName")
  $url = "$api`?action=query&titles=$title&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json"
  try {
    $r = Invoke-RestMethod -Uri $url -TimeoutSec 25
    $p = $r.query.pages.PSObject.Properties | Select-Object -First 1
    if ($null -eq $p -or $p.Value.missing -or -not $p.Value.imageinfo) { return $null }
    if ($p.Value.imageinfo[0].thumburl) { return $p.Value.imageinfo[0].thumburl }
    return $p.Value.imageinfo[0].url
  } catch { return $null }
}

function Save-Url([string]$url, [string]$dest) {
  if (-not $url) { return $false }
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 90
    return (Test-Path $dest) -and ((Get-Item $dest).Length -gt 3000)
  } catch { return $false }
}

# Retailer / gallery direct URLs (product photos & box art)
$direct = @(
  @{ slug = "hg-rx-78-2-revive"; box = $null; model = "https://images.bigbadtoystore.com/images/p/full/2020/10/15074ede-6d3e-42f9-a21f-64d4130a1b55.jpg" },
  @{ slug = "hg-rx-78-2-revive"; box = $null; model = "https://images.bigbadtoystore.com/images/p/full/2020/10/27af4651-1154-4a0c-bec4-3e7a025a2966.jpg" },
  @{ slug = "rg-strike-freedom"; box = $null; model = "https://images.bigbadtoystore.com/images/p/full/2019/09/5d7a8f0e-8c0e-4c0e-9c0e-000000000000.jpg" }
)

# Wiki filenames (box + built -1 photos)
$wiki = @(
  @{ slug = "rg-strike-freedom"; box = "RG-ZGMF-X20A-Strike-Freedom-Gundam-box.jpg"; model = "RG-ZGMF-X20A-Strike-Freedom-Gundam-1.jpg" },
  @{ slug = "rg-oo-qant"; box = "RG-GN-0000+00-Qan[T]-box.jpg"; model = "RG-GN-0000+00-Qan[T]-1.jpg" },
  @{ slug = "rg-wing-zero-custom"; box = "RG-Wing-Gundam-Zero-Custom-EW-box.jpg"; model = "RG-Wing-Gundam-Zero-Custom-EW-1.jpg" },
  @{ slug = "rg-unicorn"; box = "RG-RX-0-Unicorn-Gundam-box.jpg"; model = "RG-RX-0-Unicorn-Gundam-1.jpg" },
  @{ slug = "rg-rx-78-2"; box = "RG-RX-78-2-Gundam-(2007)-box.jpg"; model = "RG-RX-78-2-Gundam-1.jpg" },
  @{ slug = "rg-build-strike"; box = "RG-Build-Strike-Gundam-Full-Package-box.jpg"; model = "RG-Build-Strike-Gundam-Full-Package-1.jpg" },
  @{ slug = "rg-zeta-gundam"; box = "RG-Zeta-Gundam-box.jpg"; model = "RG-Zeta-Gundam-1.jpg" },
  @{ slug = "rg-full-burnern"; box = "RG-GN-001-Gundam-Full-Burnern-box.jpg"; model = "RG-GN-001-Gundam-Full-Burnern-1.jpg" }
)

foreach ($w in $wiki) {
  if ($w.box) {
    $dest = Join-Path $out ($w.slug + "-box.jpg")
    $url = Get-WikiUrl $w.box
    if (Save-Url $url $dest) { Write-Host "box OK $($w.slug)" }
    else { Write-Host "box skip $($w.slug)" }
  }
  if ($w.model) {
    $dest = Join-Path $out ($w.slug + "-model.jpg")
    $url = Get-WikiUrl $w.model
    if (Save-Url $url $dest) { Write-Host "model OK $($w.slug)" }
  }
}

# HG Revive from BBTS (high-quality product shot)
$hgReviveModel = Join-Path $out "hg-rx-78-2-revive-model.jpg"
if (Save-Url "https://images.bigbadtoystore.com/images/p/full/2020/10/15074ede-6d3e-42f9-a21f-64d4130a1b55.jpg" $hgReviveModel) {
  Write-Host "BBTS model OK hg-rx-78-2-revive"
}

Write-Host "Done."
