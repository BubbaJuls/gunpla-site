# Downloads product box art via Gunpla Wiki (Fandom) API.
# Run from repo root: powershell -ExecutionPolicy Bypass -File scripts/download-kit-images.ps1

$ErrorActionPreference = "Continue"
$outDir = Join-Path $PSScriptRoot "..\resources\products"
$api = "https://gunpla.fandom.com/api.php"

function Get-WikiImageUrl {
  param([string]$FileName)
  $title = [uri]::EscapeDataString("File:$FileName")
  $url = "$api`?action=query&titles=$title&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json"
  try {
    $r = Invoke-RestMethod -Uri $url -TimeoutSec 30
    $page = $r.query.pages.PSObject.Properties | Select-Object -First 1
    if ($null -eq $page -or $page.Value.missing) { return $null }
    if ($page.Value.imageinfo -and $page.Value.imageinfo.Count -gt 0) {
      if ($page.Value.imageinfo[0].thumburl) { return $page.Value.imageinfo[0].thumburl }
      return $page.Value.imageinfo[0].url
    }
  } catch {}
  return $null
}

$kits = @(
  @{ file = "hg-rx-78-2.jpg"; wiki = "HGUC-RX-78-2-Gundam-Revive-Box-(Bandai-Spirits-Bandai-Namco).jpg" },
  @{ file = "hg-barbatos.jpg"; wiki = "HGI-BO-Gundam-Barbatos-box-(International-Release).jpg" },
  @{ file = "hg-unicorn-destroy.jpg"; wiki = "HGUC-Unicorn-Gundam-(Destroy-Mode)-box-(Bandai-Spirits).jpg" },
  @{ file = "hg-freedom.jpg"; wiki = "HGCE-Freedom-Gundam-Revive-box.jpg" },
  @{ file = "hg-nu-gundam.jpg"; wiki = "HGUC-Nu-Gundam-box.jpg" },
  @{ file = "hg-wing-zero.jpg"; wiki = "HGAC-Wing-Gundam-Zero-box.jpg" },
  @{ file = "hg-zaku-ii.jpg"; wiki = "HGUC-Zaku-II-(2021)-box.jpg" },
  @{ file = "hg-strike.jpg"; wiki = "HGCE-Aile-Strike-Gundam-box-(Bandai-Spirits).jpg" },
  @{ file = "hg-gquuuuuux.jpg"; wiki = "HGGQ-GQuuuuuuX-box.jpg" },
  @{ file = "hg-zaku-ii-high-mobility.jpg"; wiki = "HGUC-MS-06R-2-Zaku-II-Johnny-Ridden-box.jpg" },

  @{ file = "mg-rx-78-2.jpg"; wiki = "MG-RX-78-2-Gundam-Ver.3.0-box.jpg" },
  @{ file = "mg-wing-zero-ew.jpg"; wiki = "MG Wing Gundam Zero EW Ver.Ka box.jpg" },
  @{ file = "mg-freedom-2.jpg"; wiki = "MG-Freedom-Gundam-(2.0)-boxart.jpg" },
  @{ file = "mg-barbatos.jpg"; wiki = "MG-Gundam-Barbatos-box.jpg" },
  @{ file = "mg-strike-freedom.jpg"; wiki = "MG-Strike-Freedom-Gundam-Extra-Finish-Ver-box.jpg" },
  @{ file = "mg-unicorn-ova.jpg"; wiki = "MG-Unicorn-Gundam-(OVA)-box.jpg" },
  @{ file = "mg-zaku-ii.jpg"; wiki = "MG MS-06J Zaku Ver. 2.0 boxart.jpg" },
  @{ file = "mg-dynames.jpg"; wiki = "MG-Gundam-Dynames-box.jpg" },
  @{ file = "mg-exia.jpg"; wiki = "MG-Gundam-Exia-Trans-Am-Mode-Gloss-Injection-box.jpg" },
  @{ file = "mg-sazabi-verka.jpg"; wiki = "MG MSN-04 Sazabi (Ver. Ka) BOX.jpg" },

  @{ file = "pg-unicorn.jpg"; wiki = "PG-Unicorn-Gundam-box.jpg" },
  @{ file = "pg-strike-freedom.jpg"; wiki = "PG-Strike-Freedom-Gundam-box.jpg" },
  @{ file = "pg-rx-78-2.jpg"; wiki = "PG-RX-78-2-Gundam-(Chrome-Metallic)-box-(International).jpg" },
  @{ file = "pg-wing-zero.jpg"; wiki = "PG-Wing-Gundam-Zero-Custom-boxart.jpg" },
  @{ file = "pg-exia.jpg"; wiki = "PG-Gundam-Exia-boxart.jpg" }
)

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$ok = 0
$fail = 0

foreach ($kit in $kits) {
  $dest = Join-Path $outDir $kit.file
  Write-Host "[$($kit.file)] resolving $($kit.wiki) ..."
  $url = Get-WikiImageUrl $kit.wiki
  if (-not $url) {
    Write-Warning "  No URL for wiki file"
    $fail++
    continue
  }
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 60
    $size = (Get-Item $dest).Length
    if ($size -lt 5000) {
      Write-Warning "  Downloaded but small ($size bytes) - may be invalid"
      $fail++
    } else {
      $kb = [math]::Round($size / 1024)
      Write-Host ('  OK (' + $kb + ' KiB)')
      $ok++
    }
  } catch {
    Write-Warning "  Download failed: $_"
    $fail++
  }
}

Write-Host "`nFinished: $ok succeeded, $fail failed."
