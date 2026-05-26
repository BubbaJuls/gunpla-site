# Generates js/seed-reviews-hgmpg.js (5 reviews per product 11-35)
$out = Join-Path $PSScriptRoot "..\js\seed-reviews-hgmpg.js"
$products = @(
  @{ id = "11"; name = "RX-78-2 Revive"; note = "Revive proportions and tight joints" },
  @{ id = "12"; name = "Barbatos"; note = "rugged IBO frame and mace weight" },
  @{ id = "13"; name = "Unicorn Destroy Mode"; note = "psycho-frame red parts and transformation" },
  @{ id = "14"; name = "Freedom Revive"; note = "wing binders and beam rifle poses" },
  @{ id = "15"; name = "Nu Gundam"; note = "fin funnels and Amuro color scheme" },
  @{ id = "16"; name = "Wing Zero"; note = "twin buster rifle and wing spread" },
  @{ id = "17"; name = "Zaku II"; note = "classic grunt suit panel lining" },
  @{ id = "18"; name = "Aile Strike"; note = "striker pack and SEED hero look" },
  @{ id = "19"; name = "GQuuuuuuX"; note = "bold new-era silhouette" },
  @{ id = "20"; name = "Johnny Ridden Zaku"; note = "red HMT trim and thrusters" },
  @{ id = "21"; name = "RX-78-2 Ver. 3.0"; note = "Ver. 3.0 color separation" },
  @{ id = "22"; name = "Wing Zero EW Ver.Ka"; note = "Ver.Ka wing detail and decals" },
  @{ id = "23"; name = "Freedom 2.0"; note = "inner frame and 2.0 proportions" },
  @{ id = "24"; name = "MG Barbatos"; note = "hefty IBO inner frame" },
  @{ id = "25"; name = "Strike Freedom"; note = "dragoons and gold frame" },
  @{ id = "26"; name = "Unicorn OVA"; note = "MG transformation engineering" },
  @{ id = "27"; name = "Zaku II Ver. 2.0"; note = "mono-eye and Zeon poses" },
  @{ id = "28"; name = "Dynames"; note = "sniper rifle and GN shield" },
  @{ id = "29"; name = "Exia"; note = "GN sword and 00 sharp lines" },
  @{ id = "30"; name = "Sazabi Ver.Ka"; note = "massive Ver.Ka presence" },
  @{ id = "31"; name = "PG Unicorn"; note = "1/60 psycho-frame presence" },
  @{ id = "32"; name = "PG Strike Freedom"; note = "light-up wings and size" },
  @{ id = "33"; name = "PG RX-78-2"; note = "core fighter gimmick and scale" },
  @{ id = "34"; name = "PG Wing Zero Custom"; note = "giant wings on the shelf" },
  @{ id = "35"; name = "PG Exia"; note = "GN drive lighting and height" }
)

$authors = @("Miguel R.","Patricia L.","KenjiBuilds","Angelo V.","Carmen D.","Andrea S.","Dale M.","Hannah T.","Adrian N.","Bianca J.","Harold S.","Carlo M.","Helen W.","Kyle D.","Mei L.","Paolo E.","Trisha W.","Jonas R.","Aisha K.","Rico P.")
$titles = @(
  "Excellent build experience","Great value for the grade","Solid kit, minor nits","Perfect for the shelf","Authentic Bandai quality",
  "Poseability impressed me","Panel line dream","Fast shipping, clean runners","Worth every peso","Display centerpiece now"
)
$bodies = @(
  "Finished over a weekend. {note}. Shipped quickly from Gunpla Hobby PH with no bent runners.",
  "Dry-fit the tricky parts first. {note}. Matte top coat made it pop on the shelf.",
  "Instructions were clear. {note}. Would order another grade from this shop.",
  "Nub marks cleaned up easily. {note}. Joints are stiff enough for action poses.",
  "First time building this grade and it did not disappoint. {note}. All parts accounted for."
)

$lines = @("var SEED_REVIEWS_HGMPG = [")
$dateBase = Get-Date "2025-12-01"
$ai = 0

foreach ($p in $products) {
  for ($i = 1; $i -le 5; $i++) {
    $rating = if ($i -eq 3 -and ([int]$p.id % 3) -eq 0) { 4 } else { 5 }
    if ($i -eq 5 -and ([int]$p.id % 4) -eq 0) { $rating = 4 }
    $author = $authors[$ai % $authors.Length]
    $ai++
    $title = $titles[($i + [int]$p.id) % $titles.Length]
    $bodyTpl = $bodies[($i + 1) % $bodies.Length]
    $body = $bodyTpl.Replace("{note}", $p.note)
    $body = $body.Replace("'", "\'")
    $title = $title.Replace("'", "\'")
    $days = ($i * 17) + ([int]$p.id * 3)
    $date = $dateBase.AddDays(-$days).ToString("yyyy-MM-ddTHH:mm:ss.000Z")
    $lines += "  {"
    $lines += "    id: 'seed-$($p.id)-$i',"
    $lines += "    productId: '$($p.id)',"
    $lines += "    rating: $rating,"
    $lines += "    author: '$author',"
    $lines += "    title: '$title',"
    $lines += "    body: '$body',"
    $lines += "    date: '$date',"
    $lines += "    seed: true,"
    $lines += "  },"
  }
}

$lines += "];"
$lines += ""
$lines += "if (typeof SEED_REVIEWS !== 'undefined') {"
$lines += "  SEED_REVIEWS = SEED_REVIEWS.concat(SEED_REVIEWS_HGMPG);"
$lines += "}"
$lines -join "`n" | Set-Content -Path $out -Encoding UTF8
Write-Host "Wrote $out ($($products.Count * 5) reviews)"
