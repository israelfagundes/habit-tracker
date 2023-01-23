# Install
install:
	cd web && npm i && cd ../server && npm i && cd ../mobile && npm i

install_web:
	cd web && npm i

install_server:
	cd server && npm i

install_mobile:
	cd server && npm i

# Server
up_server:
	cd server && npm run dev

seed:
	cd server && npx prisma db seed

generate_chart:
	cd server && npx prisma generate

# Web
up_web:
	cd web && npm run dev

# Mobile
up_mobile:
	cd mobile && npx expo start

up_ios:
	cd mobile && npx expo start --ios

up_android:
	cd mobile && npx expo start --android