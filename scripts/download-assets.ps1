# Downloads built-kit model photos from Gunpla Wiki into resources/products/.
# Run: powershell -ExecutionPolicy Bypass -File scripts/download-assets.ps1

$ErrorActionPreference = "Continue"
$api = "https://gunpla.fandom.com/api.php"
$productsDir = Join-Path $PSScriptRoot "..\resources\products"
New-Item -ItemType Directory -Force -Path $productsDir | Out-Null

function Get-WikiImageUrl {
  param([string]$FileName)
  $title = [uri]::EscapeDataString("File:$FileName")
  $url = "$api`?action=query&titles=$title&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json"
  try {
    $r = Invoke-RestMethod -Uri $url -TimeoutSec 30
    $page = $r.query.pages.PSObject.Properties | Select-Object -First 1
    if ($null -eq $page -or $page.Value.missing) { return $null }
    if ($page.Value.imageinfo[0].thumburl) { return $page.Value.imageinfo[0].thumburl }
    return $page.Value.imageinfo[0].url
  } catch { return $null }
}

function Save-Image {
  param([string]$Url, [string]$Dest)
  if (-not $Url) { return $false }
  try {
    Invoke-WebRequest -Uri $Url -OutFile $Dest -UseBasicParsing -TimeoutSec 90
    return (Test-Path $Dest) -and ((Get-Item $Dest).Length -gt 4000)
  } catch { return $false }
}

$models = @(
  @{ slug = "hg-rx-78-2-revive"; wiki = "HGUC-RX-78-2-Revive-1.jpg" },
  @{ slug = "hg-barbatos"; wiki = "HGI-BO-Gundam-Barbatos-1.jpg" },
  @{ slug = "hg-unicorn-destroy"; wiki = "HGUC-Unicorn-Gundam-(Destroy-Mode)-1.jpg" },
  @{ slug = "hg-freedom-revive"; wiki = "HGCE-Freedom-Gundam-Revive-1.jpg" },
  @{ slug = "hg-nu-gundam"; wiki = "HGUC-Nu-Gundam-1.jpg" },
  @{ slug = "hg-wing-zero"; wiki = "HGAC-Wing-Gundam-Zero-1.jpg" },
  @{ slug = "hg-zaku-ii"; wiki = "HGUC-Zaku-II-(2021)-1.jpg" },
  @{ slug = "hg-aile-strike"; wiki = "HGCE-Aile-Strike-Gundam-1.png" },
  @{ slug = "hg-gquuuuuux"; wiki = "HGGQ-GQuuuuuuX-1.jpg" },
  @{ slug = "hg-zaku-ii-johnny-ridden"; wiki = "HGUC-MS-06R-2-Zaku-II-Johnny-Ridden-1.jpg" },
  @{ slug = "mg-rx-78-2-ver-3"; wiki = "MG-RX-78-2-Gundam-Ver.3.0-1.jpg" },
  @{ slug = "mg-wing-zero-ew-verka"; wiki = "MG-Wing-Gundam-Zero-EW-Ver.Ka-1.jpg" },
  @{ slug = "mg-freedom-2"; wiki = "MG-Freedom-Gundam-(2.0)-1.jpg" },
  @{ slug = "mg-barbatos"; wiki = "HGI-BO-Gundam-Barbatos-1.jpg" },
  @{ slug = "mg-strike-freedom"; wiki = "MG-Strike-Freedom-Gundam-1.jpg" },
  @{ slug = "mg-unicorn-ova"; wiki = "MG-Unicorn-Gundam-(OVA)-1.jpg" },
  @{ slug = "mg-zaku-ii-ver-2"; wiki = "MG-MS-06F-Zaku-II-1.jpg" },
  @{ slug = "mg-dynames"; wiki = "MG-Gundam-Dynames-1.jpg" },
  @{ slug = "mg-exia"; wiki = "MG-Gundam-Exia-1.jpg" },
  @{ slug = "mg-sazabi-verka"; wiki = "MG-Sazabi-Ver-Ka-1.jpg" },
  @{ slug = "pg-unicorn"; wiki = "PG-Unicorn-Gundam-1.jpg" },
  @{ slug = "pg-strike-freedom"; wiki = "PG-Strike-Freedom-Gundam-1.jpg" },
  @{ slug = "pg-rx-78-2"; wiki = "PG-RX-78-2-Gundam-1.jpg" },
  @{ slug = "pg-wing-zero-custom"; wiki = "PG-Wing-Gundam-Zero-Custom-1.jpg" },
  @{ slug = "pg-exia"; wiki = "PG-Gundam-Exia-1.jpg" },
  @{ slug = "rg-zeta-gundam"; wiki = "RG-Zeta-Gundam-1.jpg" },
  @{ slug = "rg-sinanju"; wiki = "RG-Sinanju-1.jpg" },
  @{ slug = "rg-god-gundam"; wiki = "RG-God-Gundam-1.jpg" },
  @{ slug = "rg-build-strike"; wiki = "RG-Build-Strike-Gundam-Full-Package-1.jpg" },
  @{ slug = "rg-unicorn"; wiki = "RG-Unicorn-Gundam-Destroy-Mode-ver-TWC-Lighting-Model-1.jpg" }
)

Write-Host "=== Model photos ==="
foreach ($m in $models) {
  $ext = if ($m.wiki -match '\.png$') { '.png' } else { '.jpg' }
  $dest = Join-Path $productsDir ($m.slug + "-model" + $ext)
  Write-Host "$($m.slug) ..."
  $url = Get-WikiImageUrl $m.wiki
  if (Save-Image $url $dest) { Write-Host "  OK" } else { Write-Warning "  FAILED $($m.wiki)" }
}

Write-Host "`nDone."
