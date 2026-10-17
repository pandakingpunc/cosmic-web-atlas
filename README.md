# Kozmik Ağ Atlası

Yerel Grup'tan kozmik mikrodalga arka plana kadar evrenin büyük ölçekli yapısını gösteren etkileşimli 3D model (Three.js, tek HTML dosyası).

## Dosyalar

- `kozmik-ag.html`: ana model. Tarayıcıda doğrudan açılır.
- `index.html`: ilk Laniakea Süperkümesi taslağı.

## Neler var

- **2MRS gökadaları:** 2MASS Redshift Survey'deki 43.482 gerçek gökada, kırmızıya kaymalarından süpergalaktik koordinatlara yerleştirildi.
- **Yerel Grup:** Samanyolu, Andromeda ve Üçgen'in yanında Macellan Bulutları, Yay, Heykeltıraş ve Fırın cüceleri, M32, M110, NGC 6822, IC 10, IC 1613, WLM, Andromeda II. Uydu etiketleri yalnızca yaklaşınca görünür.
- **Yakın gruplar:** M81, Erboğa A, Heykeltıraş, Samanyolu'nun arkasındaki IC 342–Maffei grubu, NGC 1023, Sombrero, NGC 2997, Güvercin, Aslan II bulutu…
- **Ölçülmüş yapılar:** Kataloğun göremediği kümeler, süperkümeler, duvarlar ve uzak yapılar (Shapley, Vela, Çoban, Sloan ve BOSS büyük duvarları, Huge-LQG, Herkül–Kuzey Tacı Büyük Duvarı…) literatürdeki konumlarıyla.
- **Uzak nesneler:** Mermi Kümesi, Pandora, Anka, El Gordo, Örümcek Ağı ve SPT2349−56 protokümeleri, kuasar J0313−1806, GN-z11, JADES-GS-z14-0, MoM-z14.
- **Boşluklar:** Yerel Boşluk ve kuzey/güney kolları, Heykeltıraş, Mikroskop, Çoban, Dipol İtici, KBC, Irmak Süper Boşluğu…
- **Tahmini ağ:** Haritalanmamış bölgeler (Samanyolu düzleminin arkası dahil) Voronoi köpük modeliyle dolduruldu. Doku gerçekçi, tek tek konumlar uydurma.
- **Kaçınma Bölgesi**, Laniakea akış çizgileri, mesafe halkaları, z≈14 gökada cephesi ve CMB kabuğu.
- 5 ölçek: Yerel Grup · Yerel Levha · Laniakea · Kozmik ağ · Gözlenebilir evren.

## Kullanım

- **Dil:** Uygulama İngilizce açılır; panelin üstündeki `EN | TR` düğmesiyle sayfa yenilenmeden Türkçeye geçilir. Seçim tarayıcıda hatırlanır; `?lang=tr` ya da `?lang=en` ile bağlantıda da belirtilebilir. Paylaşım bağlantıları iki dilde de aynıdır.
- **Arama:** Paneldeki kutuya ya da `/` tuşuna basıp bir ad yazın. Türkçe karakter, büyük/küçük harf ve noktalama fark etmez ("basak", "momz").
- **Rehberli tur:** "Turu başlat" (ya da `T`) sizi 12 durakta Samanyolu'ndan CMB'ye götürür.
- **Bilgi kartı:** Etikete tıklayınca uzaklık, kırmızıya kayma, ışığın yolculuk süresi, gökteki konum (RA/Dec) ve galaktik koordinatlar görünür.
- **Paylaşım:** Seçili nesne adres çubuğuna yazılır (`#nesne=koma-kumesi`); "Bağlantıyı kopyala" ile paylaşılabilir.
- **Kısayollar:** `1`–`5` ölçekler, `Boşluk` dönüş, `L` etiketler, `Esc` kapat, `?` kısayol listesi.
- **Görüntüyü kaydet:** O anki sahneyi PNG olarak indirir (etiketler dahil değil).

Kozmoloji: H₀ = 70 km/s/Mpc, Ωm = 0,3. Mesafeler eş hareketli (bugünkü) uzaklıktır.

## Veri kaynağı ve atıf

Gökadalar şu katalogdan geliyor:

> Huchra, J. P. ve diğ. 2012, *The 2MASS Redshift Survey — Description and Data Release*, ApJS 199, 26. http://tdc-www.harvard.edu/2mrs/

Depoda ve sayfada katalog verisi yok. Sayfa açılınca tarayıcı, [CDS VizieR](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/ApJS/199/26)'den (J/ApJS/199/26) 200 ≤ cz ≤ 40.000 km/s olan 43.482 gökadanın l, b, Kc ve cz sütunlarını indirir (~1,4 MB) ve konumları kendisi hesaplar. CDS'e ulaşılamazsa Harvard'daki VizieR aynası denenir; ikisi de yanıt vermezse model gökadalar olmadan açılır ve panelde "Yeniden dene" düğmesi çıkar. İnen veri yalnızca o tarayıcının önbelleğinde tutulur.

Bu çalışmada VizieR katalog erişim aracı kullanılmıştır (CDS, Strazburg, Fransa; doi:10.26093/cds/vizier).