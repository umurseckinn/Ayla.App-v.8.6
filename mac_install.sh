#!/bin/bash

# Renkler
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}⭐ Ayla iOS Kurulum Sihirbazı Başlatılıyor...${NC}"

# 1. Bağımlılıkları Yükle
echo -e "${GREEN}📦 Paketler yükleniyor...${NC}"
npm install

# 2. Projeyi Build Et (Next.js)
echo -e "${GREEN}🏗️ Next.js projesi derleniyor (Static Export)...${NC}"
npm run build

# 3. iOS Platformunu Ekle/Güncelle
if [ -d "ios" ]; then
    echo -e "${GREEN}🔄 iOS projesi güncelleniyor...${NC}"
    npx cap sync ios
else
    echo -e "${GREEN}🍎 iOS projesi oluşturuluyor...${NC}"
    npx cap add ios
fi

echo -e "${GREEN}✨ Hazır! Şimdi Xcode açılıyor...${NC}"
echo -e "${GREEN}📌 Yapman Gerekenler:${NC}"
echo "1. Xcode açıldığında sol menüden 'App' projesini seç."
echo "2. 'Signing & Capabilities' sekmesine gel."
echo "3. 'Team' kısmından kendi ismini (Personal Team) seç."
echo "4. iPhone'unu kabloyla bağla."
echo "5. Yukarıdaki 'Play' (▶️) tuşuna bas."

npx cap open ios
