migrate-dev:
	docker-compose -f docker-compose.development.yml exec backend ./bin/rails db:migrate

seed-dev:
	docker-compose -f docker-compose.development.yml exec backend ./bin/rails db:seed

setup-dev:
	docker-compose -f docker-compose.development.yml exec backend ./bin/rails db:setup

build-dev:
	docker-compose -f docker-compose.development.yml up --build
start-dev:
	docker-compose -f docker-compose.development.yml up


migrate-prod:
	docker compose -f docker-compose.production.yml exec backend ./bin/rails db:migrate

seed-prod:
	docker compose -f docker-compose.production.yml exec backend ./bin/rails db:seed

setup-prod:
	docker compose -f docker-compose.production.yml exec backend ./bin/rails db:setup

start:
	docker compose -f docker-compose.production.yml up
